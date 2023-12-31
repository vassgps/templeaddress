import { authAccessToken } from "@/app/api/core/jwt";
import { CreateServiceDto } from "@/app/api/service/dto/CreateServiceDto";
import { Admin, Services } from "@/entity";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextRequest, NextResponse } from "next/server";
import { Repository } from "typeorm";

export async function PUT(req: Request) {
    try {
    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }

    const formData = await req.json();
    const createServiceDto = plainToClass(CreateServiceDto, formData);
    const errorMessages = await validate(createServiceDto);

    if (errorMessages.length > 0) {
      const errors = errorMessages
        .map((error) => Object.values(error.constraints))
        .flat();
      return NextResponse.json({ errors, status: false }, { status: 400 });
    }
    const adminRepository: Repository<Admin> = (await AppDataSource()).getRepository(Admin);

    const admin = await adminRepository.findOne({
      where: { id: response.data.id },
    });
    
    if (!admin) {
      return NextResponse.json(
        { message: "admin can only edit", status: false },
        { status: 404 }
      );
    }

    let service = new Services();
    service = plainToClass(Services, formData);

    const newService= await  (await AppDataSource()).manager.save(service);

    return NextResponse.json(
      {
        service: newService,
        status: true,
        message: "successfully service edited ",
      },
      { status: 200 }
    );
  } catch (error) {    
    return NextResponse.json(error, { status: 500 });
  }
}

import { isUUID } from "class-validator";
import { AppDataSource } from "../../../../../../lib/db";


export async function GET(
  req: NextRequest,
) {
  try {
    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }

    const service_id = req.nextUrl.searchParams.get("id");
    const servicesRepository: Repository<Services> =
    (await AppDataSource()).getRepository(Services);

      if (!isUUID(service_id)) {
        return NextResponse.json(
          { message: "not found service id", status: false },
          { status: 404 }
        );
      }

    const service = await servicesRepository.findOne({
      where: { service_id ,is_delete:false},
      relations: ["user_id"],
    });



    if (!service){
      return NextResponse.json(
        { message: "not found service", status: false },
        { status: 404 }
      );}

    return NextResponse.json(
      { service, message: "fetched service", status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "not found service", status: false },
      { status: 404 }
    );
  }
}
