import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import { useAuth } from "../utils/Auth";
import { Dialog } from '@headlessui/react'
import Login from "./Login"
import { Menu } from '@headlessui/react'

export default function Header() {
    const [isNavToggled, toggleNav] = useState(false);
    const router = useRouter();
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [userPanel, toggleUserPanel] = useState<boolean>(false)

    return (
        <header
            className="relative flex justify-between items-center mx-4 my-3 lg:mx-24 lg:my-6 
            font-darker_grotesque lg:text-1xl tracking-wide text-primary-900"
        >
            <Link href="/" className="text-xl">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    enableBackground="new 0 0 483.5 484.7"
                    version="1.1"
                    viewBox="0 0 483.5 484.7"
                    xmlSpace="preserve"
                    fill="currentColor"
                    className="w-14 h-14"
                    >
                    <path d="M85.1 1.2L44.6 86.4h-4.1L0 1.2h17.8L42.6 55 67.3 1.2h17.8zM204.8 70.6v14.6h-58.1v-84h57.6v14.7H163v22.4h36.5V53H163v17.7h41.8zM307.6 61.1h-13.4v24.1h-16.3v-84h32.2c18.8 0 31.8 12.4 31.8 29.9 0 12.8-6.8 22.7-17.6 27.3l20.4 26.9h-19l-18.1-24.2zm-13.4-14.8h14.6c9.6 0 16.3-6.2 16.3-15.3 0-8.8-6.6-15.1-16.3-15.1h-14.6v30.4zM394.9 43.3C394.9 19 413.5 0 439.2 0c25.7 0 44.2 19 44.2 43.3 0 24.6-18.8 43.1-44.2 43.1-25.4 0-44.3-18.5-44.3-43.1zm72.2 0c0-16.1-11.6-28.3-27.8-28.3-16.3 0-27.8 12.2-27.8 28.3 0 16.3 11.7 28.2 27.8 28.2s27.8-12 27.8-28.2zM78.6 134v85H74l-54.6-53.8V218H3.1v-84.9h4.7L62.4 187v-53h16.2zM165.5 134h16.3v84h-16.3v-84zM271.4 176c0-24.7 18.9-43.1 44.7-43.1 11.5 0 21 3.6 28.2 9.3l-7.5 13.1c-5.7-5.1-12.4-7.5-20.2-7.5-16.9 0-28.7 12.1-28.7 28.2 0 16.3 11.8 28.3 28.7 28.3 8 0 14.8-2.6 20.2-7.5l7.5 13.1c-7.2 5.7-16.7 9.3-28.2 9.3-25.9 0-44.7-18.4-44.7-43.2zM459.1 202.8h-36.3L416 218h-17.6l40.9-85.2h3.3l40.9 85.2h-17.6l-6.8-15.2zm-6.1-13.2l-12.1-26.9-12.2 26.9H453z"></path>
                    <g>
                        <path d="M79 350.8L75.8 274l-34.3 77.1h-1.3L5.9 274l-3.2 76.9H.2l3.5-84h1.4L40.8 347l35.6-80.1h1.4l3.5 84H79zM154.1 269.1v41.2h40.4v2.3h-40.4v36H203v2.3h-51.3v-84H203v2.3h-48.9zM339.4 269.1h-29.9v81.8h-2.4v-81.8h-29.9v-2.3h62.2v2.3zM419.7 269.1v41.2h40.4v2.3h-40.4v36h48.9v2.3h-51.3v-84h51.3v2.3h-48.9zM74.3 481.4v2.3H23.1v-84h2.4v81.8h48.8zM172.4 399.6h2.4v84h-2.4v-84zM273.3 441.6c0-24.6 18.4-43.1 42.9-43.1 9.6 0 19.4 2.7 25.8 7.4l-1.3 2.2c-6.6-4.8-15.8-7.2-24.6-7.2-22.9 0-40.3 17.6-40.3 40.8 0 23.2 17.3 40.8 40.3 40.8 8.8 0 18.5-2.6 24.6-7.2l1.3 2.2c-6.5 4.7-16.3 7.4-25.8 7.4-24.5-.2-42.9-18.7-42.9-43.3zM396.3 441.7c0-24 17.9-43.1 42.9-43.1s42.9 19.1 42.9 43.1c0 24.6-17.9 43-42.9 43s-42.9-18.4-42.9-43zm83.3 0c0-22.6-17.8-40.8-40.4-40.8-22.6 0-40.4 18.2-40.4 40.8 0 23.8 17.8 40.6 40.4 40.6 22.6 0 40.4-16.8 40.4-40.6z"></path>
                    </g>
                </svg>
            </Link>
            <nav className="flex gap-4">
                <button
                    className={`btn_one ${
                        isNavToggled ? "open" : "not_open"
                    } lg:hidden`}
                    onClick={() => toggleNav(!isNavToggled)}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>
                <div className={`navbar ${isNavToggled ? "open" : ""} flex gap-2 lg:gap-6`}>
                    <ul
                        className="flex flex-col gap-2 lg:px-0 lg:flex-row lg:gap-6"
                        role="list"
                        aria-label="Navegación Primaria"
                    >
                        <Link
                            href="/sobre-mi"
                            className={`hover:text-primary-700 ${
                                router.pathname == "/sobre-mi"
                                    ? "underline underline-offset-6"
                                    : ""
                            }`}
                        >
                            <li>Sobre mí</li>
                        </Link>
                        <Link
                            href="/obra"
                            className={`hover:text-primary-700 ${
                                router.pathname == "/obra"
                                    ? "underline underline-offset-6"
                                    : ""
                            }`}
                        >
                            <li>Obra</li>
                        </Link>
                        <Link
                            href="/invitados"
                            className={`hover:text-primary-700 ${
                                router.pathname == "/invitados"
                                    ? "underline underline-offset-6"
                                    : ""
                            }`}
                        >
                            <li>Invitados</li>
                        </Link>
                        <a
                            href="#"
                            className={`hover:text-primary-700 ${
                                router.pathname == "/escritura-grupal"
                                    ? "underline underline-offset-6"
                                    : ""
                            }`}
                        >
                            <li>Escritura grupal</li>
                        </a>
                        <Link
                            href="/contacto"
                            className={`hover:text-primary-700 ${
                                router.pathname == "/contacto"
                                    ? "underline underline-offset-6"
                                    : ""
                            }`}
                        >
                            <li>Contacto</li>
                        </Link>
                    </ul>
                </div>
                {user
                    ?
                        <Menu>
                            <div className="flex flex-col my-auto items-center self-start">
                                <Menu.Button>
                                    <button className="items-center gap-1 self-start hover:text-primary-700 hidden lg:flex" onClick={() => toggleUserPanel(!userPanel)}>
                                        <span className="mb-1">{user.displayName}</span>
                                        <svg fill="currentColor" className="h-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
                                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                                        </svg>
                                    </button>
                                    <svg className="h-5 lg:hidden" fill="currentColor"  xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                                    </svg>
                                </Menu.Button>
                                {userPanel &&
                                    <Menu.Items className="absolute bottom-0 top-14 shadow-xl z-10">
                                        <Menu.Item>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => logout()}
                                                    className={`${active && 'hover:text-primary-700'}`}>
                                                    Salir
                                                </button>
                                            )}
                                        </Menu.Item>
                                    </Menu.Items>}
                            </div>
                        </Menu>
                    : <button className="hover:text-primary-700 self-start" onClick={() => setIsOpen(true)}>Entrar</button>}
            </nav>

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto bg-white p-14">
                        <Login />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </header>
    );
}
