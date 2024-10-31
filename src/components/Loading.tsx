const Loading = () => {
  return (
    <div className='fixed inset-0 z-50 bg-overlay flex items-center justify-center'>
      <div className='size-10 rounded-full border-4 border-t-blue-700 border-gray-300 animate-spin'></div>
    </div>
  );
};

export default Loading;
