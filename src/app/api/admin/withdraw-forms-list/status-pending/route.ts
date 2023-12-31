import { NextResponse } from "next/server";
import { authAccessToken } from "../../../core/jwt";
import { WithdrawForm } from "@/entity";
import { AppDataSource } from "../../../../../../lib/db";

export async function PUT(req: Request) {
  try {
    const response = await authAccessToken(req);

    if (!response.auth && !response.status) {
      return NextResponse.json(response, { status: 401 });
    }
    const data = await req.json();
    const { id } = data;
     
    const withdrawForm = await  (await AppDataSource()).manager.findOne(WithdrawForm, {
      where: { form_id: id },
    });    
    
    if (withdrawForm) {
      withdrawForm.status = "pending";
      withdrawForm.tranaction_id=""
      withdrawForm.admin_id=null
      await  (await AppDataSource()).manager.save(withdrawForm);
    }
    return NextResponse.json({ withdrawForm, status: true },{ status: 200 });
    
  } catch (error) {    
    return NextResponse.json(error, { status: 500 });
  }
}
