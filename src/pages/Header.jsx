// Import necessary dependencies and components
import { motion } from "framer-motion";
import { useState } from "react";
import { FiGithub, FiInstagram, FiLinkedin, FiMenu, FiX } from "react-icons/fi";
/**
 * Header Component
 *
 * This component renders the main navigation header with:
 * - Logo and brand name
 * - Desktop navigation menu
 * - Social media icons
 * - Mobile menu toggle
 *
 * Features:
 * - Responsive design for mobile and desktop
 * - Smooth animations using Framer Motion
 * - Mobile-friendly navigation
 */
const Header = () => {
  // State management for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    // Main header container with absolute positioning
    <header className="absolute transition-all w-full z-50 duration-300 pb-4">
      {/* Header content container with responsive padding */}
      <div className="container mx-auto px-4 rounded-[40px] sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20 shadow-2xl   shadow-gray-900 backdrop-blur-[4px] "
      >
        {/* Logo and Brand Name Section */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.3,
            duration: 1.5,
          }}
          className="flex items-center"
        >
          {/* Logo with gradient background */}
          <div className="h-10 w-10 mr-3">
            <img src="/logo.png" alt="Logo" className="h-full w-full" />
          </div>
          {/* Brand name with gradient text effect */}
          <span className="text-xl font-bold bg-gradient-to-r from-gray-300 to-gray-100 bg-clip-text text-transparent">
            Nikhil Singh
          </span>
        </motion.div>
        {/* Desktop Navigation Menu - Hidden on mobile */}
        <nav className="lg:flex hidden space-x-8">
          {/* Navigation items with hover animations */}
          {["Home", "About", "Projects", "Experience", "Contact"].map(
            (item, index) => (
              <motion.a
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 25,
                  delay: 0.2 + index * 0.1,
                }}
                key={index}
                className="relative text-white dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-200 font-medium transition-colors duration-300 group py-2"
                href={`#${item.toLowerCase()}`}
              >
                {item}
                {/* Animated underline effect on hover */}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-violet-600 group-hover:w-full transition-all duration-300"></span>
              </motion.a>
            )
          )}
        </nav>
        {/* Social Icons and Contact Button - Desktop View */}
        <div className="md:flex hidden items-center space-x-4">
          {/* GitHub Icon */}
          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.3,
              duration: 1.5,
            }}
            className="dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 p-2 mx-1"
            href="https://github.com/itisthenikhilsingh"
          >
            <FiGithub className="w-5 h-5" />
          </motion.a>
          {/* LinkedIn Icon */}
          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.3,
              duration: 1.5,
            }}
            className="dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 p-2 mx-1"
            href="https://www.linkedin.com/in/nikhil-singh-19b7a9233/"
          >
            <FiLinkedin className="w-5 h-5" />
          </motion.a>
          {/* Instagram Icon */}
          <motion.a
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.3,
              duration: 1.5,
            }}
            className="dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300 p-2 mx-1"
            href="https://www.instagram.com/nik_hell"
          >
            <FiInstagram className="w-5 h-5" />
          </motion.a>
          {/* Contact Button - Desktop */}
          <motion.a
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.3,
              duration: 2.5,
            }}
            className="ml-6 px-6 py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white inline-block"
            href="mailto:nikhilsingh672001@gmail.com"
          >
            Contact Me
          </motion.a>
        </div>
        {/* Mobile Menu Toggle Button */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            type: "spring",
            stiffness: 100,
            damping: 20,
            delay: 0.3,
            duration: 2.5,
          }}
          className="md:hidden flex items-center"
        >
          <motion.button
            whileTap={{ scale: 0.5 }}
            className="text-gray-300"
            onClick={toggleMenu}
          >
            {/* Toggle between menu and close icons based on state */}
            {isOpen ? (
              <FiX className="w-6 h-6 active:text-violet-600" />
            ) : (
              <FiMenu className="w-6 h-6 active:text-violet-600" />
            )}
          </motion.button>
        </motion.div>
      </div>
      {/* Mobile Menu - Expands when isOpen is true */}
      <motion.div
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? "auto" : 0 }}
        transition={{ duration: 0.1 }}
        exit={{ opacity: 0, height: 0 }}
        className="md:hidden overflow-hidden bg-gray-900 shadow-lg px-6 py-6 space-y-5"
      >
        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-3">
          {["Home", "About", "Projects", "Experience", "Contact"].map(
            (item) => (
              <a
                onClick={toggleMenu}
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 font-medium py-3 hover:text-violet-600"
              >
                {item}
              </a>
            )
          )}
        </nav>
        {/* Mobile Social Icons and Contact Button */}
        <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
          <div className="flex space-x-5">
            {/* GitHub Icon */}
            <a href="https://github.com/itisthenikhilsingh" className="p-2 mx-1">
              <FiGithub className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors" />
            </a>
            {/* LinkedIn Icon */}
            <a href="https://www.linkedin.com/in/nikhil-singh-19b7a9233/" className="p-2 mx-1">
              <FiLinkedin className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors" />
            </a>
            {/* Instagram Icon */}
            <a href="https://www.instagram.com/nik_hell" className="p-2 mx-1">
              <FiInstagram className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors" />
            </a>
          </div>
          {/* Contact Button - Mobile */}
          <a
            className="mt-4 block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white text-center"
            href="mailto:nikhilsingh672001@gmail.com"
          >
            Contact Me
          </a>
        </div>
      </motion.div>
    </header>
  );
};
export default Header;