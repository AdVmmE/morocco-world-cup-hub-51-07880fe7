
import { useState, useEffect } from 'react';

// The expected start date of the World Cup 2030
const WORLD_CUP_START_DATE = new Date('2030-06-10T00:00:00').getTime();

const WorldCupCountdown = () => {
  const [countdown, setCountdown] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = WORLD_CUP_START_DATE - now;
      
      if (distance < 0) {
        clearInterval(interval);
        setCountdown({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0
        });
        return;
      }
      
      const days = Math.floor(distance / (1000 * 60 * 60 * 24));
      const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);
      
      setCountdown({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(interval);
  }, []);
  
  return (
    <div className="py-4 bg-gradient-to-r from-morocco-red to-morocco-green text-white text-center">
      <div className="container mx-auto">
        <h3 className="text-lg font-medium mb-2">Countdown to FIFA World Cup 2030</h3>
        <div className="flex justify-center items-center space-x-4">
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">{countdown.days}</span>
            <span className="text-xs md:text-sm">Days</span>
          </div>
          <span className="text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">{countdown.hours}</span>
            <span className="text-xs md:text-sm">Hours</span>
          </div>
          <span className="text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">{countdown.minutes}</span>
            <span className="text-xs md:text-sm">Minutes</span>
          </div>
          <span className="text-2xl font-bold">:</span>
          <div className="flex flex-col items-center">
            <span className="text-2xl md:text-3xl font-bold">{countdown.seconds}</span>
            <span className="text-xs md:text-sm">Seconds</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldCupCountdown;
