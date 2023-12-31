import { NextResponse } from "next/server";
import { Services } from "@/entity";
import { Repository } from "typeorm";
import { authAccessToken } from "@/app/api/core/jwt";
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

    const service_id = params.id;
    const servicesRepository: Repository<Services> =
    (await AppDataSource()).getRepository(Services);

    const service = await servicesRepository.findOne({
      where: { service_id, user_id: { id: response.data.id} , active : true ,is_delete:false},
      relations: ["user_id"],
    });

    if (!service)
      return NextResponse.json(
        { message: "not found service", status: false },
        { status: 404 }
      );

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
