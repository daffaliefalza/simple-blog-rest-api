import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-logo">
          Deadline Warrior Blog
        </Link>
        <div className="navbar-links">
          <Link to="/" className="navbar-link">
            Home
          </Link>
          <Link to="/posts" className="navbar-link">
            Posts
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
