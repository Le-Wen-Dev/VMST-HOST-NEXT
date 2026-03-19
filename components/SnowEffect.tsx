'use client';

import { useEffect, useState } from 'react';

interface Snowflake {
  id: number;
  left: number;
  animationDuration: number;
  animationDelay: number;
  size: number;
  opacity: number;
}

export default function SnowEffect() {
  const [snowflakes, setSnowflakes] = useState<Snowflake[]>([]);

  useEffect(() => {
    const createSnowflakes = () => {
      const count = 150; // Tăng từ 50 lên 150 để dày hơn
      const newSnowflakes: Snowflake[] = [];

      for (let i = 0; i < count; i++) {
        newSnowflakes.push({
          id: i,
          left: Math.random() * 100,
          animationDuration: 8 + Math.random() * 15,
          animationDelay: Math.random() * 5,
          size: 3 + Math.random() * 8,
          opacity: 0.4 + Math.random() * 0.6,
        });
      }

      setSnowflakes(newSnowflakes);
    };

    createSnowflakes();
  }, []);

  return (
    <>
      <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
        {snowflakes.map((snowflake) => (
          <div
            key={snowflake.id}
            className="absolute top-0 text-white"
            style={{
              left: `${snowflake.left}%`,
              fontSize: `${snowflake.size}px`,
              opacity: snowflake.opacity,
              animation: `snowfall ${snowflake.animationDuration}s linear ${snowflake.animationDelay}s infinite`,
            }}
          >
            ❄
          </div>
        ))}
      </div>
    </>
  );
}
