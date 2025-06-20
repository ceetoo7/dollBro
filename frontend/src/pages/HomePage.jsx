import React from "react";
import Layout from "../components/Layout/Layout.jsx";
import { useAuth } from "../context/auth.jsx";

const HomePage = () => {
  const { auth, setAuth } = useAuth();
  return (
    <Layout
      title={"Best Offers"}
      description={
        "Doll Bro is the besst shop and you can find every kind of teddy bears and doll products here"
      }
      keywords={
        "dollnepal dollbro ,dollmandu, doll store in nepal, teddy bear in nepal"
      }
      author={"Chandan Chaudhary"}
    >
      <pre>{JSON.stringify(auth, null, 4)}</pre>
      <section className="relative w-full h-[70vh]">
        {/* Image from web */}
        <img
          src="https://media.canva.com/v2/image-resize/format:JPG/height:452/quality:92/uri:ifs%3A%2F%2FM%2Ffc52b115-94c6-4b7d-a52e-dca5f418923d/watermark:F/width:800?csig=AAAAAAAAAAAAAAAAAAAAAAxh5iXqlZ-bMPaVCim0kiEuE1T9zIvQSBBHyp90uiGV&exp=1750262679&osig=AAAAAAAAAAAAAAAAAAAAALFctnDf2_IUV9aJP7I2be2-JOg68cSM1SiMOGuREyPs&signer=media-rpc&x-canva-quality=screen"
          alt="Landing"
          className="absolute inset-0 w-full h-full  object-cover"
        />

        {/* Black overlay with opacity */}
        {/* <div className="absolute inset-0 bg-stone-500/30 z-10" /> */}

        {/* Overlay content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-14">
          <div className="bg-green-950/40  p-6 rounded-lg shadow-lg">
            <h1 className="text-white text-3xl md:text-5xl font-bold">
              Welcome to Doll Bro
            </h1>
            <p className="text-white font-light mt-2 text-base md:text-lg">
              Discover amazing products at unbeatable prices
            </p>
            <button className="mt-4 px-6 py-2 bg-violet-900 hover:bg-violet-500 text-white rounded shadow hover:bg-gray-200 transition">
              <a href="/shop">Shop Now</a>
            </button>
          </div>
        </div>
      </section>

      <section className="w-[95vw] md:w-[75vw] m-auto">
        <div className="flex flex-col items-center m-10 "></div>
        <h2 className="text-2xl font-semibold m-4">Featured Products</h2>
        <p className=" font-light text-gray-600 mb-6 text-center">
          Welcome to our featured products section!
          <br /> This is our collection of fetured products showcasing our
          unique products from the store.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
          {/* Placeholder for product cards */}
          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              className="h-[20vh] w-full object-cover mb-4 rounded-2xl "
              src="https://cdn.pixabay.com/photo/2018/10/10/23/31/teddy-3738656_1280.jpg"
              alt=""
            />
            <h3 className="text-lg font-medium">Doll 1</h3>
            <p className="text-pretty font-light text-xs md:text-sm text-gray-600 ">
              This is a fluffy teddy bear in brown. It is very cute
            </p>
            <p className="text-violet-800 ">NRS 19.99</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              className="h-[20vh] w-full object-cover mb-4 rounded-2xl "
              src="https://cdn.pixabay.com/photo/2015/11/20/17/51/stuffed-animal-1053580_1280.jpg"
              alt=""
            />
            <h3 className="text-lg font-medium">Doll 2</h3>
            <p className="text-pretty font-light text-xs md:text-sm text-gray-600 ">
              This is a fluffy teddy bear in brown. It is very cute
            </p>
            <p className=" text-violet-800">NRS 24.99</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              className="h-[20vh] w-full object-cover mb-4 rounded-2xl "
              src="https://cdn.pixabay.com/photo/2018/02/04/22/39/teddy-3131050_1280.jpg"
              alt=""
            />
            <h3 className="text-lg font-medium">Doll 3</h3>
            <p className="text-pretty font-light text-xs md:text-sm text-gray-600 ">
              This is a fluffy teddy bear in brown. It is very cute
            </p>
            <p className="text-violet-800">NRS 29.99</p>
          </div>

          <div className="bg-gray-100 p-4 rounded-lg shadow-md">
            <img
              className="h-[20vh] w-full object-cover mb-4 rounded-2xl "
              src="https://cdn.pixabay.com/photo/2014/12/10/10/04/teddy-562960_1280.jpg"
              alt=""
            />
            <h3 className="text-lg font-medium">Doll 4</h3>
            <p className="text-pretty font-light text-xs  md:text-sm text-gray-600 ">
              This is a fluffy teddy bear in brown. It is very cute. Aww! It is
              injured.
            </p>
            <p className="text-violet-800">NRS 34.99</p>
          </div>
        </div>
      </section>

      <div className="mt-10 text-center">
        <p className="text-gray-600">
          Explore our collection and find the perfect doll for you!
        </p>
        <a
          href="/shop"
          className="m-4 inline-block bg-violet-950 text-white px-6 py-2 rounded hover:bg-violet-500 transition duration-300"
        >
          Shop Now
        </a>
      </div>
    </Layout>
  );
};

export default HomePage;
