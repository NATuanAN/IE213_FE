import { useState, useEffect } from "react";

const Countdown = ({ initialSeconds, onTimeUp }) => {
  const [seconds, setSeconds] = useState(initialSeconds);

  useEffect(() => {
    if (seconds === 0) {
      onTimeUp(); // tự động gọi khi hết giờ
      return;
    }

    const timerId = setTimeout(() => {
      setSeconds(seconds - 1);
    }, 1000);

    return () => clearTimeout(timerId);
  }, [seconds, onTimeUp]);

  // format 00:00 cho đẹp
  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, "0");
    const s = (sec % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
  };

  return (
    <div
      style={{
        fontSize: "1.8rem",
        fontWeight: "bold",
        color: seconds <= 10 ? "red" : "black",
        userSelect: "none",
      }}
    >
      {formatTime(seconds)}
    </div>
  );
};

export default Countdown;
