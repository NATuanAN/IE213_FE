import { useEffect, useState } from "react";

const Countdown = ({ initialSeconds, onTimeUp }) => {
    const [seconds, setSeconds] = useState(initialSeconds);
    const [called, setCalled] = useState(false); // gọi onTimeUp chỉ 1 lần

    useEffect(() => {
        let timer;

        if (seconds > 0) {
            timer = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);
        } else {
            if (!called) {
                onTimeUp();
                setCalled(true);
            }
        }

        return () => clearInterval(timer);
    }, [seconds, onTimeUp, called]);

    const formatTime = (s) => {
        const mins = Math.floor(s / 60);
        const secs = s % 60;
        return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
    };

    // Kiểm tra còn dưới 10 giây hay không để bật hiệu ứng
    const isWarning = seconds > 0 && seconds <= 10;

    return (
        <>
            <style>
                {`
                    .countdown-timer {
                        font-size: 24px;
                        font-weight: bold;
                        transition: color 0.3s ease;
                    }
                    .warning {
                        color: red;
                        animation: blink 1s infinite;
                    }
                    @keyframes blink {
                        0%, 50%, 100% { opacity: 1; }
                        25%, 75% { opacity: 0; }
                    }
                `}
            </style>

            <div className={`countdown-timer ${isWarning ? "warning" : ""}`}>
                ⏳ {formatTime(seconds)}
            </div>
        </>
    );
};

export default Countdown;
