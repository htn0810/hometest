import { useToast } from '../contexts/ToastContext';
import CloseIcon from '../icons/CloseIcon';

type Props = {
  message: string;
  id: number;
  className?: string;
};

const Toast = (props: Props) => {
  const { hideToast } = useToast();
  const { message, id, className } = props;
  return (
    <div className={`flex gap-x-4 items-center w-full max-w-xs p-4 text-white rounded-lg shadow ${className}`}>
      <div className='ms-3 text-sm font-normal'>{message}</div>
      <button onClick={() => hideToast(id)} type='button' className='text-sm text-white hover:text-gray-900 rounded-lg'>
        <CloseIcon className='size-4' />
      </button>
    </div>
  );
};

export default Toast;
