const Footer = () => {
  return (
    <div className="gradient-background2 py-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="flex items-center gap-3">
          <img
            src="/cheflogo.png" // Path to the logo in the public folder
            alt="TastyEats Logo"
            className="h-24 w-auto horizontal-rotate"
          />
          <span className="text-3xl text-white font-bold tracking-tight">
            TastyEats.com
          </span>
        </div>
        <div className="text-white font-bold tracking-tight flex gap-4 mt-4 md:mt-0">
          <span>Privacy Policy</span>
          <span>Terms of Service</span>
        </div>
      </div>
    </div>
  );
};

export default Footer;
