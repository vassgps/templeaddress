import { NextResponse } from "next/server";
import { authAccessToken } from "../../../core/jwt";
import { Services } from "@/entity";
import { AppDataSource } from "../../../../../../lib/db";

export async function PUT(req: Request) {
  try {
    
    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }
    const data = await req.json();
    const { id } = data;
     
    const service = await  (await AppDataSource()).manager.findOne(Services, {
      where: [{ service_id: id }],
    });        
    
    if (service) {
      service.active = !service.active;
      await  (await AppDataSource()).manager.save(service);
    }
    return NextResponse.json({ service, status: true },{ status: 200 });
    
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
