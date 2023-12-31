import * as bcrypt from "bcrypt";
import { Admin } from "@/entity";
import { authRefreshToken } from "../../core/jwt";
import { NextResponse } from "next/server";
import { getTokens } from "../../core/jwt";
import { updateRefreshToken } from "../../core/core";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../lib/db";
export const dynamic = "force-dynamic"


/**
 * @swagger
 * /api/admin/coins:
 *   get:
 *     description: Returns the hello world
 *     responses:
 *       200:
 *         description: hello world
 *     summary: Your new heading goes here
 */
export async function GET(req: Request) {
  try {
    const response = await authRefreshToken(req);
    
    if (!response.auth && !response.status) {
      return NextResponse.json(response);
    }
    
    const adminRepository: Repository<Admin> = (await AppDataSource()).getRepository(Admin);

    const admin = await adminRepository.findOne({
      where: { id: response.data.id },
    });

   
    const refreshTokenMatches = await bcrypt.compare(
      response.token,
      admin.refresh_token
    );

    if (!refreshTokenMatches)
      NextResponse.json({ message: "Authentication failed", status: false });

    const tokens = await getTokens(admin.id, admin.email);
    await updateRefreshToken(admin, tokens.refreshToken);

    return NextResponse.json({
      message: "Successfully created access token",
      status: true,
      ...tokens,
      admin,
    });
    
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
