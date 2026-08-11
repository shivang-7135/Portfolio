import {FC, memo, useEffect, useRef, useCallback} from 'react';
import {motion, useMotionValue, useSpring} from 'framer-motion';

const CustomCursor: FC = memo(() => {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const isHovering = useRef(false);
  const dotRef = useRef<HTMLDivElement>(null);

  // Ring follows with spring physics (slight lag = premium feel)
  const ringX = useSpring(cursorX, {stiffness: 150, damping: 25});
  const ringY = useSpring(cursorY, {stiffness: 150, damping: 25});

  const handleMouseMove = useCallback((e: MouseEvent) => {
    cursorX.set(e.clientX);
    cursorY.set(e.clientY);
  }, [cursorX, cursorY]);

  useEffect(() => {
    // Check if touch device
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const handleMouseEnterInteractive = () => {
      isHovering.current = true;
      if (dotRef.current) {
        dotRef.current.classList.add('custom-cursor--expanded');
      }
    };

    const handleMouseLeaveInteractive = () => {
      isHovering.current = false;
      if (dotRef.current) {
        dotRef.current.classList.remove('custom-cursor--expanded');
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Add hover listeners to all interactive elements
    const addListeners = () => {
      const interactives = document.querySelectorAll('a, button, [role="button"], input, textarea, select');
      interactives.forEach(el => {
        el.addEventListener('mouseenter', handleMouseEnterInteractive);
        el.addEventListener('mouseleave', handleMouseLeaveInteractive);
      });
    };

    // Initial + observe for DOM changes
    addListeners();
    const observer = new MutationObserver(addListeners);
    observer.observe(document.body, {childList: true, subtree: true});

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();
    };
  }, [handleMouseMove]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
    return null;
  }

  return (
    <>
      {/* Dot - follows cursor exactly */}
      <motion.div
        ref={dotRef}
        className="custom-cursor"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
      {/* Ring - follows with spring delay */}
      <motion.div
        className="custom-cursor--ring"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
});

CustomCursor.displayName = 'CustomCursor';
export default CustomCursor;
