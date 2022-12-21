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
                    className="w-12 h-12 md:w-14 md:w-14 hidden"
                >
                    <path d="M85.1 1.2L44.6 86.4h-4.1L0 1.2h17.8L42.6 55 67.3 1.2h17.8zM204.8 70.6v14.6h-58.1v-84h57.6v14.7H163v22.4h36.5V53H163v17.7h41.8zM307.6 61.1h-13.4v24.1h-16.3v-84h32.2c18.8 0 31.8 12.4 31.8 29.9 0 12.8-6.8 22.7-17.6 27.3l20.4 26.9h-19l-18.1-24.2zm-13.4-14.8h14.6c9.6 0 16.3-6.2 16.3-15.3 0-8.8-6.6-15.1-16.3-15.1h-14.6v30.4zM394.9 43.3C394.9 19 413.5 0 439.2 0c25.7 0 44.2 19 44.2 43.3 0 24.6-18.8 43.1-44.2 43.1-25.4 0-44.3-18.5-44.3-43.1zm72.2 0c0-16.1-11.6-28.3-27.8-28.3-16.3 0-27.8 12.2-27.8 28.3 0 16.3 11.7 28.2 27.8 28.2s27.8-12 27.8-28.2zM78.6 134v85H74l-54.6-53.8V218H3.1v-84.9h4.7L62.4 187v-53h16.2zM165.5 134h16.3v84h-16.3v-84zM271.4 176c0-24.7 18.9-43.1 44.7-43.1 11.5 0 21 3.6 28.2 9.3l-7.5 13.1c-5.7-5.1-12.4-7.5-20.2-7.5-16.9 0-28.7 12.1-28.7 28.2 0 16.3 11.8 28.3 28.7 28.3 8 0 14.8-2.6 20.2-7.5l7.5 13.1c-7.2 5.7-16.7 9.3-28.2 9.3-25.9 0-44.7-18.4-44.7-43.2zM459.1 202.8h-36.3L416 218h-17.6l40.9-85.2h3.3l40.9 85.2h-17.6l-6.8-15.2zm-6.1-13.2l-12.1-26.9-12.2 26.9H453z"></path>
                    <g>
                        <path d="M79 350.8L75.8 274l-34.3 77.1h-1.3L5.9 274l-3.2 76.9H.2l3.5-84h1.4L40.8 347l35.6-80.1h1.4l3.5 84H79zM154.1 269.1v41.2h40.4v2.3h-40.4v36H203v2.3h-51.3v-84H203v2.3h-48.9zM339.4 269.1h-29.9v81.8h-2.4v-81.8h-29.9v-2.3h62.2v2.3zM419.7 269.1v41.2h40.4v2.3h-40.4v36h48.9v2.3h-51.3v-84h51.3v2.3h-48.9zM74.3 481.4v2.3H23.1v-84h2.4v81.8h48.8zM172.4 399.6h2.4v84h-2.4v-84zM273.3 441.6c0-24.6 18.4-43.1 42.9-43.1 9.6 0 19.4 2.7 25.8 7.4l-1.3 2.2c-6.6-4.8-15.8-7.2-24.6-7.2-22.9 0-40.3 17.6-40.3 40.8 0 23.2 17.3 40.8 40.3 40.8 8.8 0 18.5-2.6 24.6-7.2l1.3 2.2c-6.5 4.7-16.3 7.4-25.8 7.4-24.5-.2-42.9-18.7-42.9-43.3zM396.3 441.7c0-24 17.9-43.1 42.9-43.1s42.9 19.1 42.9 43.1c0 24.6-17.9 43-42.9 43s-42.9-18.4-42.9-43zm83.3 0c0-22.6-17.8-40.8-40.4-40.8-22.6 0-40.4 18.2-40.4 40.8 0 23.8 17.8 40.6 40.4 40.6 22.6 0 40.4-16.8 40.4-40.6z"></path>
                    </g>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    x="0"
                    y="0"
                    enableBackground="new 0 0 80.7 77"
                    version="1.1"
                    viewBox="0 0 80.7 77"
                    xmlSpace="preserve"
                    fill="currentColor"
                    className="w-12 h-12 md:w-10 md:w-10 hidden"
                    >
                    <path d="M80.7 0L42.2 77h-3.7L0 0h22l18.5 40.9L58.9 0h21.8z"></path>
                </svg>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="70"
                    height="70"
                    fill="none"
                    viewBox="0 0 70 70"
                    fill="currentColor"
                    className="w-12 h-12 md:w-14 md:w-14"
                    >
                    <path
                        fill="#38403D"
                        d="M6.755 67.287c-.192 0-.28-.087-.28-.245V55.37c0-.07.018-.122.07-.157a.373.373 0 01.21-.053h.14c.088 0 .158.018.21.053.053.035.07.087.07.157v11.305H12.6c.14 0 .21.088.21.245v.14c0 .157-.07.245-.21.245H6.755v-.018zM13.982 2.8c-.14-.087-.402-.175-.787-.175H12.04c-.385 0-.665.087-.857.158-.175.087-.316.244-.386.525L8.663 11.55h-.07L6.458 3.342c-.088-.297-.228-.507-.438-.577-.21-.07-.472-.14-.822-.14H3.973c-.403 0-.665.087-.805.175a.468.468 0 00-.21.403c0 .122.017.244.07.367.035.123.087.28.14.438l3.167 10.027c.123.35.28.595.473.682.192.105.49.158.875.158h1.802c.368 0 .665-.053.857-.158.193-.104.35-.332.473-.682L14 4.025c.053-.158.105-.298.14-.438.035-.122.053-.262.053-.385a.468.468 0 00-.21-.402zM29.768 11.9h-4.393V9.975h3.885c.473 0 .665-.21.665-.892v-.875c0-.683-.192-1.015-.665-1.015h-3.885V5.618h4.375c.473 0 .7-.245.7-.945v-.875c0-.683-.245-1.155-.7-1.155h-6.58c-.665 0-.945.35-.945.805v10.71c0 .455.263.56.945.56h6.598c.472 0 .682-.21.682-.91v-.876c0-.717-.227-1.032-.682-1.032zM39.392 14.665c.228.14.613.21 1.103.21h.437c.49 0 .858-.07 1.068-.21.227-.14.332-.315.332-.542v-3.448h.998c.227 0 .402.087.542.157.14.053.245.193.35.333.088.14.175.35.263.613l.752 2.45a.78.78 0 00.525.542c.245.07.595.123 1.033.123h.525c.455 0 .787-.036.98-.123.192-.07.297-.227.297-.473 0-.052 0-.122-.017-.192-.018-.07-.035-.158-.07-.263l-.893-2.747c-.192-.56-.367-.998-.595-1.295-.227-.298-.472-.49-.822-.578v-.07c.35-.07.805-.227 1.12-.472.315-.245.542-.578.717-.962.175-.403.245-.858.245-1.365 0-1.19-.367-2.153-1.102-2.748-.753-.63-1.855-.98-3.325-.98h-3.763c-.665 0-1.067.35-1.067.805v10.693c0 .227.14.42.367.542zM42.35 5.6h1.505c.385 0 .665.14.84.315.175.192.262.508.262.91 0 .42-.087.735-.262.928-.175.192-.455.297-.84.297H42.35V5.6zM61.093 14.963c1.942 0 3.412-.525 4.41-1.575.997-1.05 1.505-2.59 1.505-4.603 0-2.03-.508-3.57-1.505-4.602-.998-1.05-2.468-1.575-4.41-1.575-1.96 0-3.43.525-4.428 1.575-.997 1.05-1.505 2.59-1.505 4.602 0 2.03.508 3.57 1.505 4.602 1.015 1.05 2.485 1.575 4.428 1.575zm-1.89-8.628c.42-.525 1.05-.77 1.907-.77.858 0 1.488.263 1.89.77.403.508.613 1.33.613 2.45 0 1.103-.21 1.925-.613 2.45-.402.525-1.032.788-1.89.788-.857 0-1.487-.263-1.907-.788-.42-.525-.613-1.33-.613-2.45-.017-1.12.193-1.942.613-2.45zM13.685 20.37c-.228-.14-.56-.245-1.05-.245h-.245c-.49 0-.823.105-1.05.227-.228.123-.315.35-.315.596v4.147c0 .367-.018.753.017 1.172.018.403.035.736.07.963l-.07.017c-.087-.227-.262-.542-.507-.927s-.508-.77-.753-1.12L6.65 20.93c-.14-.21-.28-.367-.42-.455-.14-.105-.298-.21-.49-.245-.193-.035-.438-.088-.753-.088H4.55c-.49 0-.84.105-1.068.228a.64.64 0 00-.332.578V31.64c0 .227.105.42.332.542.228.14.578.21 1.068.21h.245c.49 0 .822-.07 1.032-.21.228-.14.298-.315.298-.542v-4.13c0-.368.017-.753 0-1.173a10.116 10.116 0 00-.07-.962l.087-.017c.088.227.263.524.525.91.245.384.508.77.77 1.172l3.115 4.235c.14.192.28.35.42.455.14.105.298.175.49.21.193.035.438.052.753.052h.42c.49 0 .822-.07 1.05-.21.227-.14.315-.315.315-.542V20.965c0-.245-.088-.473-.315-.595zM25.865 32.375h.438c.49 0 .822-.07 1.032-.21.227-.14.297-.315.297-.543V20.948c0-.228-.07-.456-.297-.578-.227-.14-.543-.245-1.033-.245h-.437c-.49 0-.84.105-1.05.245a.642.642 0 00-.315.578v10.674c0 .228.087.42.315.543.227.14.56.21 1.05.21zM48.457 29.715a2.4 2.4 0 00-.332-.595c-.123-.158-.263-.245-.42-.245-.088 0-.21.035-.368.087-.157.07-.367.14-.612.228a7.16 7.16 0 01-.84.227c-.315.07-.683.088-1.103.088-.612 0-1.12-.105-1.522-.297-.403-.193-.7-.525-.893-.998-.192-.473-.297-1.12-.297-1.943 0-.822.105-1.487.297-1.96.193-.472.49-.804.893-.997.402-.192.91-.28 1.522-.28.525 0 .98.035 1.348.122.367.088.665.158.892.245.228.088.403.123.543.123.122 0 .262-.087.385-.245a3.14 3.14 0 00.35-.595 5.69 5.69 0 00.262-.7c.07-.227.105-.42.105-.56a.489.489 0 00-.14-.35 1.082 1.082 0 00-.35-.262c-.245-.158-.56-.28-.962-.386a9.182 9.182 0 00-1.243-.245c-.437-.052-.84-.087-1.242-.087-1.995 0-3.483.525-4.515 1.575-1.015 1.05-1.523 2.59-1.523 4.602 0 2.03.508 3.57 1.523 4.603 1.015 1.05 2.52 1.575 4.497 1.575.368 0 .77-.035 1.19-.087.42-.07.823-.158 1.225-.263.403-.122.753-.245 1.033-.42.262-.158.437-.28.507-.385.07-.105.105-.245.105-.455 0-.105-.035-.262-.087-.473-.07-.192-.14-.42-.228-.647zM66.518 31.045l-3.168-10.01c-.122-.35-.28-.63-.472-.718-.193-.105-.49-.192-.875-.192H60.2c-.385 0-.665.087-.857.192-.193.105-.368.35-.473.7l-3.15 10.028c-.052.157-.087.297-.14.42-.035.14-.07.262-.07.367 0 .158.07.298.21.386.14.087.403.14.788.14h1.155c.385 0 .665-.053.84-.123.175-.087.297-.332.385-.63l.385-1.523h3.587l.368 1.523c.087.28.227.507.437.595.21.087.473.157.823.157h1.225c.402 0 .665-.052.805-.14a.439.439 0 00.21-.384c0-.123-.018-.245-.053-.368a5.443 5.443 0 01-.157-.42zm-6.563-3.57l.823-3.01c.052-.192.087-.332.14-.508.052-.192.087-.332.122-.507h.07c.035.175.07.367.123.543.052.192.087.297.14.472l.805 2.992h-2.223v.018zM13.598 37.625h-.14a.375.375 0 00-.21.07c-.053.035-.088.087-.14.157l-4.025 6.37c-.088.14-.175.28-.263.438-.087.158-.157.28-.192.385a3.116 3.116 0 00-.175-.367c-.088-.158-.175-.298-.263-.456l-4.095-6.37c-.052-.07-.087-.14-.14-.174a.375.375 0 00-.21-.07h-.14a.375.375 0 00-.21.07c-.052.035-.07.105-.07.175v11.742c0 .07.018.053.07.087.053.035.105-.017.21-.017h.14c.088 0 .175.053.21.017.053-.035.07-.017.07-.087V40.25v-.612c0-.21-.017-.403-.035-.613l.07-.035c.088.157.175.28.245.402.07.123.14.263.228.403l3.552 5.565c.07.123.14.193.193.245.052.053.14.07.262.07h.175c.123 0 .21-.035.263-.07.052-.052.122-.122.192-.245l3.483-5.53c.087-.122.175-.262.262-.42.088-.157.175-.297.228-.42l.07.035c-.018.21-.035.42-.053.613 0 .21-.035.402-.035.612v9.38c0 .07.053.052.088.087.035.035.14-.017.227-.017h.14c.088 0 .14.052.193.017.052-.035.052-.017.052-.087V37.888c0-.07 0-.14-.052-.175-.035-.053-.088-.088-.175-.088zM29.855 37.625h-6.142c-.193 0-.263.157-.263.315v11.602c0 .158.07.14.263.14h6.142c.14 0 .245.018.245-.14v-.14c0-.157-.105-.245-.245-.245H24.15v-5.25h5.163c.14 0 .262-.087.262-.244v-.14c0-.158-.122-.316-.262-.316H24.15v-4.9h5.705c.14 0 .245-.07.245-.245v-.14c0-.14-.105-.297-.245-.297zM43.225 49.63c0 .07.035.052.087.087.053.035.14-.017.228-.017h.14c.087 0 .14.052.192.017.053-.035.053-.017.053-.087V38.325h3.937c.14 0 .263-.07.263-.245v-.14c0-.157-.123-.315-.263-.315h-8.557c-.14 0-.298.157-.298.315v.14c0 .157.14.245.298.245h3.92V49.63zM64.855 38.325c.14 0 .245-.07.245-.245v-.14c0-.157-.105-.315-.245-.315h-6.142c-.193 0-.263.157-.263.315v11.602c0 .158.07.14.263.14h6.142c.14 0 .245.018.245-.14v-.14c0-.157-.105-.245-.245-.245H59.15v-5.25h5.163c.14 0 .262-.087.262-.244v-.14c0-.158-.122-.316-.262-.316H59.15v-4.9h5.705v.018zM26.163 55.125h-.14a.438.438 0 00-.228.07.215.215 0 00-.088.175v11.742c0 .07.035.053.088.088.052.035.122-.017.227-.017h.14c.088 0 .158.052.193.017.052-.035.052-.017.052-.088V55.37c0-.07-.017-.14-.052-.175-.035-.035-.088-.07-.192-.07zM48.23 65.713a.297.297 0 00-.105-.105c-.035-.035-.07-.035-.123-.035-.052 0-.175.052-.332.175a5.685 5.685 0 01-.665.42c-.28.157-.63.297-1.05.42-.42.122-.91.175-1.488.175-.91 0-1.662-.21-2.292-.63-.613-.42-1.085-1.033-1.4-1.855-.315-.823-.473-1.838-.473-3.046 0-1.19.158-2.204.49-3.01.333-.805.805-1.417 1.453-1.837.63-.402 1.417-.612 2.327-.612.7 0 1.278.07 1.733.227.472.157.84.315 1.102.472.263.158.455.228.525.228.035 0 .07-.018.105-.035l.088-.087a.282.282 0 00.07-.123c.017-.052.017-.087.017-.122 0-.053-.035-.123-.105-.175-.07-.07-.175-.14-.297-.21a4.212 4.212 0 00-.788-.368 6.999 6.999 0 00-1.102-.315 6.538 6.538 0 00-1.348-.123c-1.627 0-2.87.508-3.727 1.54-.858 1.033-1.278 2.555-1.278 4.568 0 2.03.42 3.57 1.26 4.603.84 1.05 2.048 1.575 3.658 1.575.367 0 .717-.035 1.067-.088a8.3 8.3 0 00.998-.263c.315-.105.595-.227.822-.35.28-.157.508-.297.665-.437.158-.123.245-.228.245-.315 0-.035 0-.07-.017-.105.017-.07 0-.123-.035-.157zM61.075 55.108c-1.628 0-2.87.507-3.728 1.54-.84 1.032-1.277 2.554-1.277 4.567 0 2.03.42 3.57 1.277 4.602.84 1.05 2.083 1.576 3.728 1.576s2.887-.525 3.745-1.576c.84-1.05 1.277-2.59 1.277-4.602 0-2.013-.42-3.535-1.277-4.568-.84-1.032-2.1-1.54-3.745-1.54zm3.185 10.22c-.718.944-1.785 1.4-3.185 1.4-1.383 0-2.45-.473-3.168-1.4-.717-.946-1.085-2.31-1.085-4.113 0-1.803.368-3.15 1.085-4.078.718-.927 1.785-1.382 3.168-1.382 1.4 0 2.467.455 3.185 1.383.717.927 1.085 2.275 1.085 4.077s-.35 3.185-1.085 4.112z"
                    ></path>
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
