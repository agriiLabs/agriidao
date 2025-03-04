import React, { useState, useEffect } from "react";

interface CountdownProps {
    voteEnd: bigint; // End date from backend (nanoseconds)
}

const CountdownTimer: React.FC<CountdownProps> = ({ voteEnd }) => {
  const [timeLeft, setTimeLeft] = useState<number>(0);

  useEffect(() => {
    const calculateTimeLeft = (): void => {
      const now = Date.now() * 1_000_000; 
      const remaining = Number(voteEnd) - now;

      setTimeLeft(remaining > 0 ? remaining : 0);
    };

    calculateTimeLeft(); 
    const timer = setInterval(calculateTimeLeft, 1000); 

    return () => clearInterval(timer);
  }, [voteEnd]);

  const formatTime = (nanoseconds: number) => {
    const seconds = Math.floor(nanoseconds / 1_000_000_000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    
      <p className="font-15 text-dark">{formatTime(timeLeft)}</p>
   
  );
};

export default CountdownTimer;
