import { authAccessToken } from "../core/jwt";
import { NextResponse } from "next/server";
import {  Coin, Users ,WithdrawForm} from "@/entity";
import { plainToClass } from "class-transformer";
import { Repository } from "typeorm";
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
    const coinRepository : Repository<Coin>= (await AppDataSource()).getRepository(Coin);

    const coin = await coinRepository.find({
      take: 1, 
      select: ["one_coins"]
    });     

    if(Math.floor(Number(user.coins)*Number(coin[0].one_coins)) <0){
        return NextResponse.json("0 coin ", { status: 404 });
    }


    const formData = await req.json();
    
    let withdrawForm = new WithdrawForm();
    withdrawForm = plainToClass(WithdrawForm, {...formData,status:"pending"});
    withdrawForm.user_id = user;
    withdrawForm.coins=Number(withdrawForm.money/Number(coin[0].one_coins))


    const newWithdrawForm = await (await AppDataSource()).manager.save(withdrawForm);

    let initialBalance =  Number(Math.floor(user.coins * Number(coin[0].one_coins)))
    let remainingBalance = Number(initialBalance - withdrawForm.money)
    let remainingCons = Number(remainingBalance / Number(coin[0].one_coins))
    user.coins=Number(Math.ceil(remainingCons)) 
    await (await AppDataSource()).manager.save(user);
    return NextResponse.json(
      {
        withdrawForm:newWithdrawForm,
        status: true,
        message: "successfully Withdraw Form created ",
      },
      { status: 200 }
    );
  } catch (error) {      
    console.log(error);                  
    return NextResponse.json(error, { status: 500 });
  }
}





export async function GET(req: Request  ) {
    try {
        const response = await authAccessToken(req);
       
        if (!response.auth && !response.status) {
          return NextResponse.json(response, { status: 401 });
        }

      const WithdrawFormRepository: Repository<WithdrawForm> =(await AppDataSource()).getRepository(WithdrawForm);
       
      const WithdrawDatas = await WithdrawFormRepository.find({
        where:{user_id: { id: response.data.id}, active : true ,is_delete:false},
        order: { created_at: 'DESC' },
      });
  
      if(!WithdrawDatas) return NextResponse.json({message:"not found WithdrawDatas" ,status:false}, { status: 404 });
      return NextResponse.json({WithdrawDatas,message:"fetched Withdraw Datas",status:true}, { status: 200 });
        
    } catch (error) {      
      return NextResponse.json({error ,status:false}, { status: 500 });
    }
  }
  