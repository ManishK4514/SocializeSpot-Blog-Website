import React from 'react'
import Login from '@/components/login'
import Head from 'next/head'
import Layout from '@/layout/layout'

const LoginPage = () => {
    return (
        <Layout>
            <Head>
                <title>Login</title>
            </Head>
            <Login />
        </Layout>
    )
}

export default LoginPage