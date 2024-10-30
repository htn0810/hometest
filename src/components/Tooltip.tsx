import React from 'react';

type Props = {
  text: string,
  children: React.ReactNode,
  className?: string,
}

const Tooltip = (props : Props) => {
  const {text, children, className} = props;
  return (
    <div className={`${className} relative group`}>
      {children}
      <div className="tooltip-content absolute bottom-full w-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 rounded bg-gray-800 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {text}
        <div className="absolute left-1/2 bottom-[-4px] transform -translate-x-1/2 w-2 h-2 bg-gray-800 rotate-45"></div>
      </div>
    </div>
  );
};

export default Tooltip;
