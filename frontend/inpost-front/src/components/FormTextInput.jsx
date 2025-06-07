import { FaRegCircleXmark } from 'react-icons/fa6';

function FormTextInput({
  label,
  name,
  onChangeHandler,
  errors,
  color,
  className,
  type,
  register,
}) {
  return (
    <>
      <div className={`relative flex flex-col ${className}`}>
        {console.log('DEBUG: errors', errors?.[name])}
        <label htmlFor='' className='text-[10px] ml-4 mb-0.5'>
          {label}
        </label>
        <input
          type={type || 'text'}
          className='text-sm border rounded-[12px] py-2 px-4'
          {...register}
        />
        {errors?.[name] && (
          <div className='absolute top-14 flex text-xs items-end ml-2'>
            <FaRegCircleXmark className='text-red-500 pb-[1px]' />
            <p className={`text-red-500  text-[10px] ml-1 ${color}`}>
              {errors?.[name].message || 'required'}
            </p>
          </div>
        )}
      </div>
    </>
  );
}

export default FormTextInput;
