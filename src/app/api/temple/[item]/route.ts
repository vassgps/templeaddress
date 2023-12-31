import { NextResponse } from "next/server";
import { Temples } from "@/entity";
import { Repository } from "typeorm";
import { isUUID } from "class-validator";
import { AppDataSource } from "../../../../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { item: string } }
) {
  try {
    const temple_id = params.item;
    

    const templesRepository: Repository<Temples> =
    (await AppDataSource()).getRepository(Temples);
    let temple: Temples | undefined;

    if (isUUID(temple_id)) {
      temple = await templesRepository.findOne({
        where: { temple_id, active: true, is_delete: false },
      });
    } else {
      temple = await templesRepository.findOne({
        where: { url: temple_id, active: true, is_delete: false },
      });
    }

    if (!temple)
      return NextResponse.json(
        { message: "not found temple", status: false },
        { status: 404 }
      );
    return NextResponse.json(
      { temple, message: "fetched temple", status: true },
      { status: 200 }
    );
  } catch (error) {
    
    return NextResponse.json(
      { message: "not found temple", status: false },
      { status: 404 }
    );
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { item: string } }
) {
  try {
    const temple_id = params.item;

    const templesRepository: Repository<Temples> =
    (await AppDataSource()).getRepository(Temples);

    const temple = await templesRepository.findOne({
      where: [{ id: temple_id, active: true, is_delete: false }],
    });
    temple.is_delete = true;
    await (await AppDataSource()).manager.save(temple);

    if (!temple)
      return NextResponse.json(
        {
          message: `Temple with id ${temple_id} not found or already deleted`,
          status: false,
        },
        { status: 404 }
      );
    return NextResponse.json(
      {
        temple,
        message: `Temple with id ${temple_id} deleted successfully.`,
        status: true,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { message: "not found temple", status: false },
      { status: 404 }
    );
  }
}
