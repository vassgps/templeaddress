import { NextResponse } from "next/server";
import { Services } from "@/entity";
import { Repository } from "typeorm";
import { isUUID } from "class-validator";
import { AppDataSource } from "../../../../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { item: string } }
) {
  try {
    const service_id = params.item  
    const servicesRepository: Repository<Services> =(await AppDataSource()).getRepository(Services);
    
    let service :Services;
    if (isUUID(service_id)) {
      service = await servicesRepository.findOne({
        where: { service_id, active: true, is_delete: false },
      });
    } else {
      service = await servicesRepository.findOne({
        where: { url: service_id, active: true, is_delete: false },
      });
    }

    if(!service) return NextResponse.json({message:"not found service" ,status:false}, { status: 404 });
    return NextResponse.json({service,message:"fetched service",status:true}, { status: 200 });
      
  } catch (error) {
    return NextResponse.json({message:"not found service" ,status:false}, { status: 404 });
  }
}



export async function DELETE(
  req: Request,
  { params }: { params: { item: string } }
) {
  try {
    const service_id = params.item;

    const servicesRepository: Repository<Services> =
    (await AppDataSource()).getRepository(Services);

    const service = await servicesRepository.findOne({
      where: [{ id: service_id, active: true, is_delete: false }],
    });
    service.is_delete = true;
     await (await AppDataSource()).manager.save(service);

    if (!service)
      return NextResponse.json(
        { message: `service with id ${service_id} not found or already deleted`, status: false },
        { status: 404 }
      );
    return NextResponse.json(
      { service, message: `service with id ${service_id} deleted successfully.`, status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "not found service", status: false },
      { status: 404 }
    );
  }
}
