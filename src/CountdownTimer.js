import React, { useEffect, useState } from 'react';

const CountdownTimer = ({ duration, onTimeUp }) => {
    const [timeLeft, setTimeLeft] = useState(duration);
    const [hasTriggered, setHasTriggered] = useState(false);

    useEffect(() => {
        setTimeLeft(duration);
        setHasTriggered(false);
    }, [duration]);

    useEffect(() => {
        let timerId;

        if (timeLeft > 0 && !hasTriggered) {
            timerId = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev > 1) {
                        return prev - 1;
                    } else {
                        clearInterval(timerId);
                        setHasTriggered(true);
                        onTimeUp();
                        return 0;
                    }
                });
            }, 1000);
        }

        return () => clearInterval(timerId);
    }, [timeLeft, onTimeUp, hasTriggered]);

    return timeLeft > 0 ? <div className="countdown-timer">剩余时间: {timeLeft}秒</div> : null;
};

export default CountdownTimer;