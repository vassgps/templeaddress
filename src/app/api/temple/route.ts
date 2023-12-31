import { NextResponse } from "next/server";
import { authAccessToken } from "../core/jwt";
import { Temples, Users } from "@/entity";
import { plainToClass } from "class-transformer";
import { CreateTempleDto } from "./dto/CreateTempleDto";
import { validate } from "class-validator";
import { AppDataSource } from "../../../../lib/db";

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
    const createTempleDto = plainToClass(CreateTempleDto, formData);
    const errorMessages = await validate(createTempleDto);

    if (errorMessages.length > 0) {
      const errors = errorMessages
        .map((error) => Object.values(error.constraints))
        .flat();
      return NextResponse.json({ errors, status: false }, { status: 404 });
    }

    let name = formData.name;
    let town = formData.town;
    let deity = formData.deity[0];


    let formattedName = name.replace(/\s/g, "-");
    let formattedTown =town.replace(/\s/g, "-");
    let formattedDeity =deity.replace(/\s/g, "-");


    let temple = new Temples();
    temple = plainToClass(Temples, formData);
    temple.user_id = user;

    const newTemples = await (await AppDataSource()).manager.save(temple);
    let result = `${formattedName}-${formattedTown}-${formattedDeity}-${newTemples.id}`;    
    newTemples.url=result   
    await (await AppDataSource()).manager.save(newTemples);

    return NextResponse.json(
      {
        service: newTemples,
        status: true,
        message: "successfully temple created ",
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
    const createTempleDto = plainToClass(CreateTempleDto, formData);
    const errorMessages = await validate(createTempleDto);

    if (errorMessages.length > 0) {
      const errors = errorMessages
        .map((error) => Object.values(error.constraints))
        .flat();
      return NextResponse.json({ errors, status: false }, { status: 404 });
    }

    if (formData.user_id.id != response.data.id)
      return NextResponse.json(
        { message: "User is not correct", status: false },
        { status: 404 }
      );


    let temple = new Temples();
    temple = plainToClass(Temples, formData);

    const newTemple = await (await AppDataSource()).manager.save(temple);

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
