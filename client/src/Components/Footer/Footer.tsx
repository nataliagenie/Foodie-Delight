import React from "react";
import "./Footer.css";

export const Footer = () => {
  return (
    <div className="footer">
      <div className="about-us" id="about-us">
        <h3>About us</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
      </div>
      <div className="contact-us" id="contact-us">
        <h3>Contact us</h3>
        <ul>
          <li>email: hello@delightfood.com</li>
          <li>address: Mars, district 9</li>
        </ul>
      </div>
    </div>
  );
};
