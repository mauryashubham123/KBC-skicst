import { Clock } from "lucide-react";
import { useEffect, useState } from "react";

export const LiveTimer = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="bg-amber-800 p-4 rounded-lg text-center mb-6">
      <div className="flex items-center justify-center gap-2 text-white">
        <Clock size={24} className="text-yellow-300" />
        <span className="text-2xl font-mono font-bold">
          {time.toLocaleTimeString()}
        </span>
      </div>
    </div>
  );
};