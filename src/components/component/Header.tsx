type Props = {
  timeLeft: number | null;
};

const Header = ({ timeLeft }: Props) => {

  if (timeLeft === null) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <header className="fixed top-0 left-0 right-0 bg-black text-white p-4 text-center z-20 shadow">
      <span className="font-semibold">
        Thời gian còn lại: {minutes}:{seconds.toString().padStart(2, "0")}
      </span>
    </header>
  );
};

export default Header;
