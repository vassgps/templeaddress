import { AppDataSource } from "../../../../../lib/db";
import { Users } from "../../../../entity";
import { validate } from "class-validator";
import { plainToClass } from "class-transformer";
import { NextResponse } from "next/server";
import * as crypto from "crypto";
import { CreateUsersDto } from "../dto/user.auth.dto";
import { hashData, updateRefreshToken } from "../../core/core";
import { getTokens } from "../../core/jwt";

export async function POST(req: Request) {
  try {
    const data = await req.json();

    const createUsersDto = plainToClass(CreateUsersDto, data);
    const errorMessages = await validate(createUsersDto);

    if (errorMessages.length > 0) {
      const errors = errorMessages
        .map((error) => Object.values(error.constraints))
        .flat();
      return NextResponse.json({ errors, status: false });
    }

    const { name, email, password, phone_number, referrer_id } = data;

    const userRepository = (await AppDataSource()).getRepository(Users);

    const userExists = await userRepository.findOne({
      where: [{ email }, { phone_number: email }],
    });

    if (userExists) {
      return NextResponse.json({ message: "Account already exists" });
    }

    let referrerUser = null;
    if (referrer_id) {
      referrerUser = await checkReferrerUser(referrer_id);
      if (!referrerUser) {
        return NextResponse.json({
          message: "Incorrect referrer ID. Please provide a valid referrer ID.",
        });
      }
    }

    const referral_code = await crypto
      .randomBytes(3)
      .toString("hex")
      .toUpperCase();
    const hashPassword = await hashData(password);
    const user = new Users();
    (user.name = name),
      (user.password = hashPassword),
      (user.email = email.toLowerCase()),
      (user.phone_number = phone_number),
      (user.referral_code = referral_code),
      (user.referrer = referrerUser),
      await (await AppDataSource()).manager.save(user);

    const tokens = await getTokens(user.id, user.email);
    await updateRefreshToken(user, tokens.refreshToken);

    return NextResponse.json({ user, ...tokens, status: true });
  } catch (error) {
    return NextResponse.json(error, { status: 500 });
  }
}

async function checkReferrerUser(referrer_id: string) {
  const userRepository = (await AppDataSource()).getRepository(Users);

  const referrerUser = await userRepository.findOne({
    where: { referral_code: referrer_id },
  });

  if (!referrerUser) return null;
  if (referrerUser.referral_code === referrer_id) {
    referrerUser.coins += 10;
    await (await AppDataSource()).manager.save(referrerUser);
  }
  return referrerUser;
}
