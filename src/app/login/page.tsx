import Image from "next/image";
import React from "react";

export default function Home() {
  return (
    <section className="w-screen h-screen flex">
      <div className="w-1/2 h-full flex flex-col justify-center items-center ">
      <h1 className="text-3xl font-bold text-center text-primary mb-10">QuickCash</h1>
        <form className="w-full px-36" action="">
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Email</span>
                </div>
                <input type="text" placeholder="Test@email.com" className="input input-bordered w-full input-primary" />
            </label>
            
            <label className="form-control w-full">
                <div className="label">
                    <span className="label-text">Password</span>
                </div>
                <input type="password" placeholder="*************" className="input input-bordered w-full input-primary" />
            </label>

            <button type="submit" className="mt-8 w-full btn btn-primary">Login</button>
        </form>
      </div>
      <div className="p-32 w-1/2 h-full flex flex-col justify-center items-center bg-blue-400">
            <Image width={300} height={300} src="/cashier.webp" alt="" />
            <h1 className="text-3xl font-bold text-center text-gray-100">Where Every Transaction is Quick and Easy</h1>
      </div>
    </section>
  );
}
