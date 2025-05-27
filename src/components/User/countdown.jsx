import { useEffect, useState } from "react";

const Countdown = ({ initialSeconds, onTimeUp }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [called, setCalled] = useState(false); // Để đảm bảo gọi hàm 1 lần duy nhất

    useEffect(() => {
        let timer;

        if (seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else {
            // seconds đã về 0
            if (!called) {
                onTimeUp();          // gọi hàm finish
                setCalled(true);     // đánh dấu đã gọi rồi
            }
        }

        return () => clearInterval(timer);
    }, [seconds, onTimeUp, called]);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    return (
        <div className="countdown-timer" style={{ fontSize: "24px", fontWeight: "bold" }}>
            ⏳ {formatTime(seconds)}
        </div>
    );
};

export default Countdown;
