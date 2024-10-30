import React from 'react'
import CheckIcon from '../icons/CheckIcon';

type Props = {
  children: React.ReactNode,
  id: string,
  isChecked: boolean,
  onChange: () => void
}

const Checkbox = (props: Props) => {
  const {children, id, isChecked, onChange} = props;
  return (
    <div className="inline-flex items-center">
      <label className="flex items-center cursor-pointer relative" htmlFor={id}>
        <input type="checkbox" 
          checked={isChecked}
          onChange={onChange}
          className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800" id={id} />
        <span className="absolute text-white opacity-0 peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <CheckIcon />
        </span>
      </label>
      <label className="cursor-pointer ml-2 text-slate-600 text-xs md:text-sm" htmlFor={id}>
        {children}
      </label>
    </div>
  )
}

export default Checkbox
