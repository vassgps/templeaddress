
import { NextResponse } from "next/server";
import { AppDataSource } from "../../../../../lib/db";
import { Users } from "@/entity";
import { authAccessToken } from "../../core/jwt";
import * as bcrypt from "bcrypt";
import { ResetPasswordDto } from "../dto/user.auth.dto";
import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { hashData } from "../../core/core";


export async function PUT(req: Request) {
    try {
        const data = await req.json();
        const resetPasswordDto = plainToClass(ResetPasswordDto, data);
        const errorMessages = await validate(resetPasswordDto);
    
        if (errorMessages.length > 0) {
          const errors = errorMessages
            .map((error) => Object.values(error.constraints))
            .flat();
          return NextResponse.json({ errors, status: false });
        }
    
        const response = await authAccessToken(req);
          
        if (!response.auth && !response.status) {
            return NextResponse.json(response, { status: 401 });
        }

      const user = await (await AppDataSource()).manager.findOne(Users, {
          where: { id:response.data.id },
      });
      
      if (!user) {
          return NextResponse.json({ message: "user not found" , status: false}, { status: 500 });
        }
        const {password,reset_password}=data
        
      if (!(await bcrypt.compare(password, user.password))){
        return NextResponse.json(
            { message: "Password not matching" },
            { status: 400 }
          );    
      }

      const hashPassword = await hashData(reset_password);
      user.password=hashPassword
      await (await AppDataSource()).manager.save(user);
      return NextResponse.json({ user,message:"Password Reset passworded", status: true }, { status: 200 });
    } catch (error) {      
      return NextResponse.json(error, { status: 500 });
    }
  }

