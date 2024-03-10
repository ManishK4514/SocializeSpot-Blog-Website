"use client"

import Link from "next/link";
import styles from '../styles/Home.module.css';
import { useState, useEffect } from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import { redirect } from "next/navigation";
import BlogList from "@/components/BlogList";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Home() {
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      redirect("/login");
    }
  }, [session]);

  // function handleSignOut() {
  //   signOut();
  // }

  // return (
  //   <div className={styles.container}>
  //     {session ? User({ session, handleSignOut }) : Guest()}
  //   </div>
  // )

  return (
    <div className="bg-[#995959] h-screen mb-11">
      <Navbar />
      <div className="mt-4 px-12 pt-4">
        <BlogList />
      </div>
    </div>
  )
}

// Guest

function Guest() {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>
        Guest Homepage
      </h3>

      <div className="flex justify-center">
        <Link className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray" href={'/login'}>Sign In</Link>
      </div>
    </main>
  )
}

// Authorize User

function User({ session, handleSignOut }) {
  return (
    <main className='container mx-auto text-center py-20'>
      <h3 className='text-4xl font-bold'>
        Authorize User Homepage
      </h3>

      <div className="details">
        <h5>{session.user.name}</h5>
        <h5>{session.user.email}</h5>
      </div>

      <div className="flex justify-center">
        <button onClick={handleSignOut} className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 "> Sign Out</button>
      </div>

      <div className="flex justify-center">
        <Link className="mt-5 px-10 py-1 rounded-sm bg-indigo-500 text-gray-50" href={'/profile'}>Profile Page</Link>
      </div>
    </main>
  )
}