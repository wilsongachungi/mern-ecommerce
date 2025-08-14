import React from "react";

const TopBanner = ({
  message,
  phone,
  email,
  bgColor = "bg-pink-500",
  textColor = "text-gray-800",
}) => {
  return (
    <div
      className={`${bgColor} ${textColor} text-xs sm:text-sm md:text-base py-2 sm:py-3 px-3 sm:px-6 text-center flex flex-col sm:flex-row sm:justify-center sm:items-center gap-1 sm:gap-6`}
    >
      <span className="font-semibold">{message}</span>
      {phone && (
        <span className="flex items-center gap-1">
          📞 <span>{phone}</span>
        </span>
      )}
      {email && (
        <span className="flex items-center gap-1">
          📧 <span>{email}</span>
        </span>
      )}
    </div>
  );
};

export default TopBanner;
