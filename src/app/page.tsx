"use client"

import Image from "next/image";
import Categories from "../component/Categories";
import node from "postcss/lib/node";
import CardDisplay from "@/component/CardDisplay";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <CardDisplay/>
      </main>
    </div>
  );
}
