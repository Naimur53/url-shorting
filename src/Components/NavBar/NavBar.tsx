import { Link, NavLink } from "react-router-dom";
const NavBar = () => {
  return (
    <>
      <div className="fixed z-30 bg-white/[.3] backdrop-blur-md md:bg-transparent top-0 py-3 left-0 w-full flex justify-between ">
        <div className="flex justify-between px-2 md:px-0 max-w-[1240px] mx-auto  w-full">
          <div>
            <Link to={"/"}>
              <h1 className="text-xl md:text-2xl font-black">LKShort</h1>
            </Link>
          </div>
          <div className="flex gap-3 md:gap-10 font-semibold">
            <NavLink to={"/"}>Home</NavLink>
            <NavLink to={"/my-urls"}>My Urls</NavLink>
            <NavLink to={"/edit-urls"}>Edit Urls</NavLink>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
