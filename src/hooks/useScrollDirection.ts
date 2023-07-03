import { useEffect, useState } from "react";

const useScrollDirection = () => {
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    let prev = window.scrollY;

    const handleScroll = () => {
      if (prev < window.scrollY && !isDown) {
        setIsDown(true);
      } else if (prev >= window.scrollY && isDown) {
        setIsDown(false);
      }
      prev = window.scrollY;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDown]);

  return { direction: isDown ? "down" : "up" };
};

export default useScrollDirection;
