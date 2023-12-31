import { NextResponse } from "next/server";
import { authAccessToken } from "../../../core/jwt";
import { Admin, WithdrawForm } from "@/entity";
import { Repository } from "typeorm";
import { AppDataSource } from "../../../../../../lib/db";

export async function PUT(req: Request) {
  try {
    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }

    const data = await req.json();
    const { form_id ,tranaction_id} = data;
    if(!form_id || !tranaction_id){
        return NextResponse.json({ message:"Invalid ID or transaction ID, please try again", status: false },{ status: 404 });
    }
    const adminRepository: Repository<Admin> =  (await AppDataSource()).getRepository(Admin);

    const admin = await adminRepository.findOne( {
        where: { id:response.data.id },
      });
     
    if (!admin) {
        return NextResponse.json(
          { message: "Account not found" },
          { status: 404 }
        );
    }

    const withdrawForm = await  (await AppDataSource()).manager.findOne(WithdrawForm, {
      where: { form_id },
    });       
    if (!withdrawForm) {
    return NextResponse.json({ message:"Something is wrong, please try again", status: false },{ status: 404 });
    }

    if (withdrawForm) {
      withdrawForm.status = "success";
      withdrawForm.tranaction_id=tranaction_id
      withdrawForm.admin_id=admin
      await  (await AppDataSource()).manager.save(withdrawForm);
    }

    return NextResponse.json({ withdrawForm, status: true },{ status: 200 });
  } catch (error) {    
    return NextResponse.json(error.message, { status: 500 });
  }
}
