import { useEffect, useState } from "react";

// 최상단·최하단 근처에서는 스크롤 방향 감지를 멈춘다. 맨 위/맨 아래에서 스크롤을
// 튕길 때(overscroll bounce) scrollY가 순간적으로 반대로 움직이는 것을 스크롤 방향으로
// 오인해, 헤더가 잘못 숨거나 나타나는 것을 막는다.
const TOP_THRESHOLD = 64;
const BOTTOM_THRESHOLD = 64;

const useScrollDirection = () => {
  const [isDown, setIsDown] = useState(false);

  useEffect(() => {
    let prev = window.scrollY;

    const handleScroll = () => {
      const curr = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;
      const nearTop = curr <= TOP_THRESHOLD;
      const nearBottom = curr >= maxScroll - BOTTOM_THRESHOLD;

      if (nearTop) {
        // 최상단 근처: 항상 표시 (위쪽 바운스 무시)
        if (isDown) setIsDown(false);
      } else if (!nearBottom) {
        // 가운데 구간에서만 방향을 감지한다
        if (prev < curr && !isDown) {
          setIsDown(true);
        } else if (prev >= curr && isDown) {
          setIsDown(false);
        }
      }
      // 최하단 근처: 현재 상태 유지 (아래쪽 바운스 무시)

      prev = curr;
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isDown]);

  return { direction: isDown ? "down" : "up" };
};

export default useScrollDirection;
