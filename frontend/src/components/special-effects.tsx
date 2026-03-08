import { useMemo } from 'react';

export function SpecialEffects() {
  // Memoize random particle properties so they don't jump around on re-renders
  const particles = useMemo(() => {
    return Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}vw`,
      animationDuration: `${3 + Math.random() * 5}s`,
      animationDelay: `${Math.random() * 5}s`,
    }));
  }, []);

  return (
    <>
      <div className="retro-scanlines" />
      <div className="pennywise-glitch" />
      <div className="pennywise-balloon" />
      <div className="particles-container">
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="ember"
            style={{
              left: particle.left,
              animationDuration: particle.animationDuration,
              animationDelay: particle.animationDelay,
            }}
          />
        ))}
      </div>
    </>
  );
}
