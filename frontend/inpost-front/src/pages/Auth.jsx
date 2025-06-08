import { useState } from 'react';
import FormTextInput from '../components/FormTextInput';
import FormAuth from '../components/FormAuth';
import { useForm } from 'react-hook-form';
import { useAuth } from '../components/hoc/AuthProvider';
import { loginUser } from '../services/api';
import { useNavigate } from 'react-router-dom';

function Auth() {
  const navigate = useNavigate();

  const { userId, login, saveToStorage, removeFromStorage } = useAuth();
  const [authError, setAuthError] = useState('');

  const [formType, setFormType] = useState('login');
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch,
    reset,
  } = useForm({ mode: 'onBlur' });
  const password = watch('signupPassword');

  const handleCreateAccount = () => {
    reset();
    setFormType('signup');
  };

  const handleSignupBack = () => {
    reset();
    setFormType('login');
  };

  // евент хендлер on submit общий
  const onSubmit = async (data) => {
    if (formType === 'login') {
      const { login, password } = data;
      try {
        const { userId: backendUserId } = await loginUser({ login, password });
        saveToStorage('userId', backendUserId);
        saveToStorage('login', login);
        navigate('/dashboard');
      } catch (error) {
        const { message } = error.response.data;
        setAuthError(message);
      }
    } else if (formType === 'signup') {
      console.log(
        'DEBUG type SIGNUP: ',
        `data.signupLogin: ${data.signupLogin.trim()}`,
        `data.signupPassword: ${data.signupPassword.trim()}`
      );
    }
  };

  return (
    <div className='w-full pb-[70px] h-screen flex justify-center items-center'>
      {formType === 'login' ? (
        <FormAuth
          type='login'
          handleSubmit={handleSubmit(onSubmit)}
          handleCreateAccount={handleCreateAccount}
          authError={authError}
        >
          <div className='flex flex-col gap-4'>
            <FormTextInput
              name='login'
              register={register('login', {
                required: true,
              })}
              errors={errors}
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
        </FormAuth>
      ) : (
        <FormAuth
          type='signup'
          handleSubmit={handleSubmit(onSubmit)}
          handleBack={handleSignupBack}
          authError=''
        >
          <div className='flex flex-col gap-4'>
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
              type='password'
              label='password'
            />
            <FormTextInput
              name='passwordConfirm'
              register={register('passwordConfirm', {
                validate: (value) => {
                  if (value !== password) return 'Passwords must match exactly';
                },
              })}
              errors={errors}
              type='password'
              label='confirm password'
            />
          </div>
        </FormAuth>
      )}
    </div>
  );
}

export default Auth;
