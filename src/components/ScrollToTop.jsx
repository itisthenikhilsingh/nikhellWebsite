// components/ScrollToTop.js
import { FiArrowUp } from "react-icons/fi";
import { motion } from "framer-motion";

const ScrollToTop = () => {
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
            duration: 10000,

        });
    };

    return (
        <motion.button
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 p-3 bg-violet-600 text-white rounded-full shadow-lg hover:bg-violet-700 transition-colors duration-300"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            aria-label="Scroll to top"
        >
            <FiArrowUp className="w-5 h-5" />
        </motion.button>
    );
};

export default ScrollToTop;