import Image from "next/image";
import ChatApp from "@/components/chat-app";
import { NavbarComponent } from "@/components/navbar";

export default function Home() {

  


  return (
    <div className="flex flex-col  font-[family-name:var(--font-geist-sans)]">
      {/* Navbar spans the full width at the top */}
          
      {/* ChatApp is centered and spans at least half the viewport width */}
      <div className="flex-grow flex items-center justify-center w-full p-8 sm:p-20">
        <div className="w-full max-w-2xl ">
          <ChatApp />
        </div>
      </div>
    </div>
  );
}