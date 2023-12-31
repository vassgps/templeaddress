import * as bcrypt from "bcrypt";

import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { NextResponse } from "next/server";
import { LoginUserDto } from "../dto/user.auth.dto";
import { Users } from "@/entity";
import { updateRefreshToken } from "../../core/core";
import { getTokens } from "../../core/jwt";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../lib/db";


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

    const userRepository : Repository<Users>= (await AppDataSource()).getRepository(Users);

    const user = await userRepository.findOne({
      where: [{ email:email.toLowerCase() }, { phone_number: email }],
    });

    if (!user) {
      return NextResponse.json(
        { message: "Account not found, please register" },
        { status: 400 }
      );
    }
    if (user && !user.active) {
      return NextResponse.json(
        { message: "Admin Blocked This Account " },
        { status: 400 }
      );
    }
    if (!(await bcrypt.compare(password, user.password)))
      return NextResponse.json(
        { message: "Password not matching" },
        { status: 400 }
      );

    const tokens = await getTokens(user.id, user.email);
    await updateRefreshToken(user, tokens.refreshToken);

    return NextResponse.json(
      { user,role:"userRole", ...tokens, status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
