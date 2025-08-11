import Lottie  from 'lottie-react';
import error from '../assets/error.json';

function Error() {
  return (
    <main className="min-h-screen bg-slate-800 text-white font-primary">
        <header>
            <img src="" alt="" />
        </header>

        <main className='mt-40 w-full flex flex-row items-center justify-center gap-10'>
            <section>
                <h1 className="text-4xl font-medium mb-5">Oops, Wrong Turn..!</h1>
                <p className="text-md font-light mb-5">Oops! Something went wrong.<br/>The page you’re looking for isn’t available.<br/>Please check the URL or return to the homepage<br/>to continue browsing.</p>

                <button
                className="border-2 border-white text-white my-5 px-10 py-2 rounded-full transition active:scale-95 "
                >
                    Back to Home
                </button>
            </section>
            <section className='mt-10'>
                <Lottie  animationData={error} loop={true} />
            </section>
        </main>
    </main>
  )
}

export default Error