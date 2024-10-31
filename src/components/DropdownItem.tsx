import React from 'react';

type Props = {
  children: React.ReactNode;
  isActive?: boolean;
  onClick?: () => void;
};

const DropdownItem = ({ children, isActive, onClick }: Props) => {
  return (
    <div
      className={`px-4 py-2 text-sm text-gray-700 cursor-pointer hover:bg-gray-200 ${
        isActive ? 'bg-gray-300 font-bold text-gray-800' : ''
      }`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default DropdownItem;
