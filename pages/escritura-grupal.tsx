import Head from "next/head"
import Link from "next/link"
import Header from "../components/Header"
import Footer from "../components/Footer"
import { GroupWriting as EscrituraGrupalType } from "../types/GroupWriting"
import { Category } from "../types/Category";
import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import { CommentsProvider } from "../utils/Comments"

type EscrituraGrupalProps = {
    escrituras: EscrituraGrupalType[],
    categories: Category[]
}

export default function EscrituraGrupal({ categories }: EscrituraGrupalProps) {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Head>
                <title>Invitados | Verónica Metélico</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
            </Head>

            <Header categorias={categories} />

            <div className="flex flex-col gap-6 text-primary-900 mx-4 my-8 md:mx-10 lg:mx-14 xl:mx-44 mb-auto">
                <div className="flex flex-col gap-6 mb-6">
                    <h1 className="font-asap text-3xl">¡Manos a la obra!</h1>
                    <p className="font-roboto font-light text-base text-primary-700 leading-8 text-justify">Pagina en contrucción.</p>
                </div>

                {/* <div className="group flex flex-col gap-3">
                    {escrituras.map(escritura => (
                        <Link href={`escritura-grupal/${escritura.slug}`} key={escritura.slug}>
                            <h2 className="font-asap text-2xl group-hover:text-primary-700 mb-2">{escritura.title}</h2>
                        </Link>
                    ))}
                </div> */}
            </div>

            <Footer />
        </div>
    )
}

export const getStaticProps = async () => {
    const categorias_q = groq`*[_type == "categoria" && !(_id in path('drafts.**'))]{
        nombre_plural,
        nombre_singular
    }`;

    const categorias = await client.fetch(categorias_q);

    return { props: { 
        categorias: categorias
    } };
};