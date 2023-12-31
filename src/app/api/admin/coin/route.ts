import { Admin, Coin } from "@/entity";
import { NextResponse } from "next/server";
import { Repository } from "typeorm";
import { authAccessToken } from "../../core/jwt";
import { AppDataSource } from "../../../../../lib/db";

export async function GET(req: Request) {
  try {
    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }

    const coinRepository: Repository<Coin> = (await AppDataSource()).getRepository(Coin);

    const coin = await coinRepository.find({ take: 1 });    
    if (!coin) {
      return NextResponse.json(
        { message: "Account not found" },
        { status: 404 }
      );
    }    
    return NextResponse.json({ one_coins:coin[0].one_coins, status: true }, { status: 200 });
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
      const data = await req.json();
      const { coin } = data;
      if(!coin){
        return NextResponse.json(
            { message: "coin not found" },
            { status: 404 }
          );
      }
    const adminRepository: Repository<Admin> = (await AppDataSource()).getRepository(Admin);
    const coinRepository: Repository<Coin> = (await AppDataSource()).getRepository(Coin);
       

      const admin = await adminRepository.findOne( {
        where: { id:response.data.id },
      });
      const coinData = await coinRepository.find({ take: 1 });    

      let stringNumber = coin.toString();

      if (!admin) {
        return NextResponse.json(
          { message: "Account not found" },
          { status: 404 }
        );
      }
      if (admin&&coinData) {
        coinData[0].one_coins = stringNumber;
        coinData[0].admin_id=admin
        await (await AppDataSource()).manager.save(coinData[0]);
      }
      return NextResponse.json({ coinData, status: true },{ status: 200 });
      
    } catch (error) {
      return NextResponse.json(error, { status: 500 });
    }
  }