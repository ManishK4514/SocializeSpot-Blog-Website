"use client"

import Link from "next/link";
import { useState, useEffect } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import MyBlogList from "@/components/MyBlogList";
import Navbar from "@/components/Navbar";

export default function MyBlogs() {
  const { data: session } = useSession();

  return (
    <div className="bg-[#995959] h-full">
      <Navbar />
      <div className="mt-4 mx-12 py-4">
        <MyBlogList email={session?.user?.email} />
      </div>
    </div>
  )
}
