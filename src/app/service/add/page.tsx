import Content from '@/components/content/Content'
import dynamic from 'next/dynamic'
import ProtectRouter from '@/components/auth/authenticationRoute/protectRouter';
import Navbar from "@/components/layout/navbar/Navbar";
const TitleCard = dynamic(() => import('@/components/ui/titleCard/TitleCard'))
const ServiceForm = dynamic(() => import('@/components/serviceForm/ServiceForm'))
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))

const page = () => {
  return (
    <ProtectRouter>
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
      <TitleCard image='https://antiquebetabucket.s3.ap-south-1.amazonaws.com/file1704350307989' title="Service > Add Service" />
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
