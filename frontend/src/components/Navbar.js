// navbar to access search and favourites
import React from "react";
import {} from "react-bootstrap";
import {} from "react-router-dom";
import { NavLink } from "react-router-dom";

function Navbar() {
  return (
    <div className="navbar navbar-expand-lg navbar-dark fixed-top bg-dark">
      <div className="container-fluid">
        {/* Brand/Logo section with routing to home/dashboard */}

        <NavLink className="navbar-brand" to="/">
          <div className="logoNav ms-4 me-5">
            <img
              src="/apple_navbar.png" /* https://www.clipartmax.com/download/m2i8i8b1G6Z5N4K9_white-apple-logo-transparent/ */
              width="45"
              height="50"
              className="d-inline-block align-top"
              alt="Apple logo"
            />
          </div>
        </NavLink>

        {/* Hamburger button - only shows on mobile
      Implements Bootstrap collapse functionality for responsive navigation
      Includes ARIA attributes for screen reader accessibility */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          {/* Standard Bootstrap hamburger icon */}
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* 
       * Collapsible navigation content
       Hidden on mobile by default as mobile uses hamburger button
       Always visible on larger screens (lg breakpoint and above)
       */}
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item ms-3 me-5">
              {/* Dashboard navigation link */}
              <NavLink to="/" className="nav-link fs-4">
                Search
              </NavLink>
            </li>
            <li className="nav-item ms-3 me-5">
              {/* Favourites navigation link */}
              <NavLink to="/Favourites" className="nav-link fs-4">
                My Favourites
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
export default Navbar;
