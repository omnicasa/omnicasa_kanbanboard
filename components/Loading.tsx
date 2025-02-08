import React from "react";
import ClipLoader from "react-spinners/ClipLoader";

interface LoadingProps {
  size?: number;
  color?: string;
}

const Loading: React.FC<LoadingProps> = ({ size = 50, color = "#123abc" }) => {
  return (
    <div className="flex items-center justify-center">
      <ClipLoader size={size} color={color} />
    </div>
  );
};

export default Loading;
