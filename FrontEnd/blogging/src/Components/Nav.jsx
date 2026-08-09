import { NavLink, Link, useNavigate } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import { CgProfile } from "react-icons/cg";
import { MdSpaceDashboard } from "react-icons/md";
import { IoLogOut } from "react-icons/io5";

export default function Nav({ openSignIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const navRef = useRef(null);
  const mobileMenuRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));

  const links = [
    { path: "/", aName: "Home" },
    { path: "/about", aName: "About" },
    { path: "/blogs", aName: "Blogs" },
    { path: "/categories", aName: "Categories" },
  ];

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
  menuOpen &&
  mobileMenuRef.current &&
  navRef.current &&
  !mobileMenuRef.current.contains(e.target) &&
  !navRef.current.contains(e.target)
) {
  setMenuOpen(false);
}
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, [menuOpen]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setDropdownOpen(false);
    navigate("/");
    window.location.reload();
  };

  return (
    <div className="sticky top-0 z-50 backdrop-blur-md bg-black text-white">
      <nav className="flex justify-between items-center gap-2 md:gap-6 xl:gap-10 p-2 md:px-5 xl:px-10 xl:p-5 shadow-sm w-full">

        <div className="flex items-center gap-2 xl:gap-3">
          <div className="w-15 xl:w-20">
            <img
              src="/Logo.png"
              alt="logo"
              className="w-full"
            />
          </div>
        </div>

        <div className="flex gap-5">
          <div className="hidden md:flex gap-3 xl:gap-5 font-bold">
          {links.map((v, i) => (
            <NavLink
              key={i}
              to={v.path}
              className={({ isActive }) =>
                `px-2 py-1 transition ${
                  isActive
                    ? "text-orange-500 font-bold"
                    : "hover:text-orange-500"
                }`
              }
            >
              {v.aName}
            </NavLink>
          ))}
        </div>

        <div className="flex items-center gap-3 relative" ref={navRef}>

          {!user ? (
            <>
              <button
                onClick={openSignIn}
                className="bg-orange-500 text-white px-3 py-1.5 rounded-md text-sm md:text-base cursor-pointer hover:bg-orange-600"
              >
                Sign In
              </button>

              <CgProfile
                size={28}
                className="cursor-pointer hover:text-orange-500 transition"
                onClick={openSignIn}
              />
            </>
          ) : (
            <>
              <CgProfile
                size={28}
                className="cursor-pointer hover:text-orange-500 transition"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
  <div className="absolute right-0 top-12 w-56 bg-white text-black rounded-lg shadow-xl overflow-hidden">

    <button
      onClick={() => {
        navigate("/profile");
        setDropdownOpen(false);
      }}
      className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100"
    >
      <CgProfile size={20} />
      <span>Profile</span>
    </button>

    {user?.role === "admin" && (
      <button
        onClick={() => {
          navigate("/admin");
          setDropdownOpen(false);
        }}
        className="flex items-center gap-3 w-full px-4 py-3 hover:bg-gray-100"
      >
        <MdSpaceDashboard size={20} />
        <span>Dashboard</span>
      </button>
    )}

    <button
      onClick={handleLogout}
      className="flex items-center gap-3 w-full px-4 py-3 text-red-600 hover:bg-red-50"
    >
      <IoLogOut size={20} />
      <span>Logout</span>
    </button>

  </div>
)}
            </>
          )}

          <button
            className="md:hidden text-2xl font-bold"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            ☰
          </button>
        </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
       ref={mobileMenuRef}
        className={`absolute top-16 left-0 h-full w-64 md:hidden bg-black/90 backdrop-blur-md text-white shadow-md transform transition-transform duration-500 ease-in-out z-50 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col gap-3 px-4 py-3 font-bold bg-black h-screen">

          {links.map((v, i) => (
            <Link
              key={i}
              to={v.path}
              className="hover:text-orange-500"
              onClick={() => setMenuOpen(false)}
            >
              {v.aName}
            </Link>
          ))}

          {user ? (
            <>
              <Link
                to="/profile"
                onClick={() => setMenuOpen(false)}
                className="hover:text-orange-500"
              >
                Profile
              </Link>

              <Link
                to="/createblog"
                onClick={() => setMenuOpen(false)}
                className="hover:text-orange-500"
              >
                Create Blog
              </Link>

              <button
                onClick={handleLogout}
                className="text-left hover:text-red-500"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => {
                setMenuOpen(false);
                openSignIn();
              }}
              className="text-left hover:text-orange-500"
            >
              Sign In
            </button>
          )}

        </div>
      </div>
    </div>
  );
}