import { AppDataSource } from "../../../../../lib/db";
import { Users } from "@/entity";
import { sendMail } from "@/utils/sent-otp";
import { NextResponse } from "next/server";
import { Repository } from "typeorm";

export async function POST(req) {
  try {
    const data = await req.json();

    const { email } = data;

    const userRepository: Repository<Users> = (await AppDataSource()).getRepository(Users);
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const user = await userRepository.findOne({
      where: { email: email },
    });
    if (!user)
      return NextResponse.json(
        { message: "Account not found, please register", status: false },
        { status: 404 }
      );

    const res = await sendMail(email, otp);

    user.otp = otp;
    await userRepository.save(user);

    if (res.success) {
      return NextResponse.json(
        { message: "otp sented successfully", status: true },
        { status: 200 }
      );
    } else {
      return NextResponse.json({message: "There is an issue with the email. It may be invalid. Please review and try again", status: false }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
