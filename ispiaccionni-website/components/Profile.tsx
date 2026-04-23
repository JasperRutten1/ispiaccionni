import Image from "next/image";

type ProfileProps = {
  image: string;
  title: string;
  alt?: string;
};

export function Profile({ image, title, alt }: ProfileProps) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-gray-800 border border-gray-700 overflow-hidden shadow-lg transition-transform duration-300 hover:-translate-y-1 h-full">
      <div className="relative w-full">
        <Image
          src={image}
          alt={alt ?? title}
          className="object-cover"
          height={500}
          width={2000}
          loading="eager"
        />
      </div>
      <div className="w-full p-2 text-center">
        <h3 className="text-lg font-semibold text-amber-200">{title}</h3>
      </div>
    </div>
  );
}
