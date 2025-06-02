"use client";

import "../app/globals.css";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { HomeIcon, PersonIcon } from "@radix-ui/react-icons";
import { TfiTicket } from "react-icons/tfi";
import { useSession, signIn, signOut } from "next-auth/react";

const Header = () => {
  const { data: session } = useSession();

  return (
    <nav className="drop-shadow-2xl flex items-center justify-between p-3 border-b border-slate-200 bg-slate-100 h-24">
      {/* Logo */}
      <div className="hover-inverse flex items-center gap-2">
        <Link href={"/"}>
          <Image
            src={"/images/logo.png"}
            alt="logo"
            height={90}
            width={90}
            className="hover-inverse max-w-[120px] max-h-[120px] py-4"
          />
        </Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-5 font-semibold max-md:hidden">
          <NavItem href="/" icon={<HomeIcon />} label="Home" />
          <NavItem href="/events" icon={<TfiTicket />} label="Events" />
          <NavItem href="/artists" icon={<PersonIcon />} label="Artists" />
          <NavItem href="/tags" icon={<TfiTicket />} label="Tags" />

          {session && (
            <NavItem
              href="/create-event"
              icon={<TfiTicket />}
              label="Create Event"
            />
          )}

          {session ? (
            <button
              onClick={() => signOut()}
              className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
            >
              Logout
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="bg-gradient-to-r from-orange-400 to-teal-600 text-white px-4 py-2 rounded-md font-medium hover:opacity-70"
            >
              Log in
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

const NavItem = ({ href, icon, label }) => (
  <Link
    href={href}
    className="flex items-center gap-2 hover:text-primary hover:scale-105 hover:underline-offset-8 hover:underline transition-all"
  >
    <div className="scale-110">{icon}</div>
    <p>{label}</p>
  </Link>
);

export default Header;
