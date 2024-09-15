import Image from "next/image";

export default function Home() {
  return (
    <>
      <div className=" h-dvh w-dvw flex items-center justify-center">
        <button className=" w-24 h-12 bg-blue-800 flex items-center justify-center text-lg font-bold text-white rounded-2xl">
          <a href="/pages/login" className=" w-full h-full flex items-center justify-center">Login</a>
        </button>
      </div>
      {/* <Login /> */}
    </>
  );
}
