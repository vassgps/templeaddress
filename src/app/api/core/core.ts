import { Admin, Users } from "@/entity";
import * as bcrypt from "bcrypt";
import { AppDataSource } from "../../../../lib/db";

export const updateRefreshToken = async (user: Users|Admin, refreshToken: string) => {
  const hashedRefreshTokn = await hashData(refreshToken);
  user.refresh_token = hashedRefreshTokn;
  await (await AppDataSource()).manager.save(user);
};

export const hashData = async (data: string) => {
  return await bcrypt.hash(data, 12);
};
