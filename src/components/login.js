import React, { useEffect, useState , useRef, useContext} from 'react'
import Navbar from './Navbar'
import { Link } from 'react-router-dom'
import Sitecontext from '../context/Sitecontext'
// import { useAuth0 } from '@auth0/auth0-react'
const Login = () => {
  // const {user} = useAuth0();
  // console.log("current user : ",user)

  const {login_request}=useContext(Sitecontext)

  const input_field=useRef(null)

  const [eye_icon,set_eye_icon]=useState(true)

  const [state_login_form, set_state_login_form] = useState({})
  const handle_form_change = (e) => {
    const { name, value } = e.target
    set_state_login_form({ ...state_login_form, [name]: value })
  }

  const handle_icon=()=>{
    set_eye_icon(!eye_icon)
  }

  useEffect(()=>{
    eye_icon ? input_field.current.type="password" : input_field.current.type="text"
  },[eye_icon])

  const handle_submit_login = (e) => {
    e.preventDefault()
    login_request(state_login_form.email,state_login_form.password)
    set_state_login_form({})
  }


  return (
    <>
      <Navbar nav_bg="bg-blue-800" />
      <div className=" flex flex-col lg:flex-row h-[90vh] w-full bg-white rounded-lg shadow-lg">
        <div className="form-container p-10 w-full lg:w-1/2 flex flex-col justify-center">
          <img src="/digibox_blue_nav_logo.png" alt="DigiBoxx Logo" className="mb-12 w-36 h-auto mx-auto lg:ml-0" />
          <h1 className="text-3xl mb-2 text-blue-500 font-bold text-center lg:text-left">Sign in to your DigiBoxx <br className="lg:hidden" /> account</h1>
          <p className="text-gray-400 mb-5 text-center lg:text-left">Welcome! Looks like you have created <br className="lg:hidden" /> your new account</p>
          <form onSubmit={handle_submit_login} name="signupForm" className="flex flex-col items-center font-semibold lg:items-start">
            <input type="email" onChange={handle_form_change} value={!state_login_form.email?"":state_login_form.email} name="email" placeholder="Email ID*" required className="mb-5 p-2.5 border border-gray-300 outline-none rounded-md w-full max-w-xs lg:max-w-none" />
            <div className="relative flex border border-gray-300 rounded-md focus:border-2 focus:border-black items-center mb-5 w-full max-w-xs pr-3 lg:max-w-none">
              <input type="password" ref={input_field} onChange={handle_form_change} value={!state_login_form.password?"":state_login_form.password} name="password" minLength={5} id="password" placeholder="Password*" required className="p-2.5 rounded-md outline-none w-full max-w-xs lg:max-w-none " />
              <button type="button" onClick={handle_icon}>
                {
                  eye_icon ? 
                  <svg width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 0 0C 0 0 0 35 0 35C 0 35 965 1000 965 1000C 965 1000 1000 1000 1000 1000C 1000 1000 1000 965 1000 965C 1000 965 35 0 35 0C 35 0 0 0 0 0C 0 0 0 0 0 0M 981 484C 987 492 987 503 981 511C 876 670 688 748 501 749C 315 750 127 673 21 515C 15 507 15 496 21 487C 127 329 314 250 501 249C 503 249 504 249 505 249C 691 250 877 327 981 484C 981 484 981 484 981 484M 501 299C 334 300 169 369 72 501C 168 634 334 700 501 699C 668 699 834 630 930 498C 835 366 671 300 505 299C 504 299 503 299 501 299C 501 299 501 299 501 299M 624 376C 657 409 675 454 675 500C 675 546 657 591 624 624C 591 657 546 675 500 675C 454 675 409 657 376 624C 343 591 325 546 325 500C 325 468 334 437 350 410C 356 428 373 439 391 439C 415 439 434 420 434 396C 434 377 422 360 403 354C 432 335 466 325 500 325C 546 325 591 343 624 376C 624 376 624 376 624 376"/></svg> :
                  <svg width="24" height="24" viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><path d="M 981 484C 987 492 987 503 981 511C 876 670 688 748 501 749C 315 750 127 673 21 515C 15 507 15 496 21 487C 127 329 314 250 501 249C 503 249 504 249 505 249C 691 250 877 327 981 484C 981 484 981 484 981 484M 501 299C 334 300 169 369 72 501C 168 634 334 700 501 699C 668 699 834 630 930 498C 835 366 671 300 505 299C 504 299 503 299 501 299C 501 299 501 299 501 299M 624 376C 657 409 675 454 675 500C 675 546 657 591 624 624C 591 657 546 675 500 675C 454 675 409 657 376 624C 343 591 325 546 325 500C 325 468 334 437 350 410C 356 428 373 439 391 439C 415 439 434 420 434 396C 434 377 422 360 403 354C 432 335 466 325 500 325C 546 325 591 343 624 376C 624 376 624 376 624 376" /></svg>
                }
              </button>
            </div>
            <button type="submit" className="bg-blue-600 text-white p-2.5 rounded-md cursor-pointer mb-5 w-full max-w-xs lg:max-w-none font-bold hover:bg-blue-700 text-lg h-12">Sign In</button>
            <p className="login-link text-center text-blue-500"><Link to="/signup" style={{ marginLeft: "100px;" }}>Don't have a account? Sign Up</Link></p>
          </form>
        </div>
        <div className="info-container relative w-full lg:w-1/2 bg-cover bg-center hidden lg:flex rounded-t-lg lg:rounded-l-[90px] lg:rounded-t-none p-10 flex-col justify-end items-start lg:overflow-hidden">
          <div className="info-image">
            <img src="/digiboxx-bg-right.png" alt="Background Image" className="absolute inset-0 w-full h-full  rounded-2xl object-cover" />
          </div>
        </div>
      </div>
    </>
  )
}

export default Login