import Link from "next/link";
import React from "react";

const Page404 = () => {
  return (
    <div className="min-h-screen min-w-screen flex justify-center items-center flex-col bg-slate-200 gap-y-4">
      <div className="text-slate-600 text-4xl font-bold">404</div>
      <p>You have gotten lost - lets get you back to safety!</p>
      <Link className="bg-slate-600 text-white px-4 py-2 rounded-md hover:underline" href="/">Go Home</Link>
    </div>
  )
};

export default Page404;
