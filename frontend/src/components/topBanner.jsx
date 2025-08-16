import React, { useState, useEffect } from "react";

const TopBanner = ({
  logo,
  logoAlt,
  messages,
  phone,
  email,
  bgColor = "bg-pink-200",
  textColor = "text-gray-800",
  interval = 5000, 
}) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, interval);
    return () => clearInterval(timer);
  }, [messages, interval]);

  return (
    <div
      className={`${bgColor} ${textColor} text-xs sm:text-sm md:text-base py-2 sm:py-3 px-3 sm:px-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-6 overflow-hidden font-poppins`}
    >
         {/* Logo */}
      {logo && (
        <div className="shrink-0">
          <img src={logo} alt={logoAlt} className="h-15 sm:h-20 w-auto" />
        </div>
      )}0
      {/* Looping message */}
      <div className="overflow-hidden flex-1">
        <div
          key={index}
          className="whitespace-nowrap animate-slide"
          style={{ animationDuration: `${interval / 1000}s` }}
        >
          {messages[index]}
        </div>
      </div>

      {/* Static contacts */}
      <div className="flex items-center gap-4 shrink-0">
        {phone && (
          <span className="flex items-center gap-1 whitespace-nowrap">
            📞 {phone}
          </span>
        )}
        {email && (
          <span className="flex items-center gap-1 whitespace-nowrap">
            📧 {email}
          </span>
        )}
      </div>

      {/* Animation style */}
      <style jsx>{`
        @import url("https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap");

        @keyframes slide {
          0% {
            transform: translateX(100%);
          }
          100% {
            transform: translateX(-100%);
          }
        }
        .animate-slide {
          display: inline-block;
          animation: slide linear infinite;
        }
        .font-poppins {
          font-family: "Poppins", sans-serif;
          font-size: 0.875rem; /* 14px */
        }
      `}</style>
    </div>
  );
};

export default TopBanner;
