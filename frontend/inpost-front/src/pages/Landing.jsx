import { FaChevronRight } from 'react-icons/fa6';

function Landing() {
  return (
    <main>
      <section className='overflow-hidden w-screen h-screen bg-[radial-gradient(circle,_#E2FF5A_5%,_#C2E812_60%)]'>
        <div className='w-auto h-screen mx-[86px] text-[32px]'>
          <div className=' font-roboto h-[100px] flex justify-center items-center'>
            <p className='font-lato tracking-tight'>INPOST</p>
          </div>
          <dir className='flex'>
            {/* левая часть */}
            <div className='flex-1 flex flex-col justify-center items-start'>
              <div className='flex flex-col space-y-[-35px]'>
                <h1 className='text-[60px] font-semibold'>
                  Temporary mailboxes
                </h1>
                <h1 className='text-[60px] pl-[7px] font-semibold'>
                  for temporary needs
                </h1>
              </div>
              <h2 className='pl-[7px] text-lg leading-tight mb-9'>
                Register on any website without revealing your real email.{' '}
                <br />
                Instantly receive verification and sign-up links — no spam, no
                hassle.
              </h2>
              <button className='ml-[7px] px-3 py-2 bg-black text-[#C2E812] rounded-lg text-lg font-semibold cursor-pointer transition duration-150 active:scale-95'>
                GET A MAILBOX
              </button>
            </div>

            <div className='flex-1'>
              <img
                className='scale-110'
                src='../../public/mailbox_prod.webp'
                alt=''
              />
            </div>
          </dir>
        </div>
      </section>
      <section className='w-screen h-screen '>
        <div className='w-auto  mx-[86px] flex flex-col'>
          <h3 className='text-[60px] text-[#C2E812] font-semibold pt-10 mb-20'>
            How does it work
          </h3>
          <div className='mb-[86px] bg-[#EEEEEE] rounded-3xl flex-1 flex items-center justify-evenly'>
            <div className=' w-full py-6 pl-6 pr-2 self-start'>
              <div className='flex items-start gap-2'>
                <div className='bg-black h-[35px] w-[35px] rounded-full flex justify-center items-center text-xl pr-[1px] font-semibold text-[#C2E812] shrink-0'>
                  1
                </div>
                <div>
                  <h4 className='text-xl font-medium'>create</h4>
                  <p className='text-sm mb-5'>
                    You can have 2 active mailboxes at the same time
                  </p>
                  <img src='../../public/democol1.png' alt='' />
                </div>
              </div>
            </div>

            <FaChevronRight className='mx-2 text-[100px] text-black' />
            <div className='w-full py-6 pl-6 pr-12 self-start'>
              <div className='flex items-start gap-2'>
                <div className='bg-black h-[35px] w-[35px] rounded-full flex justify-center items-center text-xl pr-[1px] font-semibold text-[#C2E812] shrink-0'>
                  2
                </div>
                <div>
                  <h4 className='text-xl font-medium'>receive</h4>
                  <p className='text-sm mb-5'>
                    Messages and attachments right in front of you
                  </p>
                  <img src='../../public/democol3.png' alt='' />
                </div>
              </div>
            </div>
            <FaChevronRight className='mx-2 text-[100px]' />
            <div className='w-full py-6 pl-6 pr-12 self-start'>
              <div className='flex items-start gap-2'>
                <div className='bg-black h-[35px] w-[35px] rounded-full flex justify-center items-center text-xl pr-[1px] font-semibold text-[#C2E812] shrink-0'>
                  3
                </div>
                <div>
                  <h4 className='text-xl font-medium'>choose</h4>
                  <p className='text-sm mb-5'>
                    Endless number of mailboxes to suit every need
                  </p>
                  <img src='../../public/democol2.png' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
