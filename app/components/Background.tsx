import Image from "next/image";
import heartsBackground from "../../public/hearts_background.webp";

export default function Background() {
  return (
    <Image
      src={heartsBackground}
      alt="Hearts"
      placeholder="blur"
      quality={100}
      fill
      sizes="100vw"
      className="object-cover"
    />
  );
}
