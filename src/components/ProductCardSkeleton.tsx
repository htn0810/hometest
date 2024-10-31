const ProductCardSkeleton = () => (
  <div className='bg-gray-200 shadow-md rounded-md animate-pulse overflow-hidden'>
    <div className='aspect-square bg-gray-400 mb-2 animate-pulse'></div>
    <div className='p-2'>
      <div className='h-4 bg-gray-400 rounded w-3/4 mb-2 animate-pulse'></div>
      <div className='h-4 bg-gray-400 rounded w-1/2 mb-2 animate-pulse'></div>
      <div className='flex justify-between items-center'>
        <div className='h-4 bg-gray-400 rounded w-1/4 animate-pulse'></div>
        <div className='h-4 bg-gray-400 rounded w-1/6 animate-pulse'></div>
      </div>
    </div>
    <div className='w-full py-2 bg-gray-400 rounded-b-md animate-pulse'></div>
  </div>
);

export default ProductCardSkeleton;
