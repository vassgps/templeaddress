import { Users } from "@/entity/users.entity";
import { authAccessToken } from "../../core/jwt";
import { NextResponse } from "next/server";
import { AppDataSource } from "../../../../../lib/db";


export async function POST(req: Request) {
  try {
    const response = await authAccessToken(req);
     
    if (!response.auth && !response.status) {
      return  NextResponse.json(response, { status: 404 })
    }


    const user = await (await AppDataSource()).manager.findOne(Users, {
      where: { id: response.data.id },
    });
    if(!user){
      return NextResponse.json({ message: "user not found", status:true},{status:404});
    }

    if (user && user.refresh_token) {
      user.refresh_token = "";
      await (await AppDataSource()).manager.save(user);
    }

    return NextResponse.json({ message: "user logout succesfully", status:true},{status:200});

  } catch (error) {        
    return NextResponse.json(error, { status: 500 });
  }
}
