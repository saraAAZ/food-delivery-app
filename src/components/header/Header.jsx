import React from 'react'

import Logo from '../../assets/logo.png'
import Avatar from '../../assets/avatar.png'

import {MdShoppingBasket, MdAdd, MdLogout} from 'react-icons/md'

import {animate, motion} from 'framer-motion';
import {Link} from 'react-router-dom';
import {app} from '../../firebase.config'

import {getAuth, signInWithPopup, GoogleAuthProvider} from "firebase/auth";

import {useState} from 'react';
import {useStateValue} from '../../context/stateProvider';
import {actionType} from '../../context/reducer';
import { useEffect } from 'react';


const Header = () => {

    const firebaseAuth = getAuth(app);
    const provider = new GoogleAuthProvider();

    const [
        {
            user,
            cartShow,
            cartItems
        }, dispatch
    ] = useStateValue();
    const [isMenu, setIsMenu] = useState(false)

    const logIn = async () => {
        if (!user) {
            const {
                user: {
                    refreshToken,
                    providerData
                }
            } = await signInWithPopup(firebaseAuth, provider);
            dispatch({type: actionType.SET_USER, user: providerData[0]})
            localStorage.setItem('user', JSON.stringify(providerData[0]))
        } else {
            setIsMenu(!isMenu)
        }


    }
    const logOut = () => {
        setIsMenu(false);
        localStorage.clear();
        dispatch({type: actionType.SET_USER, user: null})
    }
    const showCart = () => {
        dispatch({
            type: actionType.SET_CART_SHOW,
            cartShow: !cartShow
        })
    }
    

    return (
        <div className='fixed z-50 w-screen p-3 px-4 md:p-5 md:px-10 bg-primary'>
            {/*desktop and tablet */}
            <div className='hidden md:flex h-full w-full items-center justify-between'>
                <Link to={'/'}
                    className='flex items-center gap-2'>
                    <img src={Logo}
                        className='w-10 object-cover'
                        alt='logo'/>
                    <p className=' text-headingColor text-xl font-bold '>City</p>
                </Link>
                <div className='flex items-center gap-8'>
                    <motion.ul initial={
                            {
                                opacity: 0,
                                x: 200
                            }
                        }
                        animate={
                            {
                                opacity: 1,
                                x: 0
                            }
                        }
                        exit={
                            {
                                opacity: 0,
                                x: 200
                            }
                        }
                        className='flex items-center gap-8'>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Home</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Menu</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>About Us</li>
                        <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer'>Service</li>
                    </motion.ul>
                    <div className='relative flex items-center justify-center'
                        onClick={showCart}>
                        <MdShoppingBasket className='text-textColor text-2xl cursor-pointer'/> {
                        cartItems && cartItems.length > 0 && <div className=' absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-cartNumBg'>
                            <p className='text-sm text-white font-semibold'>
                                {
                                cartItems.length
                            }</p>
                        </div>
                    } </div>
                    <div className='relative'>
                        <motion.img whileTap={
                                {scale: 0.6}
                            }
                            src={
                                user ? user.photoURL : Avatar
                            }
                            alt='userImage'
                            className=' cursor-pointer w-10 min-w-[40px] h-15 min-h-[40px] drop-shadow-xl rounded-full'
                            onClick={logIn}/> {
                    }
                        {
                        isMenu && (
                            <motion.div initial={
                                    {
                                        opacity: 0,
                                        scale: 0.6
                                    }
                                }
                                animate={
                                    {
                                        opacity: 1,
                                        scale: 1
                                    }
                                }
                                exit={
                                    {
                                        opacity: 0,
                                        scale: 0.6
                                    }
                                }
                                className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                                {
                                user && user.email === 'sara.abu.zena2000@gmail.com' && (
                                    <Link to={'/createItem'}>
                                        <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'
                                            onClick={
                                                () => setIsMenu
                                        }>New Item
                                            <MdAdd/></p>
                                    </Link>
                                )
                            }
                                <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'
                                    onClick={logOut}>LogOut
                                    <MdLogout/></p>
                            </motion.div>
                        )
                    } </div>

                </div>

            </div>
            {/* mobile */}
            <div className='flex items-center justify-between md:hidden h-full w-full'>

                <div className='relative flex items-center justify-center'
                    onClick={cartShow}>
                    <MdShoppingBasket className='text-textColor text-2xl cursor-pointer'/>
                    {
                        cartItems && cartItems.length > 0 && <div className=' absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center bg-cartNumBg'>
                            <p className='text-sm text-white font-semibold'>
                                {
                                cartItems.length
                            }</p>
                        </div>
                    }
                </div>
                <Link to={'/'}
                    className='flex items-center gap-2'>
                    <img src={Logo}
                        className='w-10 object-cover'
                        alt='logo'/>
                    <p className=' text-headingColor text-xl font-bold '>City</p>
                </Link>
                <div className='relative'>
                    <motion.img whileTap={
                            {scale: 0.6}
                        }
                        src={
                            user ? user.photoURL : Avatar
                        }
                        alt='userImage'
                        className=' cursor-pointer w-10 min-w-[40px] h-10 min-h-[40px] drop-shadow-xl rounded-full'
                        onClick={logIn}/> {
                    isMenu && (
                        <motion.div initial={
                                {
                                    opacity: 0,
                                    scale: 0.6
                                }
                            }
                            animate={
                                {
                                    opacity: 1,
                                    scale: 1
                                }
                            }
                            exit={
                                {
                                    opacity: 0,
                                    scale: 0.6
                                }
                            }

                            className='w-40 bg-gray-50 shadow-xl rounded-lg flex flex-col absolute top-12 right-0'>
                            {
                            user && user.email === 'sara.abu.zena2000@gmail.com' && (
                                <Link to={'/createItem'}>
                                    <p className='px-4 py-2 flex items-center gap-3 cursor-pointer hover:bg-slate-100 transition-all duration-100 ease-in-out text-textColor text-base'>New Item
                                        <MdAdd/></p>
                                </Link>
                            )
                        }
                            <ul className='flex flex-col'>
                                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 '
                                    onClick={
                                        () => setIsMenu
                                }>Home</li>
                                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2 '
                                    onClick={
                                        () => setIsMenu
                                }>Menu</li>
                                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                                    onClick={
                                        () => setIsMenu
                                }>About Us</li>
                                <li className='text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer hover:bg-slate-100 px-4 py-2'
                                    onClick={
                                        () => setIsMenu
                                }>Service</li>
                            </ul>
                            <p className='m-2 p-2 rounded-md shadow-md flex items-center justify-center bg-slate-200  gap-3 cursor-pointer hover:bg-gray-300 transition-all duration-100 ease-in-out text-textColor text-base'
                                onClick={logOut}>LogOut
                                <MdLogout/></p>
                        </motion.div>
                    )
                } </div>

            </div>
        </div>
    )
}

export default Header
