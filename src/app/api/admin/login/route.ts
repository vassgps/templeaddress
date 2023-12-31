import * as bcrypt from "bcrypt";

import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { NextResponse } from "next/server";
import { Admin } from "@/entity";
import { getTokens } from "../../core/jwt";
import { Repository } from "typeorm";
import { LoginUserDto } from "../../auth/dto/user.auth.dto";
import { updateRefreshToken } from "../../core/core";
import { AppDataSource } from "../../../../../lib/db";

/**
 * @swagger
 * /api/admin/coinss:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 *     summary: Your new heading goes here
 */

export async function POST(req: Request) {
  try {
    const data = await req.json();
      
    const loginUserDto = plainToClass(LoginUserDto, data);
    const errorMessages = await validate(loginUserDto);

    if (errorMessages.length > 0) {
      const errors = errorMessages
        .map((error) => Object.values(error.constraints))
        .flat();
      return NextResponse.json({ errors, status: false });
    }

    const { password, email } = data;

    const adminRepository: Repository<Admin> = (await AppDataSource()).getRepository(Admin);

    const admin = await adminRepository.findOne({
      where: [{ email }, { phone_number: email }],
    });

    if (!admin) {
      return NextResponse.json(
        { message: "Account not found, invalid email address" },
        { status: 400 }
      );
    }

    if (!(await bcrypt.compare(password, admin.password)))
      return NextResponse.json(
        { message: "Password not matching" },
        { status: 400 }
      );

    const tokens = await getTokens(admin.id, admin.email);
    await updateRefreshToken(admin, tokens.refreshToken);


    return NextResponse.json(
      { admin,role:"adminRole", ...tokens, status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
