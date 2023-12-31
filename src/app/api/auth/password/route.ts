import { Users } from "@/entity/users.entity";
import { NextResponse } from "next/server";
import { hashData } from "../../core/core";
import { AppDataSource } from "../../../../../lib/db";

export async function POST(req: Request) {
  try {

    const data = await req.json();

    const { email, otp, password } = data;

    const user = await (await AppDataSource()).manager.findOne(Users, {
      where: { email },
    });

    if (!user) {
      return NextResponse.json(
        { message: "Account not found, please register", status: false },
        { status: 404 }
      );
    }

    if (user && user.otp) {
      if (user.otp == otp) {
        const hashPassword = await hashData(password);
        user.otp = "";
        user.password = hashPassword;
        await (await AppDataSource()).manager.save(user);
      }
    }

    return NextResponse.json(
      { message: "Password updated succesfully", status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
