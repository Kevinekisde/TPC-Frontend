import React, { useState } from 'react'
import Logo from '../../assets/Logo.png'
import Menu from '../../data/Menu.json'
import { Link, navigate } from 'gatsby'
import { Avatar, Button, Drawer, Popover } from 'antd'
import { UserOutlined } from '@ant-design/icons'
import { PiList, PiNewspaper, PiPaperPlane } from 'react-icons/pi'
import useAuthContext from '../../hooks/useAuthContext'

function Navbar() {

    const { user } = useAuthContext()

    const [open, setOpen] = useState(false)

    const handleLogout = () => {
        localStorage.removeItem('correo')
        localStorage.removeItem('password')
        navigate('/')
    }

    return (
        <>
            <header className="hidden lg:block w-full bg-white">
                <div className="container px-6 py-4">
                    <div className="flex items-center justify-between">
                        <div className='flex items-center gap-2'>
                            <Avatar onClick={() => setOpen(true)} size={42} icon={<UserOutlined />} />
                            <div className='flex flex-col'>
                                <h1 className="text-[#1135A6] text-lg font-bold">
                                    {user.nombre_Usuario}
                                </h1>
                                <p className="text-[#1135A6] text-sm">
                                    {user.isAdmin ? 'Administrador' : 'Usuario'}
                                </p>
                            </div>

                        </div>
                        <div className="flex items-center gap-8">

                            <div className='flex ms-5 gap-8'>
                                {
                                    Menu.map((item, index) => (
                                        <Popover className='cursor-pointer' placement='bottom' key={index} content={
                                            <div className='flex flex-col gap-2 !cursor-pointer'>
                                                {
                                                    item.items.map((subitem, i) => (
                                                        <Link key={i} to={subitem.url} className="text-sm text-[#556a89] hover:text-app py-2 px-4 text-center cursor-pointer" activeClassName="text-app link-active font-medium">
                                                            {subitem.name}
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        }>
                                            {item.label}
                                        </Popover>
                                    ))
                                }
                            </div>
                        </div>


                    </div>
                </div>
            </header>
            <div className="lg:hidden fixed bottom-0 z-50 w-full py-2 bg-white border-t border-[slate-400]">
                <div className="flex flex-row justify-center space-x-1">
                    <Link to="/" className="flex flex-col justify-center items-center p-3" activeClassName="text-app link-active font-medium">
                        <PiNewspaper size={24} />
                        <p className="text-xs mt-1">Solicitudes OC</p>
                    </Link>
                    <Link to="/usuarios" className="flex flex-col justify-center items-center p-3" activeClassName="text-app link-active font-medium">
                        <PiNewspaper size={24} />
                        <p className="text-xs mt-1">Solicitudes Cotizar</p>
                    </Link>
                    <Link to="/solicitud" className="flex flex-col justify-center items-center p-3" activeClassName="text-app link-active font-medium">
                        <PiNewspaper size={24} />
                        <p className="text-xs mt-1">Crear solicitud</p>
                    </Link>
                    <div
                        className="flex flex-col justify-center items-center p-3"
                        onClick={() => setOpen(true)}
                        onKeyDown={() => setOpen(true)}
                        role="button"
                        tabIndex={0}
                    >
                        <PiList size={24} />
                        <p className="text-xs mt-1">Menú</p>
                    </div>
                </div>
            </div>
            <Drawer
                open={open}
                onClose={() => setOpen(false)}
                width={300}
                styles={{ header: { display: 'none' } }}
                placement='left'
                classNames={{
                    body: 'flex flex-col ',
                    footer: 'flex justify-center',
                }}
                footer={<div className="py-4 mb-1"><div className='cursor-pointer' onClick={() => handleLogout()} >Cerrar sesion</div></div>}
            >
                <div className="mb-4 block w-full">
                    <img src={Logo} alt="The Mirror" width={100} height={100} className="m-auto" />
                </div>
                <div className='flex items-center justify-center flex-col'>
                    <h1>
                        Bienvenido/a
                    </h1>
                    <p className='text-xl font-bold'>
                        {user.nombre_Usuario}
                    </p>
                </div>
                <div className="flex flex-col justify-center my-8 gap-y-4">
                    {Menu.map((option, i) => (
                        <Popover key={i} placement='right' content={
                            <div className='flex flex-col gap-2'>
                                {
                                    option.items.map((subitem, index) => (
                                        <Link key={index} to={subitem.url} className="text-sm text-[#556a89] hover:text-app py-2 px-4 text-center" activeClassName="text-app link-active font-medium">
                                            {subitem.name}
                                        </Link>
                                    ))
                                }
                            </div>
                        }>
                            <Button type='text' className='w-full text-left text-lg font-bold'>{option.label}</Button>
                        </Popover>
                    ))}

                </div>
            </Drawer>

        </>
    )
}

export default Navbar