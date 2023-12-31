import { authAccessToken } from "../core/jwt";
import { NextResponse } from "next/server";
import { Users } from "@/entity";
import { Services } from "@/entity";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { CreateServiceDto } from "./dto/CreateServiceDto";
import { AppDataSource } from "../../../../lib/db";

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  try {
    const response = await authAccessToken(req);
       
    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }

    const user = await (await AppDataSource()).manager.findOne(Users, {
      where: [{ id: response.data.id }],
    });
    
    if (!user) {
      return NextResponse.json("User not found", { status: 404 });
    }

    const formData = await req.json();
    const createServiceDto = plainToClass(CreateServiceDto, formData);
    const errorMessages = await validate(createServiceDto);

    if (errorMessages.length > 0) {
      const errors = errorMessages
        .map((error) => Object.values(error.constraints))
        .flat();
      return NextResponse.json({ errors, status: false }, { status: 404 });
    }
    let name = formData.name;
    let service_areas = formData.service_areas;
    let location = formData.location;
    let formattedName = name.replace(/\s/g, "-");
    let formatted_service_areas =service_areas.replace(/\s/g, "-");
    let formatted_location =location.replace(/\s/g, "-");

    let service = new Services();
    service = plainToClass(Services, formData);
    service.user_id = user;
    
    const newService = await (await AppDataSource()).manager.save(service);
    let result =`${formattedName}-${formatted_location}-${formatted_service_areas}-${newService.id}`;
    newService.url=result
    await (await AppDataSource()).manager.save(newService);

    return NextResponse.json(
      {
        service: newService,
        status: true,
        message: "successfully service created ",
      },
      { status: 200 }
    );
  } catch (error) {                    
    return NextResponse.json(error, { status: 500 });
  }
}

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
      return NextResponse.json({ errors, status: false }, { status: 404 });
    }
    if(formData.user_id.id!=response.data.id)return  NextResponse.json({ message:"User is not correct", status: false }, { status: 404 });

    let service = new Services();
    service = plainToClass(Services, formData);

    const newService = await (await AppDataSource()).manager.save(service);
   
    return NextResponse.json(
      {
        service: newService,
        status: true,
        message: "successfully service created ",
      },
      { status: 200 }
    );
  } catch (error) {                    
    return NextResponse.json(error, { status: 500 });
  }
}