import { authAccessToken } from "@/app/api/core/jwt";
import { CreateTempleDto } from "@/app/api/temple/dto/CreateTempleDto";
import { Admin, Temples } from "@/entity";
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
    const createTempleDto = plainToClass(CreateTempleDto, formData);
    const errorMessages = await validate(createTempleDto);

    if (errorMessages.length > 0) {
      const errors = errorMessages
        .map((error) => Object.values(error.constraints))
        .flat();
      return NextResponse.json({ errors, status: false }, { status: 400});
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

    let temple = new Temples();
    temple = plainToClass(Temples, formData);

    const newTemple = await  (await AppDataSource()).manager.save(temple);

    return NextResponse.json(
      {
        temple: newTemple,
        status: true,
        message: "successfully temple edited ",
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

    const temple_id = req.nextUrl.searchParams.get("id")

    
      const templesRepository: Repository<Temples> = (await AppDataSource()).getRepository(Temples);

    if (!isUUID(temple_id)) {
      return NextResponse.json(
        { message: "not found temple", status: false },
        { status: 404 }
      );
    }

    const temple = await templesRepository.findOne({
      where: {
        temple_id,
        is_delete: false,
      },
    });

    if (!temple){
      return NextResponse.json(
        { message: "not founds temple", status: false },
        { status: 404 }
      );}

    return NextResponse.json(
      { temple, message: "fetched temple", status: true },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "not found service", status: false },
      { status: 500 }
    );
  }
}
