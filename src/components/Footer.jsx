import React from "react";
import "./footer.css";
import { BsInstagram, BsTelegram, BsTwitter } from "react-icons/bs";
import { BiCopyright } from "react-icons/bi";

const Footer = () => {
  return (
    <div className="footer">
      <div className="footer-container">
        <div className="footer-icons">
          <p>Find us on: </p>
          <BsInstagram />
          <BsTelegram />
          <BsTwitter />
        </div>
        <div className="copy-right">
          <BiCopyright /> 2023 Copy right:
          <br /> Lorem ipsum dolor sit amet, consectetur adipiscing elit. nec
        </div>
        <div className="contact-us">
          <span>Contact us:</span>
          <br /> 12345678 address main street{" "}
        </div>
      </div>
    </div>
  );
};

export default Footer;
