import React, { useState } from 'react'
import Logo from '../../assets/Logo.png'
import LogoBlanco from '../../assets/LogoBlanco.png'
import { navigate } from 'gatsby'
import { Button, Form, Input } from 'antd'
import User from '../../service/User'
import useAuthContext from '../../hooks/useAuthContext'

function SignIn() {

    const { authIsSuccess } = useAuthContext()
    const [loading, setLoading] = useState(false)
    const [step, setStep] = useState(0)
    const [res, setRes] = useState({})
    const [correo, setCorreo] = useState('')
    const [password, setPassword] = useState('')

    const onFinish = async (values) => {
        setLoading(true)
        try {
            User.auth({
                correo: values.username,
                pass: values.password
            })
                .then(res => {
                    if (res.id_Usuario === 0) {
                        setLoading(false)
                        return alert('Usuario o contraseña incorrectos')
                    }
                    setCorreo(res.correo_Usuario)
                    setPassword(res.contraseña_Usuario)
                    setRes(res)
                    setStep(1)

                })
                .catch(error => {
                    console.error(error)
                    setLoading(false)
                })
        }
        catch (error) {

        }
        setLoading(false)
    }

    const verificaciónOTP = async (values) => {

        try {
            User.OTP({
                mfa: Number(values.MFA),
                Id_Usuario: res.id_Usuario,
            })
                .then(res => {
                    if (res.id_Usuario !== 0) {
                        localStorage.setItem('correo', res.correo_Usuario)
                        localStorage.setItem('password', res.contraseña_Usuario)
                        authIsSuccess(res)
                    }
                })
                .catch(error => {
                    console.error(error)
                })

        } catch (error) {
            console.error(error)
        }
    }

    const newUser = async (values) => {
        try {
            User.newUser({
                correo: values.correo,
                pass: values.password
            })
                .then(res => {
                    console.log(res)
                })

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className='w-full'>

            <div className='grid grid-cols-2 bg-white'>
                <div className='hidden md:flex justify-center items-center min-h-screen bg-signIn'>
                    <div className='px-2 md:px-10 lg:px-28'>
                        <img src={LogoBlanco} alt='Logo' width={260} className='mb-6' />
                        <p className='text-simple !text-white text-xl pe-20'>
                            Bienvenido al portal de adquisiciones de TPC
                        </p>
                    </div>
                </div>
                {
                    step == 0 && (
                        <div className='col-span-2 md:col-span-1 flex flex-col justify-center items-center min-h-screen px-4 md:px-0'>
                            <div className='w-full sm:w-4/5 lg:w-3/5 mb-8'>
                                <div className='bloc md:hidden'>
                                    <img src={Logo} alt='Logo' width={260} className='mb-4 mx-auto' />
                                </div>
                                <p className='text-simple text-center text-sm px-4 md:hidden'>
                                    Bienvenido al portal de adquisiciones de TPC
                                </p>
                                <p className='hidden md:inline-block text-center text-lg md:text-left'>
                                    Iniciar sesión:
                                </p>
                            </div>
                            <Form onFinish={onFinish} name='signIn' autoComplete='off' className='form-expand w-full sm:w-4/5 lg:w-3/5'>
                                <Form.Item
                                    name='username'
                                    rules={[{ required: true, message: 'Por favor ingrese su correo electrónico' }]}
                                >
                                    <Input
                                        placeholder='Correo electrónico'
                                        disabled={loading}
                                    />

                                </Form.Item>
                                <Form.Item
                                    name='password'
                                    rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
                                >
                                    <Input.Password
                                        placeholder='Contraseña'
                                        disabled={loading}
                                    />
                                </Form.Item>

                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    block
                                    loading={loading}
                                    disabled={loading}
                                >
                                    Iniciar sesión
                                </Button>
                            </Form>
                            <p p className='text-base mt-10'>
                                ¿Usuario Nuevo? <span className='text-primary  text-app cursor-pointer' onClick={() => setStep(2)}>Click aqui</span>
                            </p>
                        </div>
                    )
                }
                {
                    step == 1 && (
                        <div className='col-span-2 md:col-span-1 flex flex-col justify-center items-center min-h-screen px-4 md:px-0'>
                            <div className='w-full sm:w-4/5 lg:w-3/5 mb-8'>
                                <div className='bloc md:hidden'>
                                    <img src={Logo} alt='Logo' width={260} className='mb-4 mx-auto' />
                                </div>
                                <p className='text-simple text-center text-sm px-4 '>
                                    Ingresa el código de verificación que te hemos enviado a tu correo
                                </p>

                            </div>
                            <Form onFinish={verificaciónOTP} name='OTP' autoComplete='off' className='form-expand w-full sm:w-4/5 lg:w-3/5 flex items-center flex-col gap-5'>
                                <Form.Item
                                    name='MFA'
                                    rules={[{ required: true, message: 'Por favor ingrese su codigo' }]}
                                >
                                    <Input.OTP
                                        placeholder='Código de verificación'
                                        disabled={loading}
                                    />
                                </Form.Item>
                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    block
                                    loading={loading}
                                    disabled={loading}

                                >
                                    Verificar
                                </Button>
                            </Form>
                        </div>
                    )
                }
                {
                    step == 2 && (
                        <div className='col-span-2 md:col-span-1 flex flex-col justify-center items-center min-h-screen px-4 md:px-0'>
                            <div className='w-full sm:w-4/5 lg:w-3/5 mb-8'>
                                <div className='bloc md:hidden'>
                                    <img src={Logo} alt='Logo' width={260} className='mb-4 mx-auto' />
                                </div>
                                <p className='text-xl text-app text-center font-bold px-4 '>
                                    Bienvenido Nuevo Usuario
                                </p>
                                <p className='text-center'>
                                    Ingrese el código de verificación que le hemos enviado y su correo
                                </p>


                            </div>
                            <Form onFinish={newUser} name='newUser' autoComplete='off' className='form-expand w-full sm:w-4/5 lg:w-3/5 flex items-center flex-col gap-5'>

                                <Form.Item
                                    className='w-full'
                                    name='correo'
                                    rules={[{ required: true, message: 'Por favor ingrese su correo electrónico' }]}
                                >
                                    <Input
                                        placeholder='Correo electrónico'
                                        disabled={loading}
                                    />
                                </Form.Item>

                                <Form.Item
                                    className='w-full'
                                    name='password'
                                    rules={[{ required: true, message: 'Por favor ingrese su contraseña' }]}
                                >
                                    <Input.Password
                                        placeholder='Contraseña'
                                        disabled={loading}
                                    />
                                </Form.Item>

                                <Button
                                    type='primary'
                                    htmlType='submit'
                                    block
                                    loading={loading}
                                    disabled={loading}

                                >
                                    Unirme
                                </Button>
                            </Form>
                        </div>
                    )
                }

            </div>
        </div>
    )
}

export default SignIn