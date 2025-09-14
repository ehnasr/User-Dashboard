import { useState, useEffect } from "react";

export default function Time() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const formattedTime = new Date()
        .toLocaleString("en-GB", {
          day: "numeric",
          month: "numeric",
          year: "numeric",
          weekday: "short",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        })
        .replace(",", "");
      setTime(formattedTime);
    };
    updateTime();

    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  return <>{time}</>;
}
