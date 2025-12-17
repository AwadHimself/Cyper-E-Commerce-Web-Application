import Logo from "./Logo";
import Navigation from "./Navigation";
import Search from "./Search";

function Header() {
  return (
    <div className="flex items-center justify-center gap-40 my-10">
      <div className="flex items-center gap-10">
        <Logo />
        <Search />
      </div>
      <Navigation />
    </div>
  );
}

export default Header;
