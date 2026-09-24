'use client'

import GradientWaves from "@/components/GradientWaves";
import Link from "next/link";

export default function Home() {
  return (
    <>
      {/* Full-viewport, fixed background layer — always fills the screen and resizes with it */}
      <div className="fixed inset-0 w-screen h-screen -z-10 overflow-hidden">
        <GradientWaves
          horizonColor="#5227FF"
          waveColor="#FF9FFC"
          crestColor="#FFFFFF"
          speed={0.4}
          amplitude={2.5}
          waveScale={0.6}
          waveRatio={0.9}
          swell={35}
          turbulence={20}
          tilt={1.11}
          zoom={1}
          height={5.5}
          fogDepth={15}
          detail="medium"
          brightness={1}
          opacity={1}
          mouseInteraction
          parallaxStrength={0.5}
          grain
          grainIntensity={0.05}
        />
      </div>

      {/* All content sits above the fixed gradient + the dot background from layout.js */}
      <section className="relative z-10">
        <div className="flex justify-center flex-col gap-4 items-center text-white min-h-[70vh] md:h-[80vh] px-5 md:px-0 text-xs md:text-base py-16 md:py-0 animate-fade-in-up">
          <div className="font-bold flex flex-col sm:flex-row gap-4 md:gap-10 md:text-5xl justify-center items-center text-2xl sm:text-3xl text-center">
            Get Me a Samosa
            <span>
              <img className="invertImg transition-transform duration-500 hover:rotate-12 hover:scale-110" width={72} src="/samosa.gif" alt="" />
            </span>
          </div>

          <p className="text-center max-w-xl">
            A crowdfunding platform for creators to fund their projects.
          </p>

          <p className="text-center max-w-xl">
            A place where your fans can buy you a samosa. Unleash the power of your fans and get your projects funded.
          </p>

          <div className="flex flex-wrap justify-center gap-2">
            <Link href={"/login"}>
              <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 active:scale-95">
                Start Here
              </button>
            </Link>

            <Link href="/about">
              <button type="button" className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-purple-500/40 active:scale-95">
                Read More
              </button>
            </Link>
          </div>
        </div>

        <div className="bg-white h-1 opacity-10 mx-4 sm:mx-10"></div>

        <div className="text-white container mx-auto pb-20 md:pb-32 pt-14 px-6 sm:px-10">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-14">Your Fans can buy you a Samosa</h2>
          <div className="flex flex-col sm:flex-row flex-wrap gap-10 sm:gap-6 justify-center sm:justify-around">
            <div className="item space-y-3 flex flex-col items-center justify-center max-w-xs mx-auto transition-transform duration-300 hover:-translate-y-2">
              <img className="bg-slate-400 rounded-full p-2 text-black shadow-lg transition-shadow duration-300 hover:shadow-purple-500/50" width={88} src="/man.gif" alt="" />
              <p className="font-bold text-center">Fans want to help</p>
              <p className="text-center text-sm sm:text-base">Your fans are available to support you</p>
            </div>
            <div className="item space-y-3 flex flex-col items-center justify-center max-w-xs mx-auto transition-transform duration-300 hover:-translate-y-2">
              <img className="bg-slate-400 rounded-full p-2 text-black shadow-lg transition-shadow duration-300 hover:shadow-purple-500/50" width={88} src="/coin.gif" alt="" />
              <p className="font-bold text-center">Fans want to contribute</p>
              <p className="text-center text-sm sm:text-base">Your fans are willing to contribute financially</p>
            </div>
            <div className="item space-y-3 flex flex-col items-center justify-center max-w-xs mx-auto transition-transform duration-300 hover:-translate-y-2">
              <img className="bg-slate-400 rounded-full p-2 text-black shadow-lg transition-shadow duration-300 hover:shadow-purple-500/50" width={88} src="/group.gif" alt="" />
              <p className="font-bold text-center">Fans want to collaborate</p>
              <p className="text-center text-sm sm:text-base">Your fans are ready to collaborate with you</p>
            </div>
          </div>
        </div>

        <div className="bg-white h-1 opacity-10 mx-4 sm:mx-10"></div>

        <div className="text-white container mx-auto pb-20 md:pb-32 pt-14 px-6 flex flex-col items-center justify-center">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-14">Learn more about us</h2>
        </div>
      </section>

      <style jsx global>{`
        @keyframes fadeInUp {
          0% {
            opacity: 0;
            transform: translateY(24px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fadeInUp 0.9s ease-out both;
        }
      `}</style>
    </>
  );
}