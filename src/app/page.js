import TodoCard from "@/components/Todo/TodoCard";
import Header from "@/components/layout/Header";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <TodoCard />
    </>
  );
}
