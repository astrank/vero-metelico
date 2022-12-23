import type { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

const Home: NextPage = () => {
    const [isNavToggled, toggleNav] = useState(false);

    return (
        <>
            <Head>
                <title>Verónica Metélico</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
            </Head>

            <div className="flex flex-col-reverse md:grid md:grid-cols-2 h-screen text-primary-900">
                <div className="relative h-full">
                    <Image
                        src="/veronica-metelico.webp"
                        fill
                        priority
                        alt="Imagen de Verónica"
                        className="object-cover object-top"
                    />
                </div>
                <div className="flex flex-col justify-center items-center mx-10 my-8 gap-10 md:relative md:justify-between md:mx-0">
                    <nav className="tracking-wide flex w-full justify-end lg:justify-center">
                        <button
                            onClick={() => toggleNav(!isNavToggled)}
                            className={`hamburger hamburger__squeeze ${isNavToggled ? "is_active" : ""} md:px-8 lg:hidden`}
                            type="button"
                        >
                            <span className="hamburger_box">
                                <span className="hamburger_inner"></span>
                            </span>
                        </button>
                        <div className={`navbar ${isNavToggled ? "open" : ""} flex gap-2 lg:gap-6`}>
                            <ul
                                className="flex flex-col justify-center gap-2 text-start px-4 md:px-8 lg:flex-row lg:text-start lg:gap-6"
                                role="List"
                                aria-label="Barra de Navegación"
                            >
                                <li>
                                    <Link href="/sobre-mi">
                                        Sobre mí
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/obra" className="hover:text-primary-700">Obra</Link>
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
                                    <Link href="/invitados" className="hover:text-primary-700">Invitados</Link>
                                </li>
                                <li>
                                    <Link href="/escritura-grupal" className="hover:text-primary-700">Escritura grupal</Link>
                                </li>
                                <li>
                                    <Link href="/contacto" className="hover:text-primary-700">Contacto</Link>
                                </li>
                            </ul>
                        </div>
                    </nav>
                    <div className="flex flex-col justify-center items-center gap-10">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0"
                            y="0"
                            enableBackground="new 0 0 483.5 179.1"
                            version="1.1"
                            viewBox="0 0 483.5 179.1"
                            xmlSpace="preserve"
                            fill="currentColor"
                            className="w-36 md:w-48 lg:w-72 hidden">
                            <path d="M63.4 25.1l-26.7 53h-2.5l-26.7-53h15.2l12.8 28.4 12.8-28.4h15.1zM130.2 54.5H91.7c1.8 7.1 8.5 11.4 16 11.4 6.5 0 11.1-2.4 14.3-5.7l5.6 10.4c-4.6 4.2-11.7 7-20.5 7-16.6 0-28.6-11.3-28.6-26.7 0-15 11.6-26.7 26.6-26.7 14.7 0 25.3 10.8 25.3 26.1 0 1-.1 2.8-.2 4.2zm-38.3-9.7h25.8c-.9-6.2-5.8-10.2-12.1-10.2-6.8.1-11.9 3.7-13.7 10.2zM177.9 24.5v13.2c-1.4-.8-3.9-1.3-5.9-1.3-6.7 0-10.8 3.3-13.2 7.6l-.1 32.5h-13.2V25.1H159l-.7 6h.1c3.4-4 8.5-7 15.1-7 1.4 0 3.2.1 4.4.4zM192.9 50.8c0-15.5 12.3-26.7 27.6-26.7 15.4 0 27.6 11.2 27.6 26.7 0 15.6-12.2 26.7-27.6 26.7-15.3 0-27.6-11-27.6-26.7zm41.9 0c0-8.7-6.5-14.6-14.2-14.6-7.6 0-14.2 5.9-14.2 14.6s6.6 14.6 14.2 14.6c7.7 0 14.2-5.9 14.2-14.6zM310.6 45.8v30.7h-13.3V46.6c0-6.4-3.9-10.6-9.7-10.6-5.2 0-9.1 2.9-11.1 7.6v32.8h-13.3V25.1h13.5l-.7 4.8h.3c3.3-3.6 8-5.8 14-5.8 12.4 0 20.3 8.8 20.3 21.7zM325.7 8.5c0-4.9 3.9-8.4 8.6-8.5 4.8-.1 8.8 3.6 8.8 8.5 0 5.2-4 8.7-8.8 8.7-4.8.1-8.6-3.6-8.6-8.7zm2.2 16.6h13.3v51.4h-13.3V25.1zM358.2 50.9c0-15.2 11.8-26.8 27.7-26.8 10 0 15.2 2.9 18.3 5.6l-5.6 11c-2.4-2.4-6.3-4.5-12.2-4.5-8.3 0-14.8 6.1-14.8 14.7 0 8.4 6.1 14.5 14.7 14.5 6 0 10.1-1.9 12.5-4.4l5.3 10.7c-2.9 2.5-8 5.8-18.2 5.8-16.2 0-27.7-11.5-27.7-26.6zM472.8 25.1v51.4h-13.6l.7-4.6h-.4c-3.1 3.3-7.7 5.6-14 5.6-14.3 0-26.2-11.4-26.2-26.7 0-15.3 11.9-26.7 26.2-26.7 6.3 0 10.9 2.3 14 5.6h.4l-.7-4.6h13.6zm-13.4 33.5V43c-2.4-4.4-6.8-6.8-12.4-6.8-8.6 0-14.3 6.1-14.3 14.6s5.7 14.6 14.3 14.6c5.6 0 10-2.4 12.4-6.8zM67.9 178.1l-2.7-65.3L36 178.3h-1.1L5.7 112.8 3 178.1H1l2.9-71.4h1.2l30.4 68.1 30.3-68.1H67l2.9 71.4h-2zM93.5 108.6v35.1h34.3v1.9H93.5v30.6h41.6v1.9H91.5v-71.4h43.6v1.9H93.5zM194.4 108.6H169v69.5h-2v-69.5h-25.4v-1.9h52.8v1.9zM209.3 108.6v35.1h34.3v1.9h-34.3v30.6h41.6v1.9h-43.6v-71.4h43.6v1.9h-41.6zM311.2 176.2v1.9h-43.5v-71.4h2v69.5h41.5zM324.2 106.7h2v71.4h-2v-71.4zM343.6 142.4c0-20.9 15.6-36.7 36.5-36.7 8.1 0 16.5 2.3 21.9 6.3l-1.1 1.8c-5.6-4.1-13.4-6.1-20.9-6.1-19.5 0-34.2 14.9-34.2 34.7S360.5 177 380 177c7.5 0 15.8-2.2 20.9-6.1l1.1 1.8c-5.5 4-13.8 6.3-21.9 6.3-20.8.1-36.5-15.7-36.5-36.6zM409.6 142.5c0-20.4 15.2-36.7 36.5-36.7 21.2 0 36.5 16.3 36.5 36.7 0 20.9-15.2 36.6-36.5 36.6s-36.5-15.7-36.5-36.6zm70.8 0c0-19.2-15.1-34.7-34.3-34.7-19.2 0-34.3 15.4-34.3 34.7 0 20.2 15.1 34.6 34.3 34.6 19.1-.1 34.3-14.4 34.3-34.6z"></path>
                        </svg>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            x="0"
                            y="0"
                            enableBackground="new 0 0 483.5 155"
                            version="1.1"
                            viewBox="0 0 483.5 155"
                            xmlSpace="preserve"
                            fill="currentColor"
                            className="w-48 lg:w-72"
                            >
                            <path d="M63.4 1L36.7 54h-2.5L7.4 1h15.2l12.8 28.4L48.3 1h15.1zM205.5 30.4H167c1.8 7.1 8.5 11.4 16 11.4 6.5 0 11.1-2.4 14.3-5.7l5.6 10.4c-4.6 4.2-11.7 7-20.5 7-16.6 0-28.6-11.3-28.6-26.7 0-15 11.6-26.7 26.6-26.7 14.7 0 25.3 10.8 25.3 26.1 0 1-.1 2.9-.2 4.2zm-38.3-9.7H193c-.9-6.2-5.8-10.2-12.1-10.2-6.8.1-11.9 3.7-13.7 10.2zM328.4.4v13.2c-1.4-.8-3.9-1.3-5.9-1.3-6.7 0-10.8 3.3-13.2 7.6l-.1 32.5H296V1h13.5l-.7 6h.1c3.4-4 8.5-7 15.1-7 1.5 0 3.2.1 4.4.4zM418.7 26.7C418.7 11.2 431 0 446.4 0 461.8 0 474 11.2 474 26.7c0 15.6-12.2 26.7-27.6 26.7-15.4.1-27.7-11-27.7-26.7zm41.9 0c0-8.7-6.5-14.6-14.2-14.6-7.6 0-14.2 5.9-14.2 14.6s6.6 14.6 14.2 14.6c7.7.1 14.2-5.8 14.2-14.6zM67.9 154.1l-2.7-65.3L36 154.3h-1.1L5.7 88.7 3 154.1H1l2.9-71.4h1.2l30.4 68.1 30.3-68.1H67l2.9 71.4h-2zM93.5 84.6v35.1h34.3v1.9H93.5v30.6h41.6v1.9H91.5V82.6h43.6v1.9H93.5zM194.4 84.6H169v69.5h-2V84.6h-25.4v-1.9h52.8v1.9zM209.3 84.6v35.1h34.3v1.9h-34.3v30.6h41.6v1.9h-43.6V82.6h43.6v1.9h-41.6zM311.2 152.1v1.9h-43.5V82.6h2v69.5h41.5zM324.2 82.6h2V154h-2V82.6zM343.6 118.3c0-20.9 15.6-36.7 36.5-36.7 8.1 0 16.5 2.3 21.9 6.3l-1.1 1.8c-5.6-4.1-13.4-6.1-20.9-6.1-19.5 0-34.2 14.9-34.2 34.7 0 19.7 14.7 34.7 34.2 34.7 7.5 0 15.8-2.2 20.9-6.1l1.1 1.8c-5.5 4-13.8 6.3-21.9 6.3-20.8 0-36.5-15.8-36.5-36.7zM409.6 118.4c0-20.4 15.2-36.7 36.5-36.7 21.2 0 36.5 16.3 36.5 36.7 0 20.9-15.2 36.6-36.5 36.6s-36.5-15.7-36.5-36.6zm70.8 0c0-19.2-15.1-34.7-34.3-34.7-19.2 0-34.3 15.4-34.3 34.7 0 20.2 15.1 34.5 34.3 34.5 19.1 0 34.3-14.3 34.3-34.5z"></path>
                        </svg>
                        <span className="font-roboto font-light md:text-lg uppercase">Cuentos y Reflexiones</span>
                    </div>
                    <div className="hidden gap-10 items-center md:flex">
                        <ul className="flex gap-6" role="List" aria-label="Redes Sociales">
                            <li aria-label="Instagram">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    className="h-5"
                                    fill="currentColor"
                                >
                                    <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                                </svg>
                            </li>
                            <li aria-label="Facebook">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 320 512"
                                    fill="currentColor"
                                    className="h-5"
                                >
                                    <path d="M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z" />
                                </svg>
                            </li>
                            <li aria-label="TikTok">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 448 512"
                                    fill="currentColor"
                                    className="h-5"
                                >
                                    <path d="M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z" />
                                </svg>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Home;
