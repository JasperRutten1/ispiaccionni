import Image from "next/image";

export default function Home() {
  return (
    <main>
      <div className="w-full flex justify-center">
        <div className="w-full justify-left flex text-3xl flex-row px-5 bg-black">
          <Image
            className="border-solid border-2 w-25"
            src="/images/logo.png"
            width={500}
            height={500}
            alt="Pigeons are a lie"
          />
          <div className="h-full flex align-bottom">
            <h1 className="text-amber-50 py-10 px-10">I Spiaccionni</h1>
          </div>
        </div>
      </div>
      
      <div className="w-full flex justify-center">
        <Image
          className="border-solid border-2"
          src="/images/pigeon-vibes.gif"
          width={500}
          height={500}
          alt="Pigeons are a lie"
        />
      </div>
    </main>
  );
}
