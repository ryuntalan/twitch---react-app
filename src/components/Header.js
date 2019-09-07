import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div class="bg-purple mb-5">
      <nav className="navbar justify-content-center">
        <li className="nav-item nav-link">
          <Link class="text-light font-weight-bold" to="/">
            Top Games
          </Link>
        </li>
        <li className="nav-item nav-link">
          <Link class="text-light font-weight-bold" to="/top-streams">
            Top Live Streams
          </Link>
        </li>
      </nav>
    </div>
  );
}

export default Header;
