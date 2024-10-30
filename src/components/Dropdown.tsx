import React, { ReactElement, useEffect, useRef, useState } from "react";

type Props = {
  title: string,
  icon: React.ReactNode
  children: ReactElement<DropdownItemProps> | ReactElement<DropdownItemProps>[]
}

type DropdownItemProps = {
  children: React.ReactNode;
  isActive?: boolean;
  onSelect?: () => void;
};

const Dropdown = (props: Props) => {
  const {title, icon, children} = props;
  const [show, setShow] = useState<boolean>(false);
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const popupRef = useRef<HTMLDivElement>(null);

  const handleSelect = (item: string) => {
    setSelectedItem(item);
    setShow(false);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (popupRef.current && !popupRef.current.contains(event.target as Node)) {
      setShow(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative inline-block text-left">
      <button type="button" 
              className="flex w-full justify-center items-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              onClick={() => setShow(prev => !prev)}
      >
        {title}
        {icon}
      </button>
      {show && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden" ref={popupRef}>
          {React.Children.map(children, (child) =>
            React.isValidElement(child)
              ? React.cloneElement(child as ReactElement, { 
                isActive: child.props.children === selectedItem,
                onSelect: () => handleSelect(child.props.children as string)
              } as DropdownItemProps)
              : child
          )}
        </div>
      )}
    </div>
  )
}

export default Dropdown
