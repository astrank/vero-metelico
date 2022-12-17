import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Obra() {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Head>
                <title>Invitados | Verónica Metélico</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="flex flex-col gap-6 text-primary-900 mx-4 my-8 md:mx-10 lg:mx-14 xl:mx-44">
                <div className="flex flex-col gap-6 my-6">
                    <h1 className="font-asap text-3xl">Espacio para invitados</h1>
                    <p className="font-roboto font-light text-base text-primary-700 leading-8">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi at hic magni ipsa facilis accusamus maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima consectetur nostrum porro doloribus quis expedita dolorem, ab, veritatis dolores.</p>
                </div>
                <div className="group flex flex-col gap-3">
                    <Link href="#" className="self-start">
                        <h2 className="font-asap text-2xl group-hover:text-primary-700">Titulo titulo</h2>
                    </Link>
                    <Link href="#">
                        <p className="font-roboto font-light text-md text-primary-700 leading-8">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi at hic magni ipsa facilis accusamus maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima consectetur nostrum porro doloribus quis expedita dolorem, ab, veritatis dolores...</p>
                    </Link>
                    <Link className="flex gap-2 items-center justify-end text-sm text-secondary-600 hover:text-secondary-400" href="#">
                        <span>Seguir leyendo</span>
                        <svg className="w-4 h-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
                <div className="group flex flex-col gap-3">
                    <Link href="#" className="self-start">
                        <h2 className="font-asap text-2xl group-hover:text-primary-700">Titulo titulo</h2>
                    </Link>
                    <Link href="#">
                        <p className="font-roboto font-light text-md text-primary-700 leading-8">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi at hic magni ipsa facilis accusamus maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima consectetur nostrum porro doloribus quis expedita dolorem, ab, veritatis dolores...</p>
                    </Link>
                    <Link className="flex gap-2 items-center justify-end text-sm text-secondary-600 hover:text-secondary-400" href="#">
                        <span>Seguir leyendo</span>
                        <svg className="w-4 h-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                        </svg>
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    );
}