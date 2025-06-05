import FormTextInput from '../components/FormTextInput';

function Auth() {
  return (
    <div className='w-full pb-[70px] h-screen flex justify-center items-center'>
      <form
        action=''
        className='w-90 h-100 shadow-lg p-10 flex flex-col justify-between'
      >
        <div className='flex justify-between px-18 mb-6 '>
          <button className='font-normal'>Log in</button>
          <button className='font-normal'>Sign up</button>
        </div>
        <div className='pb-20'>
          <FormTextInput className='mb-4' label='login' />
          <FormTextInput type='password' label='password' />
        </div>
        <button
          className='bg-orange-400 rounded-[12px] py-1.5 text-white shadow'
          style={{
            background:
              'linear-gradient(137deg,rgba(42, 123, 155, 1) 2%, rgba(194, 232, 18, 1) 53%, rgba(194, 232, 18, 1) 70%, rgba(237, 221, 83, 1) 100%)',
          }}
        >
          submit
        </button>
      </form>
    </div>
  );
}

export default Auth;
