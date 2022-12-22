import Head from "next/head";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Instagram from "../components/Instagram";
import { Invitado } from "../types/Invitado"

type InvitadosProps = {
    invitados: Invitado[]
}

export default function Invitados({ invitados }: InvitadosProps) {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Head>
                <title>Invitados | Verónica Metélico</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
            </Head>

            <Header />

            <div className="flex flex-col gap-6 text-primary-900 mx-4 my-8 md:mx-10 lg:mx-14 xl:mx-44 mb-auto">
                <div className="flex flex-col gap-6 mb-6">
                    <h1 className="font-asap text-3xl">Espacio para invitados</h1>
                    <p className="font-roboto font-light text-base text-primary-700 leading-8 text-justify">Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi at hic magni ipsa facilis accusamus maxime. Lorem ipsum dolor sit amet consectetur adipisicing elit. Minima consectetur nostrum porro doloribus quis expedita dolorem, ab, veritatis dolores.</p>
                </div>
                {invitados.map(invitado => (
                    <div className="group flex flex-col gap-3" key={invitado.slug}>
                        <Link href={`/invitados/${invitado.slug}`} className="self-start">
                            <h2 className="font-asap text-2xl group-hover:text-primary-700 mb-2">{invitado.title}</h2>
                            <span>Autor: {invitado.author}</span>
                        </Link>
                        <Link href={`/invitados/${invitado.slug}`}>
                            <p className="font-roboto font-light text-md text-primary-700 leading-8 md:hidden text-justify">
                                {invitado.content
                                    .split(" ")
                                    .slice(0, 15)
                                    .join(" ")}...</p>
                            <p className="font-roboto font-light text-md text-primary-700 leading-8 hidden md:block text-justify">
                                {invitado.content
                                    .split(" ")
                                    .slice(0, 35)
                                    .join(" ")}...</p>
                        </Link>
                        <Link className="flex gap-2 items-center justify-end text-sm text-secondary-600 hover:text-secondary-400" href={`/invitados/${invitado.slug}`}>
                            <span>Seguir leyendo</span>
                            <svg className="w-4 h-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                            </svg>
                        </Link>
                    </div>
                ))}
            </div>

            <section className="mt-14">
                <Instagram />
            </section>

            <Footer />
        </div>
    );
}

export const getStaticProps = async () => {
    const invitados = await import("../public/data/invitados.json").then(
        (res) => res.default
    );

    return {
        props: { invitados },
    };
};