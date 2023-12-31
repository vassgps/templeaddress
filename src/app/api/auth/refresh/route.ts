import * as bcrypt from "bcrypt";
import { Users } from "@/entity/users.entity";
import { authRefreshToken } from "../../core/jwt";
import { NextResponse } from "next/server";
import { getTokens } from "../../core/jwt";
import { updateRefreshToken } from "../../core/core";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../lib/db";
require('dotenv').config();
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    const response = await authRefreshToken(req);
    
    if (!response.auth && !response.status) {
      return NextResponse.json(response);
    }
    const userRepository: Repository<Users> = (await AppDataSource()).getRepository(Users);
    const user = await userRepository.findOne({
      where: { id: response.data.id },
    });

    if (user && !user.active) {
      return NextResponse.json({
        message: "Admin Blocked This Account ",
        status: false,
      });
    }
    const refreshTokenMatches = await bcrypt.compare(
      response.token,
      user.refresh_token
    );

    if (!refreshTokenMatches)
      NextResponse.json({ message: "Authentication failed", status: false });

    const tokens = await getTokens(user.id, user.email);
    await updateRefreshToken(user, tokens.refreshToken);

    return NextResponse.json({
      message: "Successfully created access token",
      status: true,
      ...tokens,
      user,
    });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
