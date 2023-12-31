import { NextResponse } from "next/server";
import { authAccessToken } from "../../../core/jwt";
import { Temples } from "@/entity";
import { AppDataSource } from "../../../../../../lib/db";

export async function PUT(req: Request) {
  try {
    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }
    const data = await req.json();
    const { id } = data;
     
    const temple = await  (await AppDataSource()).manager.findOne(Temples, {
      where: [{ temple_id: id }],
    });
    
    if (temple) {
      temple.active = !temple.active;
      await  (await AppDataSource()).manager.save(temple);
    }
    return NextResponse.json({ temple, status: true },{ status: 200 });
    
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
