import { NextRequest, NextResponse } from "next/server";
import { Services } from "@/entity";
import { ILike, Repository } from "typeorm";
import  {AppDataSource}  from "../../../../../../lib/db";
export async function GET(req: NextRequest,{ params }: { params: { page: string,itemsPerPage:number } }) {
  try {
    
    const page = parseInt(params.page, 10) || 1;
    const itemsPerPage = Number(params.itemsPerPage);  

    let search=req.nextUrl.searchParams.get("search")
    if(!search||search===undefined){
      search=""
    }
    
    const servicesRepository: Repository<Services> = (await AppDataSource()).getRepository(Services);

      const [items, totalCount] = await servicesRepository.findAndCount({
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
