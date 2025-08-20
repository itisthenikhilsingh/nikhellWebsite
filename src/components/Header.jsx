// Import necessary dependencies and components
import { motion, AnimatePresence } from "framer-motion";
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
 * - Contact form modal
 *
 * Features:
 * - Responsive design for mobile and desktop
 * - Smooth animations using Framer Motion
 * - Interactive contact form
 * - Mobile-friendly navigation
 */
const Header = () => {
  // State management for mobile menu toggle
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  // State management for contact form modal
  const [openForm, setOpenForm] = useState(false);
  const openContactForm = () => {
    setOpenForm(true);
  };
  const closeContactForm = () => {
    setOpenForm(false);
  };

  return (
    // Main header container with absolute positioning
    <header className="absolute transition-all w-full z-50 duration-300">
      {/* Header content container with responsive padding */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
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
          <div className="h-10 w-10 rounded-xl bg-gradient-to-r from-gray-50 to-gray-100 flex items-center justify-center text-purple-600 font-bold text-xl mr-3">
            N
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
                className="relative text-white dark:text-gray-200 hover:text-violet-600 dark:hover:text-violet-200 font-medium transition-colors duration-300 group"
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
            className="dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            href="#"
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
            className="dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            href="#"
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
            className="dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors duration-300"
            href="#"
          >
            <FiInstagram className="w-5 h-5" />
          </motion.a>

          {/* Contact Button - Desktop */}
          <motion.button
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              type: "spring",
              stiffness: 100,
              damping: 20,
              delay: 0.3,
              duration: 2.5,
            }}
            className="ml-4 px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white"
            onClick={openContactForm}
          >
            Contact Me
          </motion.button>
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
        className="md:hidden overflow-hidden bg-gray-900 shadow-lg px-4 py-5 space-y-5"
      >
        {/* Mobile Navigation Links */}
        <nav className="flex flex-col space-y-3">
          {["Home", "About", "Projects", "Experience", "Contact"].map(
            (item) => (
              <a
                onClick={toggleMenu}
                key={item}
                href={`#${item.toLowerCase()}`}
                className="text-gray-300 font-medium py-2 hover:text-violet-600"
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
            <a href="#">
              <FiGithub className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors" />
            </a>
            {/* LinkedIn Icon */}
            <a href="#">
              <FiLinkedin className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors" />
            </a>
            {/* Instagram Icon */}
            <a href="#">
              <FiInstagram className="h-5 w-5 text-gray-700 dark:text-gray-300 hover:text-violet-600 dark:hover:text-violet-400 transition-colors" />
            </a>
          </div>

          {/* Contact Button - Mobile */}
          <button
            className="mt-4 block w-full px-4 py-2 rounded-xl bg-gradient-to-r from-gray-400 to-gray-100 text-violet-700 font-bold hover:from-violet-700 hover:to-purple-700 hover:text-white"
            onClick={openContactForm}
          >
            Contact Me
          </button>
        </div>
      </motion.div>

      {/* Contact Form Modal - Appears when openForm is true */}
      <AnimatePresence>
        {openForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.5,
            }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            {/* Modal Content Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.2 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{
                duration: 0.3,
              }}
              className="bg-gray-800 rounded-xl shadow-xl p-6 max-w-md w-full"
            >
              {/* Modal Header with Title and Close Button */}
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-2xl font-bold text-gray-300">
                  Get in Touch
                </h1>
                <button onClick={closeContactForm}>
                  <FiX className="w-6 h-6 font-extrabold text-gray-300" />
                </button>
              </div>

              {/* Contact Form */}
              <form className="space-y-4">
                {/* Name Input Field */}
                <div>
                  <label
                    htmlFor="name"
                    className="text-sm block font-medium text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    style={{ borderRadius: "0.5rem" }}
                    type="text"
                    id="name"
                    placeholder="Your Name"
                    className="w-full px-4 py-2 border border-gray-600 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                  />
                </div>

                {/* Email Input Field */}
                <div>
                  <label
                    htmlFor="email"
                    className="text-sm block font-medium text-gray-300 mb-1"
                  >
                    Email
                  </label>
                  <input
                    style={{ borderRadius: "0.5rem" }}
                    type="email"
                    id="email"
                    placeholder="your.email@example.com"
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                  />
                </div>

                {/* Message Textarea */}
                <div>
                  <label
                    htmlFor="message"
                    className="text-sm block font-medium text-gray-300 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    style={{ borderRadius: "0.5rem" }}
                    id="message"
                    rows={4}
                    placeholder="Your message here..."
                    className="w-full px-4 py-2 border border-gray-600 rounded-lg focus:ring-2 focus:ring-violet-500 focus:border-violet-500 bg-gray-700 text-white"
                  ></textarea>
                </div>

                {/* Submit Button */}
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={closeContactForm}
                  style={{ borderRadius: "0.5rem" }}
                  type="submit"
                  className="w-full bg-violet-600 hover:bg-violet-700 text-white font-medium py-2 px-4 rounded-lg transition duration-300"
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
