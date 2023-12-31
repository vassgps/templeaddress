import About from "@/components/about/About";
import dynamic from 'next/dynamic'
import Navbar from "@/components/layout/navbar/Navbar";
const Footer = dynamic(() => import('@/components/layout/footer/Footer'))
const Services = dynamic(() => import('@/components/home/Home'))

 async function Home({searchParams}) {
  return (
    <main className='flex flex-col min-h-screen'>
      <Navbar />
      <div className="main lg:mx-40 mx-5 mb-10  ">
        <About />
        <Services service={true} search={searchParams?.search||""} />
      </div>  
      <Footer />
    </main>
  );
}
export default Home;
