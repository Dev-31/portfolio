import { useEffect, useRef, useCallback } from 'react';

const CursorGlow = () => {
  const glowRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>();
  const positionRef = useRef({ x: 0, y: 0 });
  const targetRef = useRef({ x: 0, y: 0 });

  const animate = useCallback(() => {
    // Smooth lerp towards target
    positionRef.current.x += (targetRef.current.x - positionRef.current.x) * 0.1;
    positionRef.current.y += (targetRef.current.y - positionRef.current.y) * 0.1;

    if (glowRef.current) {
      glowRef.current.style.transform = `translate(${positionRef.current.x - 200}px, ${positionRef.current.y - 200}px)`;
    }

    rafRef.current = requestAnimationFrame(animate);
  }, []);

  useEffect(() => {
    // Don't show on touch devices
    if ('ontouchstart' in window) return;

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };
      if (glowRef.current) {
        glowRef.current.style.opacity = '1';
      }
    };

    const handleMouseLeave = () => {
      if (glowRef.current) {
        glowRef.current.style.opacity = '0';
      }
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.body.addEventListener('mouseleave', handleMouseLeave);

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.body.removeEventListener('mouseleave', handleMouseLeave);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [animate]);

  // Don't render on touch devices
  if (typeof window !== 'undefined' && 'ontouchstart' in window) {
    return null;
  }

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed w-[400px] h-[400px] rounded-full z-0 opacity-0 will-change-transform"
      style={{
        background: 'radial-gradient(circle, hsl(var(--accent) / 0.06) 0%, transparent 70%)',
        transition: 'opacity 0.3s ease',
      }}
    />
  );
};

export default CursorGlow;