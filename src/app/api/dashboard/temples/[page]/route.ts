import { NextRequest, NextResponse } from "next/server";
import { authAccessToken } from "../../../core/jwt";
import { Temples } from "@/entity";
import { ILike, Repository } from "typeorm";
import { AppDataSource } from "../../../../../../lib/db";

export async function GET(
  req:NextRequest,
  { params }: { params: { page: string } }
) {
  try {
    let search=req.nextUrl.searchParams.get("search")
    if(!search||search===undefined){
      search=""
    }
    const page = parseInt(params.page, 10) || 1;
    const itemsPerPage = 6;

    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }

    const templesRepository: Repository<Temples> =(await AppDataSource()).getRepository(Temples);

      const [items, totalCount] = await templesRepository.findAndCount({
        where: { user_id: { id: response.data.id} ,active : true ,is_delete:false, name: ILike(`%${search}%`)},
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        order: { created_at: 'DESC' },
      });
      
    let count=Math.ceil(totalCount/itemsPerPage)
    
    return NextResponse.json({items, totalCount:count,message:"fetched  services"}, { status: 200 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
