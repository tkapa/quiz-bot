import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex gap-3 w-full">
      <div className="flex flex-col w-full text-center border rounded-md p-4 gap-4">
        <h2>Angular</h2>
        <Link
          href={"/quiz/angular"}
          className="p-2 border w-fit self-center hover:cursor-pointer"
        >
          Take Quiz
        </Link>
      </div>
      <div className="flex flex-col w-full text-center border rounded-md p-4">
        Angular
        <button className="p-2 border w-fit">Take Quiz</button>
      </div>
      <div className="flex flex-col w-full text-center border rounded-md p-4">
        Angular
        <button className="p-2 border w-fit">Take Quiz</button>
      </div>
    </div>
  );
}
