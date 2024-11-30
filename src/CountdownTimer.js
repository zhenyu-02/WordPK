import React, { useEffect } from 'react';

const CountdownTimer = ({ timeLeft, setTimeLeft }) => {
    useEffect(() => {
        let timerId;
        if (timeLeft > 0) {
            timerId = setInterval(() => {
                setTimeLeft((prev) => prev - 1);
            }, 1000);
        }
        return () => clearInterval(timerId);
    }, [timeLeft, setTimeLeft]);

    return <h3>剩余时间: {timeLeft}秒</h3>;
};

export default CountdownTimer; 