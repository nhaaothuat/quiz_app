import  { useRef } from "react";

const Header = () => {
  const audioRef = useRef<HTMLAudioElement>(null);

  const play = () => {
    audioRef.current?.play();
  };

  return (
    <div className="p-4 bg-white shadow flex justify-between">
      <h1>Quiz App</h1>

      <button 
        onClick={play}
        className="bg-blue-500 text-white px-3 py-1 rounded"
      >
        Bật nhạc
      </button>

      <audio 
        ref={audioRef}
        src="/audio/kkk.mp3"
        loop
        hidden
      />
    </div>
  );
};

export default Header;
