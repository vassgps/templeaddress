import { AppDataSource } from "../../../../../lib/db";
import { Users } from "@/entity";
import { NextResponse } from "next/server";
import { Repository } from "typeorm";

export async function POST(req) {
  try {
    const data = await req.json();

    const { otp, email } = data;
    const userRepository: Repository<Users> = (await AppDataSource()).getRepository(Users);

    const user = await userRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      return NextResponse.json(
        { message: "Account not found, please register", status: false },
        { status: 404 }
      );
    }

    if (user.otp && user.otp == otp) {
      return NextResponse.json(
        { message: "correct otp", status: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json(
        { message: "wrong otp", status: false },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
