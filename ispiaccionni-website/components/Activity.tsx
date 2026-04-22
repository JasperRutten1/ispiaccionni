import Image from "next/image";

type ActivityProps = {
  image: string;
  title: string;
  description: string;
  alt?: string;
};

export function Activity({ image, title, description, alt }: ActivityProps) {
  return (
    <div className="rounded-lg bg-gray-700 overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full h-full">
      <div className="relative h-full w-full">
        <Image
          src={image}
          alt={alt || title}
          className="object-cover"
          height={500}
          width={600}
        />
      </div>
      <div className="p-6 lg:min-h-45">
        <h3 className="mb-2 text-2xl font-semibold text-amber-200">{title}</h3>
        <p className="text-gray-200 leading-relaxed flex-1">{description}</p>
      </div>
    </div>
  );
}
