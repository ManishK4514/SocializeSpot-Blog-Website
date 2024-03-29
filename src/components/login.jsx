"use client"

import React from 'react';
import Link from 'next/link';
import styles from "../styles/Form.module.css";
import Image from 'next/image';
import google from '../../public/assets/google.svg'
import github from '../../public/assets/github.svg'
import { HiAtSymbol, HiFingerPrint } from "react-icons/hi";
import { useState } from 'react';
import { signIn, signOut } from 'next-auth/react';
import { useFormik } from 'formik';
import { login_validate } from '@/app/libs/validate';
import { useRouter } from 'next/navigation';

const Login = () => {
  const [show, setShow] = useState(false);
  const router = useRouter();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validate: login_validate,
    onSubmit
  })

  async function onSubmit(values) {
    const status = await signIn('credentials', {
      redirect: false,
      email: values.email,
      password: values.password,
      callbackUrl: "/"
    })

    if (status.ok) {
      router.push(status.url);
    } else {
      alert("Username or Password doesn't match...!");
    }
  }

  // Google Handler function
  async function handleGoogleSignin() {
    signIn('google', { callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
  }

  // Github Handler function
  async function handleGithubSignin() {
    signIn('github', { callbackUrl: process.env.NEXT_PUBLIC_BASE_URL })
  }

  return (
    <section className='w-5/6 md:w-3/4 mx-auto flex flex-col gap-4 md:gap-10'>
      <div className='title'>
        <h1 className='text-gray-800 text-2xl md:text-4xl font-bold py-4'>Explore</h1>
        <p className='w-3/4 mx-auto text-gray-400'>Access exclusive content - log in to our blog!</p>
      </div>

      {/* form */}
      <form className='flex flex-col gap-5' onSubmit={formik.handleSubmit}>
        <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600' : ''}`}>
          <input className={styles.input_text} type="email" name='email' placeholder='Email' {...formik.getFieldProps('email')} />
          <span className='icon flex items-center px-4'><HiAtSymbol size={25} /></span>
        </div>
        {formik.errors.email && formik.touched.email ? <span className='text-rose-500' >{formik.errors.email}</span> : <></>}
        <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
          <input className={styles.input_text} type={`${show ? 'text' : 'password'}`} name='password' placeholder='Password' {...formik.getFieldProps('password')} />
          <span onClick={() => setShow(!show)} className='icon flex items-center px-4'><HiFingerPrint size={25} /></span>
        </div>
        {formik.errors.password && formik.touched.password ? <span className='text-rose-500'>{formik.errors.password}</span> : <></>}

        {/* login buttons */}
        <div className={styles.input_group}>
          <button type='submit' className={styles.button}>
            Login
          </button>
        </div>
        <div className="input-button">
          <button onClick={handleGoogleSignin} type='button' className={styles.button_custom}>
            Sign In with Google <Image src={google} width={20} height={20} alt='google'></Image>
          </button>
        </div>
        <div className="input-button">
          <button onClick={handleGithubSignin} type='button' className={styles.button_custom}>
            Sign In with Github <Image src={github} width={25} height={25} alt='github'></Image>
          </button>
        </div>
      </form>

      {/* buttom */}
      <p className='text-gray-400'>
        Don&apos;t have an account yet? <Link className='text-blue-500' href={'/register'}>
          Sign Up
        </Link>
      </p>

    </section>
  )
}

export default Login;