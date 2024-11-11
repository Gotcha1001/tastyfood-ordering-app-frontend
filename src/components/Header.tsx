import { Link } from "react-router-dom";
import MobileNav from "./MobileNav";
import MainNav from "./MainNav";

const Header = () => {
  return (
    <div className="border-b-2 border-b-orange-500 py-6 gradient-background2">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img
            src="/cheflogo.png" // Path to the logo in the public folder
            alt="MernEats Logo"
            className="h-24 w-auto horizontal-rotate" // Adjust height and spacing as needed
          />
          <span className="text-3xl font-bold tracking-tight text-orange-500">
            TastyEats.com
          </span>
        </Link>
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="hidden md:block">
          <MainNav />
        </div>
      </div>
    </div>
  );
};

export default Header;
