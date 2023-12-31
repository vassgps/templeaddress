import Content from '@/components/content/Content'
import dynamic from 'next/dynamic'
const TitleCard = dynamic(() => import('@/components/ui/titleCard/TitleCard'))
import Navbar from "@/components/layout/navbar/Navbar";
const ServiceForm = dynamic(() => import('@/components/serviceForm/ServiceForm'))
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))
import templeImage from '@/assets/service-1.jpg';
import ProtectRouter from '@/components/auth/authenticationRoute/protectRouter';

const page = () => {
  return (
    <ProtectRouter>
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <TitleCard image={templeImage} title="Service > Add Service" />
      <div className=" lg:mx-40 mx-5 mt-5 mb-10">
        <ServiceForm edit={false}/>
        <Content/>
        </div>
      <Footer/>
    </div>
    </ProtectRouter>
  )
}

export default page
