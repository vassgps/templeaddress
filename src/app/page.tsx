import About from "@/components/about/About";
import Footer from "@/components/layout/footer/Footer";
import Temple from "@/components/home/Home";
import Navbar from "@/components/layout/navbar/Navbar";

 async function Home({searchParams}) {
  return (
    <main className='flex flex-col min-h-screen'>
      <Navbar />
      <div className="main lg:mx-40 mx-5 mb-10  ">
        <About />
        <Temple service={false} search={searchParams?.search||""} />
      </div>  
      <Footer />
    </main>
  );
}
export default Home;
