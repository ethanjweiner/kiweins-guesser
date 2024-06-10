export default function Hider() {
  return (
    <div className="absolute inset-0 flex h-64 justify-left">
      <div
        className="flex ml-2 justify-center text-center items-center"
        style={{
          backgroundColor: "rgb(40,40,40)",
          width: "240px",
          height: "350px",
        }}
      ></div>
      <div
        className="flex justify-center text-center items-center"
        style={{
          backgroundColor: "rgb(40,40,40)",
          width: "60px",
          height: "280px",
        }}
      ></div>
      <p className="absolute text-white text-8xl flex justify-center mt-12 items-center h-full w-full">
        ?
      </p>
    </div>
  );
}
