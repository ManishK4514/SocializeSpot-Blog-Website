import React from 'react'
import Register from '@/components/register'
import Head from 'next/head'
import Layout from '@/layout/layout'

const RegisterPage = () => {
    return (
        <Layout>
            <Head>
                <title>
                    Register
                </title>
            </Head>
            <Register />
        </ Layout>
    )
}

export default RegisterPage;