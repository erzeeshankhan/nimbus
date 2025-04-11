import Image from "next/image";
import Link from "next/link";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen">
      <section className="hidden w-1/2 items-center justify-center bg-brand p-10 lg:flex xl:w-2/5">
        <div className="flex max-h-[800px] max-w-[430px] flex-col justify-center space-y-12">
          <Image
            src="/nimbus-with-bg.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[350px]"
          />

          <div className="space-y-5 text-white">
            <h1 className="h1">Manage your files the best way</h1>
            <p className="body-1">
              This is a place where you can store all your documents.
            </p>
          </div>
          <Image
            src="/illustration.png"
            alt="Files"
            width={342}
            height={342}
            className="transition-all hover:rotate-2 hover:scale-105"
          />
        </div>
      </section>

      <section className="flex flex-1 flex-col items-center bg-white p-4 py-10 lg:justify-center lg:p-10 lg:py-0">
        <div className="mb-16 lg:hidden">
          {/* <Image
            src="/assets/icons/logo-full-brand.svg"
            alt="logo"
            width={224}
            height={82}
            className="h-auto w-[200px] lg:w-[250px]"
          />
              */}

          {/* Mobile Logo */}
          <Image
            src="/nimbus-logo.svg"
            alt="Nimbus Mobile Logo"
            width={160}
            height={60}
            className="block lg:hidden"
          />

          {/* Desktop Logo */}
          <Image
            src="/nimbus-with-bg.svg"
            alt="Nimbus Desktop Logo"
            width={224}
            height={82}
            className="hidden lg:block"
          />
        </div>
        {children}
        <span className="block mt-6 lg:mt-0 text-center">
          A Project By{" "}
          <Link
            href="https://zeeshankhan.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block ml-1 px-3 py-1 bg-gray text-dark hover:bg-blue rounded-lg transition-colors duration-200 shadow-sm"
          >
            Zeeshan Khan
          </Link>
        </span>
      </section>
    </div>
  );
};

export default Layout;
