import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import LandingFeatures from "@/components/LandingFeatures";
import Image from "next/image";

export default async function LandingPage() {
  const cookieStore = await cookies();
  const session = cookieStore.get("appwrite-session");

  if (session?.value) {
    redirect("/app");
  }

  return (
    <>
      <header className="w-full px-6 py-4 flex items-center justify-between shadow-md">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <Image
            src="/nimbus-with-bg.svg"
            alt="Nimbus Logo"
            width={150}
            height={50}
            className="h-auto"
          />
        </div>

        {/* Auth Buttons */}
        <div className="flex items-center gap-4">
          <Link
            href="/sign-in"
            className="bg-blue text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium hover:bg-brand-100 transition"
          >
            Sign In
          </Link>
          <Link
            href="/sign-up"
            className="bg-blue text-white px-6 py-2 rounded-full text-sm sm:text-base font-medium hover:bg-brand-100 transition"
          >
            Sign Up
          </Link>
        </div>
      </header>

      <div className="min-h-screen min-w-screen  flex flex-col items-center justify-center text-center">
        <section
          className="max-w-screen hero flex flex-col-reverse lg:flex-row items-center justify-between  px-4 py-16 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/bg.jpg')" }}
        >
          {/* Text Content */}
          <div className="flex-1 text-left space-y-6 p-5 bg-gray rounded-lg shadow-md bg-opacity-80">
            <h1 className="text-4xl sm:text-5xl font-extrabold text-slate-800">
              Welcome to <span className="text-blue-600">Nimbus</span>
            </h1>
            <p className="text-lg sm:text-xl text-slate-600">
              A seamless cloud storage platform to store, manage and access your
              files from anywhere. Fast, secure, and beautifully simple.
            </p>
            <Link
              href="/sign-up"
              className="inline-block bg-blue text-white px-8 py-3 rounded-full text-lg font-medium hover:bg-brand-100 transition"
            >
              Get Started
            </Link>
          </div>

          {/* Image */}
          <div className="flex-1">
            <Image
              src="/upload.svg"
              alt="Cloud Storage Illustration"
              width={500}
              height={500}
              className="w-full max-w-md mx-auto transition-transform hover:scale-105"
            />
          </div>
        </section>

        {/* Features Section */}
        <LandingFeatures />

        {/* Testimonials Section */}
        <section className="mt-32 w-full bg-gradient-to-r from-[#00ADB5] to-[#8ee4ef] py-20 px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-12">
            What Our Users Say
          </h2>
          <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {testimonials.map(({ quote, name, role }, i) => (
              <div
                key={i}
                className="p-6 bg-slate-50 rounded-xl shadow hover:shadow-md transition"
              >
                <p className="text-slate-700 text-base italic mb-4">
                  “{quote}”
                </p>
                <p className="font-semibold text-slate-800">{name}</p>
                <p className="text-sm text-slate-500">{role}</p>
              </div>
            ))}
          </div>
        </section>
        {/* Call to action Section */}
        <section className="mt-32 text-center px-6 py-5  from-blue-50 to-blue-100 w-full">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 text-slate-800">
            Ready to experience seamless storage?
          </h2>
          <p className="text-slate-600 text-lg mb-8">
            Sign up and get started in less than 30 seconds.
          </p>
          <Link
            href="/sign-up"
            className="inline-block bg-blue text-white px-10 py-4 rounded-full text-lg font-semibold hover:bg-brand-100 transition"
          >
            Start Now
          </Link>
        </section>
        <footer className="w-full py-5 px-6 bg-gray-100 text-center">
          <p className="text-sm text-gray-500 ">
            © {new Date().getFullYear()} Nimbus. All rights reserved.
          </p>
        </footer>
        {/* Footer */}
        <footer className="mt-4 text-sm mb-5 text-slate-800">
          <div className="flex justify-center mb-3 gap-4">
            <a
              href="https://github.com/erzeeshankhan"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-black transition"
            >
              <img
                src="/assets/icons/github.svg"
                alt="GitHub"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://x.com/Zeeshan__31"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-500 transition"
            >
              <img
                src="/assets/icons/x.svg"
                alt="Twitter"
                width={24}
                height={24}
              />
            </a>
            <a
              href="https://linkedin.com/in/zeeshankhan31/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-600 hover:text-blue-700 transition"
            >
              <img
                src="/assets/icons/linkedin.svg"
                alt="LinkedIn"
                width={24}
                height={24}
              />
            </a>
          </div>
          A Project by{" "}
          <Link
            href="https://zeeshankhan.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Zeeshan Khan
          </Link>
        </footer>
      </div>
    </>
  );
}

// Tesimonials Array
const testimonials = [
  {
    quote:
      "Nimbus makes my work life easier. Uploads are fast and everything’s always accessible.",
    name: "Aarav Mehta",
    role: "Product Manager, TechNova",
  },
  {
    quote:
      "The UI is clean and performance is top-notch. It's now my daily drive.",
    name: "Sanya Kapoor",
    role: "Freelance Designer",
  },
  {
    quote:
      "I switched from Drive and haven't looked back. Nimbus is simple yet powerful.",
    name: "Rohit Sharma",
    role: "Software Developer",
  },
];
