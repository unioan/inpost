function FormTextInput({
  label,
  value,
  onChangeHandler,
  error,
  color,
  className,
  type,
}) {
  return (
    <>
      <div className={`flex flex-col ${className}`}>
        <label htmlFor='' className='text-[10px] ml-4 mb-0.5'>
          {label}
        </label>
        <input
          type={type || 'text'}
          className='text-sm border rounded-[12px] py-2 px-4'
        />
        {error && <p className={`text-[10px] ml-4 ${color}`}>{error}</p>}
      </div>
    </>
  );
}

export default FormTextInput;
