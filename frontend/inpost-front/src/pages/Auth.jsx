import { useState } from 'react';
import FormTextInput from '../components/FormTextInput';
import { FaCircleChevronLeft } from 'react-icons/fa6';
import { useForm } from 'react-hook-form';

function Auth() {
  const [formType, setFormType] = useState('login');
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
  } = useForm({ mode: 'onBlur' });

  const password = watch('signupPassword');

  const handleCreateAccount = () => {
    setFormType('signup');
  };

  const handleSignupBack = () => {
    setFormType('login');
  };

  // евент хендлер on submit общий
  const onSubmit = (data) => {
    console.log('DEBUG USE FORM LOGIN: ', data);
  };

  // JSX Forms
  const LoginForm = () => {
    return (
      <form
        action=''
        className='w-90 h-115 shadow-lg px-10 py-14 flex flex-col justify-between'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className='flex flex-col justify-between mb-6'>
          <h3 className='text-xl font-bold mb-2'>Log in</h3>
          <p className='text-xs'>
            Aren't you with us yet?
            <span
              onClick={handleCreateAccount}
              className='text-blue-500 cursor-pointer'
            >
              {` Create account`}
            </span>
          </p>
        </div>
        <div className=''>
          <FormTextInput
            name='login'
            register={register('login', {
              required: true,
            })}
            errors={errors}
            className='mb-5'
            label='login'
          />
          <FormTextInput
            name='password'
            register={register('password', {
              required: true,
            })}
            errors={errors}
            type='password'
            label='password'
          />
        </div>
        <p className='text-xs py-10 text-blue-500 cursor-pointer'>
          Forgot password
        </p>
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
          <p className='text-xs text-center text-blue-500 cursor-pointer'>
            Forgot password
          </p>
        </div>
      </form>
    );
  };

  const SignupForm = () => {
    return (
      <form
        action=''
        className='relative w-90 h-115 shadow-lg px-10 py-14 flex flex-col justify-between'
        onSubmit={handleSubmit(onSubmit)}
      >
        <div
          className='absolute top-5 left-9 z-10 flex items-center gap-1 opacity-60 text-gray-600 cursor-pointer'
          onClick={handleSignupBack}
        >
          <FaCircleChevronLeft />
          <p>back</p>
        </div>

        <div className='flex flex-col justify-between'>
          <h3 className='text-xl font-bold mb-2'>Sign up</h3>
        </div>
        <div className=''>
          <FormTextInput
            name='signupLogin'
            register={register('signupLogin', {
              required: true,
              maxLength: {
                value: 10,
                message: 'No more than 10 characters',
              },
            })}
            errors={errors}
            className='mb-4'
            label='login'
          />
          <FormTextInput
            name='signupPassword'
            register={register('signupPassword', {
              required: true,
              minLength: {
                value: 8,
                message: 'Must be at list 8 characters',
              },
            })}
            errors={errors}
            className='mb-4'
            type='password'
            label='password'
          />
          <FormTextInput
            name='passwordConfirm'
            register={register('passwordConfirm', {
              validate: (value) => {
                {
                  console.log(value, password);
                }
                if (value !== password) return 'Passwords must match exactly';
              },
            })}
            errors={errors}
            className='mb-4'
            type='password'
            label='confirm password'
          />
        </div>
        <button
          className='bg-orange-400 cursor-pointer rounded-[12px] py-1.5 text-white shadow'
          style={{
            background:
              'linear-gradient(137deg,rgba(42, 123, 155, 1) 2%, rgba(194, 232, 18, 1) 53%, rgba(194, 232, 18, 1) 70%, rgba(237, 221, 83, 1) 100%)',
          }}
        >
          submit
        </button>
      </form>
    );
  };

  return (
    <div className='w-full pb-[70px] h-screen flex justify-center items-center'>
      {formType === 'login' ? LoginForm() : SignupForm()}
    </div>
  );
}

export default Auth;
