import { FaTriangleExclamation } from 'react-icons/fa6';
import { FaCircleChevronLeft } from 'react-icons/fa6';

// Для Log In передавать
// type='login'
// handleSubmit={handleSubmit(onSubmit)}
// handleCreateAccount={handleCreateAccount} !
// authError=''

// Для Sign Up передавать
// type='login'
// handleSubmit={handleSubmit(onSubmit)}
// handleBack !
// authError=''

function FormAuth({
  type,
  handleSubmit,
  handleCreateAccount,
  handleBack,
  authError,
  children,
}) {
  return (
    <form
      action=''
      className='relative w-90 h-115 shadow-lg px-10 pt-14 pb-8 flex flex-col justify-between'
      onSubmit={handleSubmit}
    >
      <div
        className={`absolute top-5 left-9 z-10 flex items-center gap-1 opacity-60 text-gray-600 cursor-pointer ${
          type === 'login' ? 'invisible' : ''
        }`}
        onClick={handleBack}
      >
        <FaCircleChevronLeft />
        <p>back</p>
      </div>

      <div className='flex flex-col justify-between'>
        <h3 className='text-xl font-bold'>
          {type === 'login' ? 'Log in' : 'Sign up'}
        </h3>

        <p className={`text-xs mb-6 ${type === 'login' ? '' : 'invisible'}`}>
          Aren't you with us yet?
          <span
            onClick={handleCreateAccount}
            className='text-blue-500 cursor-pointer'
          >
            {` Create account`}
          </span>
        </p>
        {children}
      </div>

      <div
        className={`flex items-center gap-1.5 ml-1 text-red-500 ${
          authError ? '' : 'invisible'
        }`}
      >
        <FaTriangleExclamation className='text-sm shrink-0' />
        <p className={`text-xs`}>{authError}</p>
      </div>

      <div>
        <button
          className='w-full mb-2 bg-orange-400 cursor-pointer rounded-[12px] py-1.5 text-white shadow'
          style={{
            background:
              'linear-gradient(137deg,rgba(42, 123, 155, 1) 2%, rgba(194, 232, 18, 1) 53%, rgba(194, 232, 18, 1) 70%, rgba(237, 221, 83, 1) 100%)',
          }}
        >
          submit
        </button>
        <p
          className={`text-xs text-center text-blue-500 cursor-pointer ${
            type === 'login' ? '' : 'invisible'
          }`}
        >
          Forgot password
        </p>
      </div>
    </form>
  );
}

export default FormAuth;
