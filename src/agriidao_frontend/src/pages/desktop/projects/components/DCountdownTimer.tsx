import React, { useState, useEffect } from "react";
import { useAuth } from "../../../../hooks/Context";

interface CountdownProps {
  proposalId: string;
    voteEnd: bigint; 
}

const CountdownTimer: React.FC<CountdownProps> = ({ proposalId, voteEnd }) => {
  const { proposalsActor } = useAuth();
  const [timeLeft, setTimeLeft] = useState<bigint>(BigInt(0));

  useEffect(() => {
    const calculateTimeLeft = (): void => {
      const now = Date.now() * 1_000_000; 
      const remaining = Number(voteEnd) - now;

      setTimeLeft(remaining > 0 ? BigInt(remaining) : BigInt(0));
      };

    calculateTimeLeft(); 
    const timer = setInterval(calculateTimeLeft, 1000); 

    return () => clearInterval(timer);
  }, [voteEnd]);

  useEffect(() => {
    const updateStatus = async () => {
      if (proposalsActor && timeLeft === BigInt(0)) {
        console.log("Countdown ended. Updating proposal status...");
        await proposalsActor?.updateProposalStatus(proposalId);
      }
    };

    updateStatus();
  }, [timeLeft, proposalId]);

  const formatTime = (nanoseconds: number) => {
    const seconds = Math.floor(nanoseconds / 1_000_000_000);
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
  };

  return (
    
      <p className="font-15 text-dark">{formatTime(Number(timeLeft))}</p>
   
  );
};

export default CountdownTimer;
