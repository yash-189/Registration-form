import React, { useEffect, useState } from 'react'
import Button_One from './button/Button_One';
import bgsvg from '../assests/bg_svg.svg'
import bg from '../assests/bg.png'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Register_form = () => {
    const navigate = useNavigate()

    const [active, setactive] = useState(false)
    const [formData, setformData] = useState(null)
    const [email, setemail] = useState('')
    const [alert, setalert] = useState(false)
    const [loading, setloading] = useState(false)

    const ageArray = [...new Array(48)].map((elem, index) => (index + 18))







    const registerUser = async (e) => {
        e.preventDefault()
        setloading(true)
        axios.post('https://api-317e.vercel.app/api/user/', formData)
            .then((res) => {
                console.log(res.data)
                if (res?.data?.status == 'success') {
                    let email = res?.data?.data?.email
                    localStorage.setItem('email', email)
                    setactive(true)
                } else {
                    window.alert('error')
                    setloading(false)
                }
            })
            .catch((err) => {
                console.log(err)
                setloading(false)
                window.alert('error')
            })


    }


    const completePayment = async (e) => {

        e.preventDefault()
        setloading(true)
        let useremail = localStorage.getItem('email')
        if (useremail !== email) {
            setalert(true)
            setloading(false)
        } else {


            console.log(useremail, email);

            axios.post('https://api-317e-yash-189.vercel.app/api/payment/', { 'email': email })
                .then((res) => {
                    console.log(res.data)
                    if (res?.data?.status == 'success') {
                      localStorage.clear()
                      navigate('/success')

                    } else {
                        window.alert('error')
                        setloading(false)
                    }
                })
                .catch((err) => {
                    console.log(err)
                    window.alert('error')
                    setloading(false)
                })
        }

    }


    const onChange = (e) => {
        setformData({ ...formData, [e.target.id]: e.target.value })
    }



    return (
        <>
            <div className=' h-screen w-screen flex'>

                <div className='bg-[#1592e6] relative w-[38%] hidden sm:flex flex-col justify-center items-center'>
                    <h1 className='absolute top-6 left-6 sm:text-2xl xl:text-4xl z-10 font-semibold sm:text-white'>yOga</h1>

                    <div className='absolute'>
                        <img src={bg} className='h-screen'></img>
                    </div>
                    <img src={bgsvg} className='w-2/3 '></img>

                </div>
                <div className=' sm:w-[62%] max-w-7xl mx-auto'>

                    <form onSubmit={!active ? registerUser : completePayment} className=' md:w-3/5 sm:w-4/5 w-4/5 mx-auto h-full flex flex-col justify-center font-sans'>
                        <div>
                            <h3 className='font-bold text-2xl mb-6'>{!active ? 'Admission form for the Yoga Classes' : 'You’re almost there'}</h3>
                            <div className='flex mb-6'>
                                <button type='button' onClick={() => setactive(false)} className={` mr-4 font-semibold  ${!active ? 'border-[#44C97D] border-b-[3px]' : ''} py-3 px-1`}>Step1</button>
                                <button type='button' onClick={() => setactive(true)} className={`  font-semibold ${active ? 'border-[#44C97D] border-b-[3px]' : ' border-b-2'}`}>Step2</button>
                            </div>
                        </div>

                        {!active && <>
                            <div className='font-light mb-4'>
                                <p className='mb-2 text-lg  font-light'>
                                    1. Choose your batch
                                </p>
                                <div className='flex justify-between text-base'>
                                    <div className="flex items-center ">
                                        <input onChange={onChange} value='6-7AM' required id="batch" type="radio" name="batch" className="w-4 h-4 accent-blue-500 bg-gray-100 border-gray-300 " />
                                        <label for="batch" className="py-3 ml-2 w-full text-sm  text-gray-900 dark:text-gray-300">6-7AM </label>
                                    </div>
                                    <div className="flex items-center ">
                                        <input onChange={onChange} id="batch" type="radio" value="7-8AM" name="batch" className="w-4 h-4 accent-blue-500 bg-gray-100 border-gray-300 " />
                                        <label for="batch" className="py-3 ml-2 w-full text-sm  text-gray-900 ">7-8AM </label>
                                    </div>
                                    <div className="flex items-center ">
                                        <input onChange={onChange} id="batch" type="radio" value="8-9AM" name="batch" className="w-4 h-4  bg-gray-100 border-gray-300 accent-blue-500" />
                                        <label for="batch" className="py-3 ml-2 w-full text-sm  text-gray-900 dark:text-gray-300">8-9AM </label>
                                    </div>
                                    <div className="flex items-center ">
                                        <input onChange={onChange} id="batch" type="radio" value="5-6PM" name="batch" className="w-4 h-4 accent-blue-500  bg-gray-100 border-gray-300 " />
                                        <label for="batch" className="py-3 ml-2 w-full text-sm  text-gray-900 dark:text-gray-300">5-6PM </label>
                                    </div>

                                </div>
                                <p className='text-xs text-gray-600'>Batch can only be change in next month</p>
                            </div>
                            <hr />
                            <div className='font-light my-6'>
                                <p className='mb-5 text-lg  font-light'>
                                    2. Enter your personal details
                                </p>
                                <div className="relative z-0 mb-6 w-full group text-base">
                                    <input onChange={onChange} type="text" name="name" id="name" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required />
                                    <label for="name" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Full name</label>
                                </div>

                                <div className="relative z-0 mb-6 w-full group text-base">
                                    <input onChange={onChange} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required />
                                    <label for="email" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                </div>

                                <div className="relative z-0 mb-6 w-full group text-base">
                                    <input onChange={onChange} type="tel" name="contact_no" maxLength={10} id="contact_no" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required />
                                    <label for="contact_no" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                </div>

                                <div className=" mb-6 w-full  text-base">
                                    <select onChange={onChange} name="age" id="age" className="block py-2.5 px-0 w-full  text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required >
                                        <option selected className='px-8'>{'Age'}</option>
                                        {ageArray.map((elem) => {
                                            return <option value={elem} className='px-8'>{elem}</option>
                                        })}

                                    </select>
                                </div>


                            </div>
                        </>
                        }




                        {active && <>

                            <div className='font-light '>
                                <p className='mb-5 text-lg  font-light'>
                                    3. Enter payment details
                                </p>


                                <div className="relative z-0 mb-6 w-full group text-base">
                                    <input onChange={(e) => setemail(e.target.value)} type="email" name="email" id="email" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required />
                                    <label for="email" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Confirm email address</label>
                                    {alert &&
                                        <p className='text-red-500 text-xs'>Check your email address</p>}
                                </div>

                                <div className="relative z-0 mb-6 w-full group text-base">
                                    <input type="tel" input mode="numeric" pattern="[0-9\s]{13,19}" autocomplete="cc-number" maxlength="19" name="card_no" id="card_no" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required />
                                    <label for="card_no" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Card number</label>
                                </div>

                                <div className='flex'>

                                    <div className="relative z-0 mb-6 mr-6 w-1/3 group text-base">
                                        <input type="tel" mode="numeric" maxlength="5" name="mm/yy" id="mm/yy" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required />
                                        <label for="mm/yy" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">MM/YY</label>
                                    </div>
                                    <div className="relative z-0 mb-6 w-1/3 group text-base">
                                        <input type="tel" mode="numeric" maxlength="3" name="cvv" id="cvv" className="block py-2.5 px-0 w-full text-sm  bg-transparent border-0 border-b-2 border-gray-300 appearance-none  focus:outline-none focus:ring-0 focus:border-blue-500 peer" placeholder=" " required />
                                        <label for="cvv" className="peer-focus:font-medium absolute  text-gray-500  duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-500  peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">CVV</label>
                                    </div>
                                </div>




                            </div>
                        </>
                        }

                        {!active ?
                            <Button_One type={'submit'} name={'Next'} css={'w-1/3 ml-auto'} /> :
                            <Button_One type={'submit'} name={'Next'} css={'w-1/3 ml-auto'} />}

                    </form>


                </div>





            </div >






        </>
    )
}

export default Register_form