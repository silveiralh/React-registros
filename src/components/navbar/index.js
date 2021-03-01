import React, { useState } from 'react';
import * as Ri from "react-icons/ri";
import * as Fa from "react-icons/fa";
import * as Md from "react-icons/md";
import * as Bs from "react-icons/bs";
import * as Hi from "react-icons/hi";
import * as Ai from "react-icons/ai";
import { Link } from 'react-router-dom';
import './navbar.css';
import { IconContext } from 'react-icons';
import { useSelector, useDispatch } from 'react-redux';


// - Criação dos próprios componente
function Navbar() {
    const dispatch = useDispatch();

    const [sidebar, setSidebar] = useState(false);
    // arrow function para o alternar entre menu ativo e não ativo
    const showSidebar = () => setSidebar(!sidebar);
    return (
        <IconContext.Provider value={{ color: '#1c1c1e' }}>
            <div className='navbar'>
                <Link to='#' className='menu-bars'>
                    {/* //toggle do sidebar usando useState */}
                    <Fa.FaBars className='toggle-button' onClick={showSidebar} />
                </Link>
               
                    
                    <div className=''  style={{ textAlign: "right" }}>
                        {
                            useSelector(state => state.usuarioLogado) === 0 ?

                                <Link to='/login' className='btn btn-md  mt-2 login text-center' >
                                    Login</Link>
                                :
                                <Link onClick={() => dispatch({ type: 'LOGOUT' })}  className='btn btn-md mt-2 login text-center'>
                                    Sair</Link>

                        }
                    </div>
                </div>

            {/* //condicional para alternar entre o X e o menu sideBar */}
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                {/* toggle do sidebar usando useState */}
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className='navbar-toggle'>
                        <Link to='#' className='menu-bars'>
                            <Ai.AiOutlineClose />
                        </Link>

                    </li>
                    <li className='nav-text'>
                        <Link to='/' className='menu-bars'>
                            <Fa.FaHome />
                            <span>Home</span>
                        </Link>
                    </li>
                    {
                        useSelector(state => state.usuarioLogado) > 0 ?
                            <> <li className='nav-text'>
                                <Link to='/registro' className='menu-bars'>
                                    <Ai.AiOutlineOrderedList />
                                    <span>Registros</span>
                                </Link>
                            </li>
                                <li className='nav-text'>
                                    <Link to='/cliente' className='menu-bars'>
                                        <Bs.BsFillPersonLinesFill />
                                        <span>Cliente</span>
                                    </Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/servico' className='menu-bars'>
                                        <Md.MdRoomService />
                                        <span>Serviços</span>
                                    </Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/produto' className='menu-bars'>
                                        <Ri.RiHandbagFill />
                                        <span>Produtos</span>
                                    </Link>
                                </li>
                                <li className='nav-text'>
                                    <Link to='/relatorio' className='menu-bars'>
                                        <Hi.HiDocumentReport />
                                        <span>Relatório</span>
                                    </Link>
                                </li>
                                <hr></hr>
                                <li className='nav-text'>
                                    <Link to='/newuser' className='menu-bars'>
                                        <Ri.RiUserAddFill />
                                        <span>Novo User</span>
                                    </Link>
                                </li>
                                <li className='nav-text'>
                                    <Link onClick={() => dispatch({ type: 'LOGOUT' })} className='menu-bars login'>
                                        <Ri.RiLogoutBoxRFill />
                                        <span>Sair</span>
                                    </Link>
                                </li>
                            </>
                            :
                            <>
                                <li className='nav-text'>
                                    <Link to='/login' className='menu-bars'>
                                        <Ri.RiLoginBoxFill />
                                        <span>Login</span>
                                    </Link>
                                </li>
                                
                            </>

                    }


                </ul>
            </nav></IconContext.Provider >

    )
}

export default Navbar
