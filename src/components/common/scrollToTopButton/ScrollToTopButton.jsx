import React from 'react'
import { FaArrowUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
    const [isVisible, setIsVisible] = React.useState(false);

    React.useEffect(() => {
      const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
          setIsVisible(true);
        } else {
          setIsVisible(false);
        }
      };
  
      window.addEventListener('scroll', toggleVisibility);
  
      return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);
  
    const scrollToTop = () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });
    };
  
    return (
      <div
        className={`fixed bottom-32 right-4 ${
          isVisible ? 'visible' : 'invisible'
        }`}
      >
        <a
          href="#"
          className="inline-flex items-center justify-center w-12 h-12 bg-blue1 rounded-full text-white border-4 border-white hover:bg-blue-900 transition-colors duration-300"
          onClick={scrollToTop}
        >
          <FaArrowUp />
        </a>
      </div>
    );
}

export default ScrollToTopButton