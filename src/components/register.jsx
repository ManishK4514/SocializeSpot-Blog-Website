"use client"

import React from 'react';
import Link from 'next/link';
import styles from "../styles/Form.module.css";
import { HiAtSymbol, HiFingerPrint, HiOutlineUser } from "react-icons/hi";
import { useState } from 'react';
import { useFormik } from 'formik';
import { register_validate } from '@/app/libs/validate';
import { useRouter } from 'next/navigation';

const Register = () => {
  const [show, setShow] = useState({password: false, cpassword: false});
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      cpassword: '',
    },
    validate: register_validate,
    onSubmit
  })

  async function onSubmit(values) {
    const options = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values)
    }

    const signupRes = await fetch('http://localhost:3000/api/signup', options);
    const user = await signupRes.json();
    
    if(user) router.push('/login');
  }

  return (
    <section className='w-3/4 mx-auto flex flex-col gap-10'>
      <div className='title'>
        <h1 className='text-gray-800 text-4xl font-bold py-4'>Register</h1>
        <p className='w-3/4 mx-auto text-gray-400'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, fugit!</p>
      </div>

      {/* form */}
      <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
        <div className={styles.input_group}>
          <input className={styles.input_text} type="text" name='username' placeholder='Username' {...formik.getFieldProps('username')} />
          <span className='icon flex items-center px-4'><HiOutlineUser size={25} /></span>
        </div>
        {formik.errors.username && formik.touched.username ? <span className='text-rose-500' >{formik.errors.username}</span> : <></>}
        <div className={styles.input_group}>
          <input className={styles.input_text} type="email" name='email' placeholder='Email' {...formik.getFieldProps('email')} />
          <span className='icon flex items-center px-4'><HiAtSymbol size={25} /></span>
        </div>
        {formik.errors.email && formik.touched.email ? <span className='text-rose-500' >{formik.errors.email}</span> : <></>}
        <div className={styles.input_group}>
          <input className={styles.input_text} type={`${show.password ? 'text' : 'password'}`} name='password' placeholder='Password' {...formik.getFieldProps('password')} />
          <span onClick={() => setShow({...show, password: !show.password})} className='icon flex items-center px-4'><HiFingerPrint size={25} /></span>
        </div>
        {formik.errors.password && formik.touched.password ? <span className='text-rose-500' >{formik.errors.password}</span> : <></>}
        <div className={styles.input_group}>
          <input className={styles.input_text} type={`${show.cpassword ? 'text' : 'password'}`} name='cpassword' placeholder='Confirm Password' {...formik.getFieldProps('cpassword')} />
          <span onClick={() => setShow({...show, cpassword: !show.cpassword})} className='icon flex items-center px-4'><HiFingerPrint size={25} /></span>
        </div>
        {formik.errors.cpassword && formik.touched.cpassword ? <span className='text-rose-500' >{formik.errors.cpassword}</span> : <></>}

        {/* login buttons */}
        <div className={styles.input_group}>
          <button type='submit' className={styles.button}>
            Register
          </button>
        </div>
      </form>

      {/* buttom */}
      <p className='text-center text-gray-400'>
        have an account? <Link className='text-blue-500' href={'/login'}>
          Sign In
        </Link>
      </p>
    </section>
  )
}

export default Register;