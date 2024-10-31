import React from "react";

type Props = React.HTMLAttributes<HTMLDivElement> & {
  children: React.ReactNode;
  isActive?: boolean;
  onSelect?: () => void;
};

const DropdownItem = ({ children, isActive, onSelect, ...props }: Props) => {
  console.log(isActive);
  return (
    <div
      className={`px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200 ${
        isActive ? "bg-gray-300 font-bold text-gray-800" : ""
      }`}
      onClick={onSelect}
      {...props}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
