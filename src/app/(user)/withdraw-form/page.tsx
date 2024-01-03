import ProtectRouter from "@/components/auth/authenticationRoute/protectRouter";
import dynamic from 'next/dynamic'
import Navbar from "@/components/layout/navbar/Navbar";
const WithdrawForm = dynamic(() => import('@/components/withdrawForm/WithdrawForm'))
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))
const TitleCard = dynamic(() => import('@/components/ui/titleCard/TitleCard'))


const page =  () => {
  return (
    <ProtectRouter>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <TitleCard title="Amount Withdraw " />
        <div className="main lg:mx-40 mx-5 mb-10  ">
          <WithdrawForm />
        </div>
        <Footer />
      </div>
    </ProtectRouter>
  );
};
export default page;
