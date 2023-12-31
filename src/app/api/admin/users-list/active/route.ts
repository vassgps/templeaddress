import { NextResponse } from "next/server";
import { authAccessToken } from "../../../core/jwt";
import { Users } from "@/entity";
import { AppDataSource } from "../../../../../../lib/db";

export async function PUT(req: Request) {
  try {
    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }
    const data = await req.json();
    const { id } = data;
     
    const user = await  (await AppDataSource()).manager.findOne(Users, {
      where: [{ user_id: id }],
    });
    
    if (user) {
      user.active = !user.active;
      await  (await AppDataSource()).manager.save(user);
    }
    return NextResponse.json({ user, status: true },{ status: 200 });
    
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
