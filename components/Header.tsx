import Link from "next/link";
import { useEffect, useState } from "react";
import { useAuth } from "../utils/Auth";
import { Dialog } from "@headlessui/react";
import Login from "./Login";
import { Menu } from "@headlessui/react";
import { Notification } from "../types/Notification";
import { useComments } from "../utils/Comments"

import {
    getFirestore,
    collection,
    onSnapshot,
    query,
} from "firebase/firestore";
import { initializeFirebase } from "../utils/Firebase";
import { Unsubscribe } from "firebase/auth";

export default function Header() {
    const [isNavToggled, toggleNav] = useState(false);
    const { user, logout } = useAuth();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [userPanel, toggleUserPanel] = useState<boolean>(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const { deleteNotification } = useComments();

    const dayjs = require("dayjs");
    const relativeTime = require("dayjs/plugin/relativeTime");
    require("dayjs/locale/es");
    dayjs.extend(relativeTime);

    const app = initializeFirebase();
    const db = getFirestore(app);

    useEffect(() => {
        let unsubscribe: Unsubscribe | false = false;

        if (user) {
            setIsOpen(false);
            
            const q = query(
                collection(db, "users", user.uid, "notifications")
            );
            unsubscribe = onSnapshot(q, (notiQuery) => {
                setNotifications(
                    notiQuery.docs.map((n) => {
                        let notification = n.data();
                        notification.id = n.id;
                        return notification as Notification;
                    })
                );
            });
        }

        return () => {unsubscribe && unsubscribe()}
    }, [user]);

    return (
        <header
            className="relative flex justify-between items-center px-4 my-3 
            tracking-wide text-primary-900 md:my-6 md:px-10 lg:px-14 xl:px-24"
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
                    className="w-12 h-12 md:w-14 md:w-14"
                >
                    <path d="M85.1 1.2L44.6 86.4h-4.1L0 1.2h17.8L42.6 55 67.3 1.2h17.8zM204.8 70.6v14.6h-58.1v-84h57.6v14.7H163v22.4h36.5V53H163v17.7h41.8zM307.6 61.1h-13.4v24.1h-16.3v-84h32.2c18.8 0 31.8 12.4 31.8 29.9 0 12.8-6.8 22.7-17.6 27.3l20.4 26.9h-19l-18.1-24.2zm-13.4-14.8h14.6c9.6 0 16.3-6.2 16.3-15.3 0-8.8-6.6-15.1-16.3-15.1h-14.6v30.4zM394.9 43.3C394.9 19 413.5 0 439.2 0c25.7 0 44.2 19 44.2 43.3 0 24.6-18.8 43.1-44.2 43.1-25.4 0-44.3-18.5-44.3-43.1zm72.2 0c0-16.1-11.6-28.3-27.8-28.3-16.3 0-27.8 12.2-27.8 28.3 0 16.3 11.7 28.2 27.8 28.2s27.8-12 27.8-28.2zM78.6 134v85H74l-54.6-53.8V218H3.1v-84.9h4.7L62.4 187v-53h16.2zM165.5 134h16.3v84h-16.3v-84zM271.4 176c0-24.7 18.9-43.1 44.7-43.1 11.5 0 21 3.6 28.2 9.3l-7.5 13.1c-5.7-5.1-12.4-7.5-20.2-7.5-16.9 0-28.7 12.1-28.7 28.2 0 16.3 11.8 28.3 28.7 28.3 8 0 14.8-2.6 20.2-7.5l7.5 13.1c-7.2 5.7-16.7 9.3-28.2 9.3-25.9 0-44.7-18.4-44.7-43.2zM459.1 202.8h-36.3L416 218h-17.6l40.9-85.2h3.3l40.9 85.2h-17.6l-6.8-15.2zm-6.1-13.2l-12.1-26.9-12.2 26.9H453z"></path>
                    <g>
                        <path d="M79 350.8L75.8 274l-34.3 77.1h-1.3L5.9 274l-3.2 76.9H.2l3.5-84h1.4L40.8 347l35.6-80.1h1.4l3.5 84H79zM154.1 269.1v41.2h40.4v2.3h-40.4v36H203v2.3h-51.3v-84H203v2.3h-48.9zM339.4 269.1h-29.9v81.8h-2.4v-81.8h-29.9v-2.3h62.2v2.3zM419.7 269.1v41.2h40.4v2.3h-40.4v36h48.9v2.3h-51.3v-84h51.3v2.3h-48.9zM74.3 481.4v2.3H23.1v-84h2.4v81.8h48.8zM172.4 399.6h2.4v84h-2.4v-84zM273.3 441.6c0-24.6 18.4-43.1 42.9-43.1 9.6 0 19.4 2.7 25.8 7.4l-1.3 2.2c-6.6-4.8-15.8-7.2-24.6-7.2-22.9 0-40.3 17.6-40.3 40.8 0 23.2 17.3 40.8 40.3 40.8 8.8 0 18.5-2.6 24.6-7.2l1.3 2.2c-6.5 4.7-16.3 7.4-25.8 7.4-24.5-.2-42.9-18.7-42.9-43.3zM396.3 441.7c0-24 17.9-43.1 42.9-43.1s42.9 19.1 42.9 43.1c0 24.6-17.9 43-42.9 43s-42.9-18.4-42.9-43zm83.3 0c0-22.6-17.8-40.8-40.4-40.8-22.6 0-40.4 18.2-40.4 40.8 0 23.8 17.8 40.6 40.4 40.6 22.6 0 40.4-16.8 40.4-40.6z"></path>
                    </g>
                </svg>
            </Link>
            <nav className="flex gap-4 justify-center items-center">
                <button
                    onClick={() => toggleNav(!isNavToggled)}
                    className={`hamburger hamburger__squeeze ${isNavToggled ? "is_active" : ""} lg:hidden`}
                    type="button"
                >
                    <span className="hamburger_box">
                        <span className="hamburger_inner"></span>
                    </span>
                </button>
                <div
                    className={`navbar ${
                        isNavToggled ? "open" : ""
                    } flex gap-2 lg:gap-6`}
                >
                    <ul
                        className="flex flex-col gap-2 lg:px-0 lg:flex-row lg:gap-4 px-4 md:px-10"
                        role="list"
                        aria-label="Navegación Primaria"
                    >
                        <li>
                            <Link
                                href="/sobre-mi"
                                className="hover:text-primary-700"
                            >
                                Sobre mí
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/obra"
                                className="peer flex items-center gap-1 hover:text-primary-700"
                            >
                                <span>Obra</span>
                                <svg
                                    fill="currentColor"
                                    className="h-3 hidden lg:block"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 512 512"
                                >
                                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                                </svg>
                            </Link>
                            <ul className="flex flex-col gap-2 ml-4 pt-2 lg:ml-0 lg:absolute lg:hidden lg:peer-hover:flex lg:hover:flex">
                                <li>
                                    <Link
                                        className="hover:text-primary-700"
                                        href="/cuentos"
                                    >
                                        Cuentos
                                    </Link>
                                </li>
                                <li>
                                    <Link
                                        className="hover:text-primary-700"
                                        href="/reflexiones"
                                    >
                                        Reflexiones
                                    </Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link
                                href="/invitados"
                                className="hover:text-primary-700"
                            >
                                Invitados
                            </Link>
                        </li>
                        <li>
                            <a href="#" className="hover:text-primary-700">
                                Escritura grupal
                            </a>
                        </li>
                        <li>
                            <Link
                                href="/contacto"
                                className="hover:text-primary-700"
                            >
                                Contacto
                            </Link>
                        </li>
                        </ul>
                </div>
                {user ? (
                    <Menu>
                        <Menu.Button
                            className="flex items-center justify-center"
                            onClick={() => { toggleUserPanel(!userPanel); toggleNav(false)}}
                        >
                            <svg
                                className="h-5"
                                fill="currentColor"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                                />
                            </svg>
                            {notifications && notifications.length > 0 &&
                                <span className="flex absolute h-1.5 w-1.5 mt-1.5 ml-1.5">
                                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-500 opacity-75"></span>
                                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                                </span>}
                        </Menu.Button>
                        <Menu.Items
                            className="absolute flex flex-col items-center justify-center rounded-md 
                                            top-14 right-0 border border-neutral-200 overflow-hidden shadow-lg z-20 
                                            bg-neutral-100 mx-4 md:mx-10 lg:mx-14 xl:mx-24 sm:min-w-96 max-w-full"
                        >
                            <Menu.Item>
                                <span className="py-1 bg-neutral-300 font-bold px-4 w-full">{user.displayName}</span>
                            </Menu.Item>
                            <Menu.Item>
                                <div className="flex flex-col max-h-96 overflow-y-scroll w-full">
                                    {notifications &&
                                        notifications.length > 0 ?
                                        notifications
                                            .sort((a, b) =>
                                                a.publishDate < b.publishDate
                                                    ? 1
                                                    : b.publishDate <
                                                      a.publishDate
                                                    ? -1
                                                    : 0
                                            )
                                            .map((noti) => (
                                                <div
                                                    className="flex flex-col border-b border-neutral-200 gap-1 hover:bg-neutral-200"
                                                    key={noti.commentId}
                                                >
                                                    <div className="flex justify-between items-top gap-4 px-4 pt-4">
                                                        <span className="text-neutral-500 font-light text-sm">
                                                            {dayjs(
                                                                noti.publishDate
                                                            )
                                                                .locale("es")
                                                                .fromNow()}
                                                        </span>
                                                        <button className="flex hover:text-primary-700" onClick={() => deleteNotification(noti.commentId)}>
                                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                    <Link  
                                                        href={`/obra/${noti.post}#${noti.commentId}`}
                                                        onClick={() => deleteNotification(noti.commentId)}
                                                        className="flex flex-col gap-1 group px-4 pb-4">
                                                            <span className="font-bold text-md max-w-xs text-primary-900 group-hover:text-primary-700">
                                                                {noti.notification}
                                                            </span>
                                                            <p className="text-neutral-500 text-sm">
                                                                {noti.comment}
                                                            </p>
                                                    </Link>
                                                </div>
                                            )) : <span className="py-6 px-4 mx-auto">No hay notificaciones</span>}
                                </div>
                            </Menu.Item>

                            <Menu.Item>
                                <div
                                    className="flex justify-center bg-neutral-800 text-lg w-full 
                                                text-white font-bold hover:bg-neutral-700"
                                >
                                    <button
                                        className="w-full py-2"
                                        onClick={() => logout()}
                                    >
                                        Salir
                                    </button>
                                </div>
                            </Menu.Item>
                        </Menu.Items>
                    </Menu>
                ) : (
                    <button
                        className="hover:text-primary-700 flex items-center"
                        onClick={() => setIsOpen(true)}
                    >
                        <svg
                            className="h-5"
                            fill="currentColor"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z"
                            />
                        </svg>
                    </button>
                )}
                
            </nav>

            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />

                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="flex flex-col mx-auto bg-white p-8">
                        <button
                            className="ml-auto hover:text-primary-700"
                            onClick={() => setIsOpen(false)}
                        >
                            <svg
                                className="w-6 h-6"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                        <Login />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </header>
    );
}
