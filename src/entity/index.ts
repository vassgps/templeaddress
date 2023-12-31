
import { Users } from "./users.entity";
import {Services} from "./services.entity"
import { Temples } from "./temples.entity";
import { WithdrawForm } from "./withdrawForm.entity";
import { Admin } from "./admin.entity";
import { Coin } from "./coins.entity";

const entities = [Users,Services,Temples,WithdrawForm,Admin,Coin];

export { Users,Services,Temples,WithdrawForm,Admin,Coin};
export default entities;
