import './styles/Loader.css'

const Loader = () => {
  return (
    <div className='loader'>
        <div className="loader__ring"></div>
        <div className="loader__ring"></div>
        <div className="loader__ring"></div>
        <span className="loader__text">Loading</span>
    </div>
  )
}

export default Loader