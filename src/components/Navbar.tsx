import React, { useState, useEffect } from "react";
import { Menu, Moon, Sun } from "lucide-react";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "./ui/sheet";
import { useTheme } from "../lib/ThemeContextType";

const Navbar: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isOpen, setIsOpen] = useState(false);

  // Ensure the theme is correctly set after mount
  useEffect(() => {
    setMounted(true);
  }, []);

  // Hide Navbar on Scroll Down, Show on Scroll Up
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShowNavbar(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <nav
      className={`fixed top-0 z-50 flex items-center justify-between w-full bg-white dark:bg-black py-4 px-6 md:px-[100px] shadow-lg transition-transform duration-300 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Logo */}
      <div className="flex items-center gap-x-[12px]">
        <img className="max-w-[130px]" src="./assets/logo.png" />
      </div>

      {/* Desktop Navigation */}
      <ul className="hidden md:flex gap-x-[20px] text-[18px] text-black dark:text-white   font-[400]">
        {["users", "favorits"].map((item) => (
          <li key={item}>
            <p
              className="cursor-pointer rounded-xl px-[10px] py-[8px] hover:bg-[#b71824] hover:text-white
             tw-[box-shadow:inset_0_4px_10px_rgba(0,0,0,0.3)]"
            >
              {item.charAt(0).toUpperCase() + item.slice(1)}
            </p>
          </li>
        ))}
      </ul>

      {/* Right Section */}
      <div className="hidden md:flex gap-x-[20px] items-center text-[16px] font-regular">
        <Button
          variant="default"
          color="red"
          onClick={() => toggleTheme()}
          className="cursor-pointer !bg-[#b71824] text-white dark:text-gray-700"
        >
          {mounted && theme === "dark" ? (
            <Sun color="white" size={20} />
          ) : (
            <Moon color="white" size={20} />
          )}
        </Button>
      </div>

      {/* Mobile Menu */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTitle className="sr-only text-white">Navigation</SheetTitle>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            className="md:hidden !bg-[#b71824] inline-flex"
          >
            <Menu size={28} />
          </Button>
        </SheetTrigger>
        <SheetContent
          side="left"
          className="bg-white dark:bg-black px-3 w-[250px]"
        >
          {/* Logo */}
          <div className="flex items-center gap-x-[12px] mt-3">
            <img className="max-w-[130px]" src="./assets/logo.png" />
          </div>
          <div className="flex flex-col items-start gap-6 mt-6">
            <ul className=" gap-x-[20px] text-[18px] text-black dark:text-white   font-[400]">
              {["users", "favorits"].map((item) => (
                <li key={item}>
                  <p
                    className="cursor-pointer rounded-xl px-[10px] py-[8px] hover:bg-[#b71824] hover:text-white
             tw-[box-shadow:inset_0_4px_10px_rgba(0,0,0,0.3)]"
                  >
                    {item.charAt(0).toUpperCase() + item.slice(1)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex flex-col gap-4 text-[16px] font-regular">
              <Button
                variant="default"
                color="red"
                onClick={() => toggleTheme()}
                className="cursor-pointer !bg-[#b71824] text-white dark:text-gray-700"
              >
                {mounted && theme === "dark" ? (
                  <Sun color="white" size={20} />
                ) : (
                  <Moon color="white" size={20} />
                )}
              </Button>
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </nav>
  );
};

export default Navbar;
