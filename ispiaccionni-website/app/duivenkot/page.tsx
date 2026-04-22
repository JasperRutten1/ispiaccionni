import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="mx-5 lg:mx-15 my-10 rounded-md bg-gray-800 p-5 lg:p-10 text-white">
      <h2 className="mb-4 text-4xl font-semibold text-amber-200">Duivenkot</h2>
      <Image
        className="border-solid border-2 border-black rounded-md w-50"
        src="/images/wip.jpeg"
        width={500} 
        height={500}
        alt="Pigeons are a lie"
      />
    </main>
  );
}
