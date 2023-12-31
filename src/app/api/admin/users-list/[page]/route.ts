import { NextRequest, NextResponse } from "next/server";
import { Users } from "@/entity";
import { ILike, Repository } from "typeorm";
import { authAccessToken } from "../../../core/jwt";
import { AppDataSource } from "../../../../../../lib/db";

export async function GET(req: NextRequest,{ params }: { params: { page: string } }) {
  try {
    const page = parseInt(params.page, 10) || 1;
    const itemsPerPage = 6;
    let search=req.nextUrl.searchParams.get("search")
    if(!search||search===undefined){
      search=""
    }

    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }

    
    const usersRepository: Repository<Users> = (await AppDataSource()).getRepository(Users);

      const [items, totalCount] = await usersRepository.findAndCount({
        where: { is_delete:false, name: ILike(`%${search}%`)},
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        order: { created_at: 'DESC' },
        relations: ['referrer'],
      });
      
    let count=Math.ceil(totalCount/itemsPerPage)
    
    return NextResponse.json({items, totalCount:count,message:"fetched users"}, { status: 200 });

  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}
