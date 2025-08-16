import Lottie  from 'lottie-react';
import error from '../assets/error.json';
import { useNavigate } from 'react-router-dom';

function Error() {
    const navigate = useNavigate();
  return (
    <main className="min-h-screen bg-slate-800 text-white font-primary">
        <header>
            <img src="" alt="" />
        </header>

        <main className='mt-40 w-full flex flex-row items-start gap-40 justify-between px-40'>
            <section className='w-1/3'>
                <h1 className="text-4xl font-medium mb-5">Oops, Wrong Turn..!</h1>
                <p className="text-md font-light mb-5">Oops! Something went wrong. The page you’re looking for isn’t available. Please check the URL or return to the homepage<br/>to continue browsing.</p>

                <button
                onClick={() => navigate("/")}
                className="border-2 border-white text-white my-5 px-10 py-2 rounded-full transition active:scale-95 "
                >
                    Back to Home
                </button>
            </section>
            <section className='w-2/3'>
                <Lottie  animationData={error} loop={true} className='w-2/3' />
            </section>
        </main>
    </main>
  )
}

export default Error