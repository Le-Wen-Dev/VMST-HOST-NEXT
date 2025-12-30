import { useEffect, useState, useRef } from 'react';

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
  const audioRef = useRef<HTMLAudioElement | null>(null);

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

    // Thêm nhạc giáng sinh "Merry Christmas"
    // Ưu tiên sử dụng file local nếu có, nếu không thì dùng URL online
    const audioUrl = '/merry-christmas.mp3'; // File local trong public folder
    const fallbackUrl = 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3'; // URL dự phòng
    
    const audio = new Audio(audioUrl);
    
    // Xử lý lỗi nếu file local không tồn tại, chuyển sang URL dự phòng
    audio.addEventListener('error', () => {
      console.log('Không tìm thấy file nhạc local, sử dụng URL dự phòng');
      if (audioRef.current) {
        audioRef.current.src = fallbackUrl;
        audioRef.current.play().catch(() => {
          console.log('Nhạc giáng sinh sẽ phát khi người dùng tương tác với trang');
        });
      }
    });
    
    audio.loop = true;
    audio.volume = 0.1; // Volume 10%
    audioRef.current = audio;

    // Tự động phát nhạc khi người dùng tương tác
    const handleUserInteraction = () => {
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          console.log('Nhạc giáng sinh sẽ phát khi người dùng tương tác với trang');
        });
      }
      // Xóa listener sau lần đầu
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
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

