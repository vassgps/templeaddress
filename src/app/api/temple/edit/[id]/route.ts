import { NextResponse } from "next/server";
import { Temples } from "@/entity";
import { Repository } from "typeorm";
import { authAccessToken } from "@/app/api/core/jwt";
import { isUUID } from "class-validator";
import { AppDataSource } from "../../../../../../lib/db";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }

    const temple_id = params.id;

    const templesRepository: Repository<Temples> =
    (await AppDataSource()).getRepository(Temples);

    if (!isUUID(temple_id)) {
      return NextResponse.json(
        { message: "not found temple", status: false },
        { status: 404 }
      );
    }

    const temple = await templesRepository.findOne({
      where: {
        temple_id,
        user_id: { id: response.data.id },
        active: true,
        is_delete: false,
      },
      relations: ["user_id"],
    });

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
      { message: "not found service", status: false },
      { status: 500 }
    );
  }
}
