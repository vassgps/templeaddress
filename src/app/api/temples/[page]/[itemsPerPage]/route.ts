import { NextRequest, NextResponse } from "next/server";
import { Temples } from "@/entity";
import { ILike, Repository } from "typeorm";
import {AppDataSource}  from "../../../../../../lib/db";


export async function GET(req:NextRequest,{ params }: { params: { page: string,itemsPerPage:number }}) {
  try {
    let search=req.nextUrl.searchParams.get("search")
    if(!search||search===undefined){
      search=""
    }

    const page = parseInt(params.page, 10) || 1;
    const itemsPerPage = Number(params.itemsPerPage);
    
    const templesRepository: Repository<Temples> = (await AppDataSource()).getRepository(Temples);

      const [items, totalCount] = await templesRepository.findAndCount({
        where: { active : true ,is_delete:false, name: ILike(`%${search}%`)},
        take: itemsPerPage,
        skip: (page - 1) * itemsPerPage,
        order: { created_at: 'DESC' },
      });      
      
    let count=Math.ceil(totalCount/itemsPerPage)
    
    return NextResponse.json({items, totalCount:count,message:"fetched  services"}, { status: 200 });
  } catch (error) {    
    console.log(error);
                            
    return NextResponse.json(error, { status: 500 });
  }
}

