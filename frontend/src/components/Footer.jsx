import { ArrowUp, Facebook, Instagram, Twitter } from "lucide-react";
import { Button } from "@radix-ui/themes";
export default function Footer() {
  return (
    <footer
      className="px-3 sm:px-5 md:px-12 pt-20 flex gap-10 flex-wrap justify-between text-white"
      style={{ background: "#0F172A" }}
    >
      <div className="flex gap-10 flex-wrap justify-between">
        <div className="flex-1 flex flex-col gap-3 min-w-37.5">
          <a href="/">
            <img
              src="/images/logo.png"
              alt="Main-Logo"
              className="w-12 sm:w-16 md:w-18"
            />
          </a>
          <p>
            The global community platform dedicated to helping people find lost
            items through honestly, technology, and trust
          </p>
        </div>
        <div className="flex-1 min-w-30 ml-10">
          <h5 className="text-md font-medium mb-4">Quick Links</h5>
          <ul>
            <a href="#">
              <li>About Us</li>
            </a>
            <a href="#">
              <li>Safety Center</li>
            </a>
            <a href="#">
              <li>Privacy Policy</li>
            </a>
            <a href="#">
              <li>Contact Support</li>
            </a>
          </ul>
        </div>
        <div className="flex flex-col flex-1 min-w-30">
          <h5 className="text-md font-medium mb-4">Connect</h5>
          <span className="flex gap-4">
            <Twitter className="cursor-pointer" />
            <Facebook className="cursor-pointer" />
            <Instagram className="cursor-pointer" />
          </span>
        </div>
        <div className="flex flex-col flex-1 min-w-30">
          <h5 className="text-md font-medium mb-4">Stay Informed</h5>
          <div
            style={{ background: "#1E293B" }}
            className="px-3 py-3 rounded-2xl flex items-center gap-2"
          >
            <input
              type="email"
              placeholder="Your email address"
              className="bg-transparent outline-none focus:outline-none focus:ring-0 flex-1 min-w-0"
            />
            <Button className="shrink-0">Join</Button>
          </div>
        </div>
      </div>
      <div className="border-t w-full flex justify-between items-center py-4">
        <p className="text-sm">
          &copy; Lost Link Technology Inc. All rights reserved.
        </p>
        <a
          href="#home"
          className="p-2 bg-blue-400 rounded-full inline-flex items-center justify-center
            transition-all duration-300 ease-out
            hover:scale-110 hover:-translate-y-1 hover:shadow-lg
            cursor-pointer"
        >
          <ArrowUp color="#0F172A" />
        </a>
      </div>
    </footer>
  );
}
