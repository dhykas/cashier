  'use client'

  import { ResData } from "@/utils/types";
  import Image from "next/image";
  import React, { useRef, useState } from "react";
  import { setCookie } from 'cookies-next';
  import { useRouter } from 'next/navigation';

  export default function Home() {
    const router = useRouter();

    const [err, setErr] = useState<Boolean>(false);
    const [isLoading, setIsloading] = useState<boolean>(false);
    const [errMess, setErrMess] = useState<string>('');
    const formRef = useRef<HTMLFormElement>(null);

    async function Login(event: React.MouseEvent<HTMLButtonElement>) {
      setIsloading(true);
      event.preventDefault();

      if (!formRef.current) return;
      
      const FD = new FormData(formRef.current);
      const fddata = Object.fromEntries(FD.entries()) as Record<string, string>;
      
      console.log(fddata)
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        body: FD
      });

      const data: ResData = await res.json();

      console.log(data)
      console.log(data.token)
      console.log(data.error)
      console.log(data.message)

      if(data.error){
        setErr(true)
        setErrMess(data.message)
        setIsloading(false);

        setTimeout(() => {
          setErr(false)
        }, 3000);

      }else{
        setCookie("token",data.token)
        setIsloading(false);
        router.push('/')
      }
    }

    return (
      <section className="w-screen h-screen flex flex-col-reverse lg:flex-row">
        {/* toast */}
        <div className={`toast ${err ? "" : "invisible"}`}>
          <div className="alert alert-error">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 shrink-0 stroke-current"
                fill="none"
                viewBox="0 0 24 24">
                <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{errMess}</span>
          </div>
        </div>

        {/* Left Section */}
        <div className="lg:w-1/2 w-full h-full flex flex-col justify-center items-center px-8 lg:px-0">
          <h1 className="text-3xl font-bold text-center text-primary mb-10">
            QuickCash
          </h1>
          <form className="w-full lg:px-36" ref={formRef}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text">Email</span>
              </div>
              <input
                name="email"
                type="text"
                placeholder="Test@email.com"
                className="input input-bordered w-full input-primary"
              />
            </label>

            <label className="form-control w-full mt-4">
              <div className="label">
                <span className="label-text">Password</span>
              </div>
              <input
                name="password"
                type="password"
                placeholder="*************"
                className="input input-bordered w-full input-primary"
              />
            </label>

            <button disabled={isLoading} onClick={Login} className="mt-8 w-full btn btn-primary">
              {isLoading ? (<span className="loading loading-bars loading-lg"></span>) : 'Login'}
            </button>
          </form>
        </div>

        {/* Right Section */}
        <div className="lg:w-1/2 w-full h-full flex flex-col justify-center items-center bg-blue-400 p-16 lg:p-32">
          <Image priority width={300} height={300} src="/cashier.webp" alt="Cashier image" />
          <h1 className="text-3xl font-bold text-center text-gray-100 mt-8">
            Where Every Transaction is Quick and Easy
          </h1>
        </div>
      </section>
    );
  }
