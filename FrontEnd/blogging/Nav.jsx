import { NavLink, Link } from "react-router-dom";
import { useState } from "react";
import Model from "./Model";

export default function Nav({ openSignIn }) {
  
const [menuOpen, setMenuOpen] = useState(false);
  const links = [
    { path: "/", aName: "Home" },
    { path: "/about", aName: "About" },
    { path: "/blogs", aName: "Blogs" },
    { path: "/categories", aName: "Categories" },
    { path: "/contact", aName: "Contact" },
  ];

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-black text-white">
      <nav className="flex justify-between items-center gap-2 md:gap-6 xl:gap-10 p-2 md:px-5 xl:px-10 xl:p-5 shadow-sm w-full">
        <div className="flex items-center gap-2 xl:gap-3">
          <div className="w-6 xl:w-10">
            <img src="/blogger-color-icon.png" alt="logo" className="w-full" />
          </div>
          <div className="font-bold text-sm md:text-base xl:text-xl">BrainCrafters</div>
        </div>

        <div className="hidden md:flex gap-3 xl:gap-5 font-bold cursor-pointer">
          {links.map((v, i) => (
            <NavLink
              key={i}
              to={v.path}
              className={({ isActive }) =>
                `px-2 py-1 transition ${
                  isActive ? "text-orange-500 font-bold" : "hover:text-orange-500"
                }`
              }
            >
              {v.aName}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={openSignIn}
            className="bg-orange-500 text-white px-3 py-1.5 rounded-md text-sm md:text-base cursor-pointer"
          >
            Sign In
          </button>

          <button className="md:hidden text-2xl font-bold" onClick={() => setMenuOpen(!menuOpen)}> ☰ </button>
        </div>
      </nav>
      <div className={`absolute top-10 left-0 h-full w-64 md:hidden bg-black/90 backdrop-blur-md text-white shadow-md transform transition-transform duration-500 ease-in-out z-50 ${menuOpen ? "translate-x-0" : "-translate-x-full"}`} > <div className="flex flex-col gap-3 px-4 py-3 font-bold bg-black h-screen"> {links.map((v, i) => ( <Link key={i} to={v.path} className="hover:text-orange-500" onClick={() => setMenuOpen(false)} > {v.aName} </Link> ))} </div> </div>
    </div>
  );
}
