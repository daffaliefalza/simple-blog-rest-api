import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          Deadline Warrior Blog
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
