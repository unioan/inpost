function MailSkeletonRow() {
  return (
    <tr className='border-b-[0.1px] border-black'>
      <td className='p-2'>
        <div className='w-4 h-4 bg-gray-200 rounded animate-pulse'></div>
      </td>
      <td className='p-2'>
        <div className='w-20 h-4 bg-gray-200 rounded animate-pulse'></div>
      </td>
      <td className='p-2'>
        <div className='w-32 h-4 bg-gray-200 rounded animate-pulse'></div>
      </td>
      <td className='p-2'>
        <div className='w-64 h-4 bg-gray-200 rounded animate-pulse'></div>
      </td>
      <td className='p-2'>
        <div className='flex flex-row-reverse gap-3 items-center'>
          <div className='w-5 h-5 bg-gray-200 rounded animate-pulse'></div>
          <div className='w-5 h-5 bg-gray-200 rounded animate-pulse'></div>
          <div className='w-5 h-5 bg-gray-200 rounded animate-pulse'></div>
        </div>
      </td>
    </tr>
  );
}

export default MailSkeletonRow;
