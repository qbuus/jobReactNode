import React from "react";
import { Link } from "react-router-dom";
import { GiNetworkBars } from "react-icons/gi";

const Footer = () => {
  return (
    <div className="footer z-30 p-10 bg-opacity-90 backdrop-blur transition-all duration-100 bg-base-100 text-base-content">
      <aside>
        <div className="flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <GiNetworkBars className="h-12 w-12 sm:w-14 sm:h-14" />
            <div className="text-lg sm:text-xl font-normal">
              <span className="lowercase">job</span>
              <span className="uppercase">Portal</span>
            </div>
          </div>
          <br />© Copyright 2020. All Rights Reserved.
        </div>
      </aside>
      <nav>
        <header className="footer-title">Services</header>
        <Link className="link link-hover">Branding</Link>
        <Link className="link link-hover">Design</Link>
        <Link className="link link-hover">Marketing</Link>
        <Link className="link link-hover">Advertisement</Link>
      </nav>
      <nav>
        <header className="footer-title">Company</header>
        <Link className="link link-hover">About us</Link>
        <Link className="link link-hover">Contact</Link>
        <Link className="link link-hover">Jobs</Link>
        <Link className="link link-hover">Press kit</Link>
      </nav>
      <nav>
        <header className="footer-title">Legal</header>
        <Link className="link link-hover">Terms of use</Link>
        <Link className="link link-hover">Privacy policy</Link>
        <Link className="link link-hover">Cookie policy</Link>
      </nav>
    </div>
  );
};

export default Footer;
