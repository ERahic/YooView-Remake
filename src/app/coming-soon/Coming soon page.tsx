// to have the user be directed to this page when they click on a button/icon that has no functionality yet
"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";

function ComingSoon() {
  const router = useRouter();

  return (
    <div className="bg-gray-900 text-white items-center flex flex-col min-h-screen justify-center caret-transparent">
      <div className="flex ml-8 sm:ml-0">
        <Image
          src="/Yooview-logo-dark.png"
          alt="YooView Logo"
          width={450}
          height={450}
          className="cursor-pointer transition-all duration-100 hover:drop-shadow-[0_0_10px_rgba(0,100,150,1)]"
          onClick={() => router.push("/")}
          priority
        />
      </div>
      <h1 className="font-bold text-center sm:text-5xl mt-8">
        COMING SOON! PLEASE CLICK ON THE YOOVIEW LOGO TO RETURN BACK TO HOME
        PAGE!
      </h1>
    </div>
  );
}

export default ComingSoon;
