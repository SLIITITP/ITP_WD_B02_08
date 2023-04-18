import React, { useEffect , useState } from 'react'
import { Link } from 'react-router-dom'
import avatar from '../images/profile.png';
import styles from '../stylesheets/Username.module.css'
import toast,{ Toaster } from 'react-hot-toast';
import { useFormik } from 'formik';
import { passwordValidate } from '../validations/validate';
import { useAuthStore } from '../redux/store1';
import { generateOTP , verifyOTP } from '../apicalls/helper';
import { useNavigate } from 'react-router-dom';


export default function Recovery() {

  const {username} = useAuthStore(state => state.auth);
  const [OTP , setOTP] = useState();
  const navigate = useNavigate()

  useEffect(() => {
    generateOTP(username).then((OTP) =>{
      //console.log(OTP)
      if(OTP) return toast.success('OTP has been send to your email');
      return toast.error('Problem while generating OTP!')
    })
  },[username]);

  async function onSubmit(e){
    e.preventDefault();
  try {
    let {status} = await verifyOTP({username , code : OTP})
    if(status === 201){
      toast.success('Verify Success!')
      return navigate ('/reset')
    }
      
  } catch (error) {
      return toast.error('Wrong OTP! Check email again!')
    }
}

    // handler of resend OTP
    function resendOTP(){

      let sentPromise = generateOTP(username);
  
      toast.promise(sentPromise ,
        {
          loading: 'Sending...',
          success: <b>OTP has been send to your email!</b>,
          error: <b>Could not Send it!</b>,
        }
      );
  
      sentPromise.then((OTP) => {
        //console.log(OTP)
      });
      
    }


  return (
   <div className={styles.body}>      
    <div className="container mx-auto">

            <Toaster position='top-center' reverseOrder={false}></Toaster>

      <div className='flex justify-center items-center h-screen' >
        <div className={styles.glass}>
          <div className="title flex flex-col items-center">
            <h4 className='text-5xl font-bold'>Recovery</h4>
            <span className='py-4 text-xl w-2/3 text-center text-gray-500'>
              Enter OTP to recoverr password
            </span>
          </div>
          <form className='pt-20' onSubmit={onSubmit}>
            
            <div className="textbox flex flex-col items-center gap-6">

              <div className='input text-center'>
                <span className='py-4 text-sm text-left text-gray-500'>
                Ener 6 digit OTP sent to your email address
                </span>
                <input onChange={(e) => setOTP(e.target.value)} className={styles.textbox} type="password" placeholder='OTP'/>

              </div>

              
              
              <button className={styles.btn} type='submit'>Recover</button>
            </div>
           
          </form>

          <div className="text-center py-2 px-3.5">
              <span className='text-gray-500'>Can't get OTP <button onClick={resendOTP} className='text-red-500' to='/reset'>Resend</button></span>
            </div>

        </div>

      </div>
    </div>
    </div>
  )
}