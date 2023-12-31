
import { NextResponse } from "next/server";
import {  Coin, Users } from "@/entity";
import { authAccessToken } from '../core/jwt';
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../lib/db";


export async function GET(req: Request) {
    try {
        const response = await authAccessToken(req);
       
        if (!response.auth && !response.status) {
          return NextResponse.json(response, { status: 401 });
        }

      const user = await (await AppDataSource()).manager.findOne(Users, {
          where: { id:response.data.id },
        select: ["user_id","coins","referral_code","active","name","email","phone_number"]
      });
      const coinRepository : Repository<Coin>= (await AppDataSource()).getRepository(Coin);
 
      if (!user) {
        return NextResponse.json({ message: "user not found" , status: false}, { status: 500 });
      }
      const coin = await coinRepository.find({
        take: 1, 
        select: ["one_coins"]
      });       
      return NextResponse.json({ user,one_coins:Number(coin[0].one_coins), status: true }, { status: 200 });
    } catch (error) {      
      return NextResponse.json(error, { status: 500 });
    }
  }

