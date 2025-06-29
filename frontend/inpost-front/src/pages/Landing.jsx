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
              <img className='scale-110' src='/mailbox_prod.webp' alt='' />
            </div>
          </dir>
        </div>
      </section>
      <section className='w-screen h-screen '>
        <div className='w-auto  mx-[86px] flex flex-col'>
          <h3 className='text-[60px] text-[#C2E812] font-semibold pt-10 mb-20'>
            How does it work
          </h3>
          <div className='mb-[86px] bg-[#EEEEEE] rounded-3xl flex-1 flex items-center justify-evenly py-3'>
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
                  <img src='/democol1.png' alt='' />
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
                  <img src='/democol3.png' alt='' />
                </div>
              </div>
            </div>
            <FaChevronRight className='mx-2 text-[100px]' />
            <div className='w-full py-6 pl-6 pr-9 self-start'>
              <div className='flex items-start gap-2'>
                <div className='bg-black h-[35px] w-[35px] rounded-full flex justify-center items-center text-xl pr-[1px] font-semibold text-[#C2E812] shrink-0'>
                  3
                </div>
                <div>
                  <h4 className='text-xl font-medium'>choose</h4>
                  <p className='text-sm mb-5'>
                    Endless number of mailboxes to suit every need
                  </p>
                  <img src='/democol2.png' alt='' />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className='w-screen mb-15'>
        <div className='w-auto mx-[86px] flex flex-col'>
          <h3 className='text-[60px] text-black font-semibold  mb-20'>
            Features
          </h3>
          <div className='flex gap-5 mb-[-30px]'>
            <img className='h-70 w-70' src='/easyOpenCircle.webp' alt='' />
            <div className='flex flex-col pt-10 w-[40%]'>
              <h5 className='text-xl font-semibold mb-2'>Easy open</h5>
              <p className='pl-[2px]'>
                View content instantly — no waiting. Messages are displayed with
                full CSS styling for a polished look. Messages are cached
                locally, so you can revisit them without downloading again.
              </p>
            </div>
          </div>
          <div className='flex flex-row-reverse gap-5 mb-[-30px]'>
            <img className='h-70 w-70' src='/tooltipCircle.webp' alt='' />
            <div className='flex flex-col pt-10 w-[40%]'>
              <h5 className='text-xl font-semibold mb-2'>Tooltip</h5>
              <p className='pl-[2px]'>
                Hover over any button to see a helpful tooltip — no guesswork,
                no confusion. We’ve added clear explanations so you always know
                what each action means.
              </p>
            </div>
          </div>
          <div className='flex gap-5 '>
            <img className='h-70 w-70' src='/copyCircle.webp' alt='' />
            <div className='flex flex-col pt-10 w-[40%]'>
              <h5 className='text-xl font-semibold mb-2'>Clipboard</h5>
              <p className='pl-[2px]'>
                Effortlessly copy and switch between multiple mailboxes with
                just a single click. Our interface is quick, intuitive, and
                always ready when you are — making your workflow smoother and
                more efficient.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className='w-screen h-screen '>
        <div className='w-auto  mx-[86px] flex flex-col'>
          <h3 className='text-[60px] text-[#C2E812] font-semibold pt-10 mb-20'>
            About
          </h3>
          <div className='min-h-[420px] relative mb-[86px] bg-[#EEEEEE] rounded-3xl flex-1 flex items-center justify-center p-3 mt-8'>
            <div className='flex-1 shrink-0 flex flex-col justify-center items-start gap-10'>
              <p className='pl-8'>
                This application was built as a hands-on project to practice and
                enhance skills in React, Node.js, and MongoDB. It serves as a
                full-stack implementation to explore how these technologies work
                together in a real-world development environment.
              </p>
              <button className='ml-8 px-5 py-2 bg-black text-[#C2E812] rounded-lg text-lg font-semibold cursor-pointer transition duration-150 active:scale-95'>
                LOG IN
              </button>
            </div>
            <div className='w-1/2'></div>
            <img
              className='absolute w-[483px] h-[509px] rounded-xl -top-25 right-25 drop-shadow'
              src='/aboutScreenClipped.webp'
              alt=''
            />
            <img
              className='absolute aspect-[173/209] w-[346px] rounded-xl -bottom-5 right-13 drop-shadow-lg'
              src='/aboutScreenAuth.webp'
              alt=''
            />
          </div>
        </div>
      </section>
    </main>
  );
}

export default Landing;
