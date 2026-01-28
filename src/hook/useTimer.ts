import { useEffect, useRef, useState } from "react";

export function useTimer(initialSeconds: number | null) {
  const [timeLeft, setTimeLeft] = useState<number | null>(initialSeconds);
  const [isRunning, setIsRunning] = useState(false);

  const intervalRef = useRef<number | null>(null);
  const timeRef = useRef<number | null>(initialSeconds);

  // luôn sync ref với state
  useEffect(() => {
    timeRef.current = timeLeft;
  }, [timeLeft]);

  function start(seconds?: number) {
    if (seconds !== undefined) {
      setTimeLeft(seconds);
      timeRef.current = seconds;
    }
    setIsRunning(true);
  }

  function pause() {
    setIsRunning(false);
  }

  function resume() {
    if (timeRef.current !== null && timeRef.current > 0) {
      setIsRunning(true);
    }
  }

  function reset(seconds?: number | null) {
    setIsRunning(false);
    setTimeLeft(seconds ?? initialSeconds);
    timeRef.current = seconds ?? initialSeconds;
  }

  useEffect(() => {
    if (!isRunning || timeRef.current === null) return;

    intervalRef.current = window.setInterval(() => {
      if (timeRef.current === null) return;

      if (timeRef.current <= 1) {
        timeRef.current = 0;
        setTimeLeft(0);
        setIsRunning(false);
        return;
      }

      timeRef.current -= 1;
      setTimeLeft(timeRef.current);
    }, 1000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]); 

  return {
    timeLeft,
    isRunning,
    start,
    pause,
    resume,
    reset
  };
}
