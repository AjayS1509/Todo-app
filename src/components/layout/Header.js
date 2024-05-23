import Link from "next/link";

export default function Header() {
  return (
    <header className="flex justify-center p-4">
      <Link
        href=""
        className="text-red-400 font-semibold text-2xl text-center mx-auto"
      >
        TODO APP
      </Link>
    </header>
  );
}
