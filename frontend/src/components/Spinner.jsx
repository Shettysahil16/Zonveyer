import loadingGif from '../assets/loading.gif';

function Spinner() {
  return (
    <div className='w-full h-full flex fixed inset-0 justify-center items-center bg-slate-200 opacity-50'>
      <img src={loadingGif} alt="loading" />
    </div>
  )
}

export default Spinner
