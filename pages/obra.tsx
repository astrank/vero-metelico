import { useEffect, useState } from "react";
import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Instagram from "../components/Instagram";

import { Post } from "../types/Post";
import { Category } from "../types/Category";

import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import { PortableText } from "@portabletext/react";

type ObraProps = {
    posts: Post[],
    categorias: Category[],
}

const Obra: NextPage<ObraProps> = ({ posts, categorias }) => {
    const [obras, setObras] = useState<Post[]>(posts);
    const [categoria, setCategoria] = useState<null | Category>(null);
    const [visiblePosts, setVisiblePosts] = useState<number>(8);

    const router = useRouter()
    const query = router.query.q;

    useEffect(() => {
        if(!router.isReady) return;
        // if query is a string
        if(query !== undefined && !Array.isArray(query)){
            // loop through categories to find one that match the query
            categorias?.map((c) => {
                if(query == c.nombre_plural || query == c.nombre_singular){
                    setCategoria(c);
                    setObras(posts.filter(p => p.categoria.nombre_singular === c.nombre_singular))
                }
            })
        } else {
            setObras(posts);
            setCategoria(null);
        }
    }, [router])
    
    const showMorePosts = () => {
        setVisiblePosts(visiblePosts + 8)
    }

    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Head>
                <title>{`${categoria ? categoria.nombre_plural : "Obra"} | Verónica Metélico`}</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
            </Head>

            <Header categorias={categorias} />

            <div className="flex flex-col gap-6 text-primary-900 mx-4 my-8 md:mx-10 lg:mx-14 xl:mx-44 mb-auto">
                <h1 className="font-asap text-3xl">{categoria ? categoria.nombre_plural : "Últimas publicaciones"}</h1>
                <div className="flex flex-col gap-4 my-6">
                    {obras && obras.length > 0 && 
                        obras
                            .sort((p1, p2) => Date.parse(p2.fecha) - Date.parse(p1.fecha))
                            .slice(0, visiblePosts)
                            .map((obra, i) => (
                                <Link href={`/obra/${obra.slug.current}`} key={i} className="group flex flex-col gap-3">
                                    <h2 className="self-start font-asap text-2xl group-hover:text-primary-700">{obra.titulo}</h2>
                                    <div className="font-roboto font-light text-md text-primary-700 leading-8 text-justify">
                                        <PortableText value={obra.introduction} />
                                    </div>
                                    <div className="flex gap-2 items-center self-end text-sm text-secondary-600 hover:text-secondary-400">
                                        <span>Seguir leyendo</span>
                                        <svg className="w-4 h-4 mt-0.5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                                        </svg>
                                    </div>
                                </Link>
                        ))}
                    {visiblePosts < obras.length && <button
                        className="peer flex self-center items-center gap-1 mt-6 text-secondary-600 hover:text-secondary-400"
                        onClick={() => showMorePosts()}
                    >
                        <span>Mostrar más</span>
                        <svg
                            fill="currentColor"
                            className="h-3"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 512 512"
                        >
                            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                        </svg>
                    </button>}
                </div>
            </div>

            <section className="mt-14">
                <Instagram />
            </section>

            <Footer />
        </div>
    );
}

export const getStaticProps = async () => {
    const posts_q = groq`*[_type == "obra" && !(_id in path('drafts.**'))]{
        titulo,
        slug,
        introduction,
        cuerpo,
        fecha,
        categoria->{
            nombre_plural,
            nombre_singular
        }
    }`;
    const categorias_q = groq`*[_type == "categoria" && !(_id in path('drafts.**'))]{
        nombre_plural,
        nombre_singular
    }`;

    const posts = await client.fetch(posts_q);
    const categorias = await client.fetch(categorias_q);

    return { props: { 
        posts: posts,
        categorias: categorias
    } };
};

export default Obra;
