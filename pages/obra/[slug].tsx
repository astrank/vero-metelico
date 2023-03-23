import { useEffect } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useComments } from "../../utils/Comments";

import { Post } from "../../types/Post";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommentInput from "../../components/CommentInput";
import Comments from "../../components/Comments";

import { groq } from "next-sanity";
import { client } from "../../lib/sanity.client";
import {PortableText} from '@portabletext/react'
import { Category } from "../../types/Category";

type ObraProps = {
    post: Post,
    categorias: Category[]
}

const Obra: NextPage<ObraProps> = ({ post, categorias }) => {
    const { comments, getComments, unsubscribe } = useComments();

    useEffect(() => {
        getComments(post.slug.current);

        return () => {unsubscribe && unsubscribe()}
    }, [])

    return (
        <div className="min-h-screen max-w-screen overflow-hidden">
            <Head>
                <title>{`${post.titulo} | Verónica Metélico`}</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header categorias={categorias} />

            <div className="flex flex-col gap-2 text-primary-900 my-10 mx-4 md:mx-10 lg:mx-14 lg:my-20 lg:mx-44">
                <Link href="/obra" className="flex gap-2 items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="h-3">
                        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                    </svg>
                    <span>Volver a Obra</span>
                </Link>
                <div className="flex flex-col gap-10 my-6">
                    <h1 className="font-asap text-3xl">{post.titulo}</h1>
                    <div className="flex flex-col gap-6 font-roboto font-light leading-7 md:text-lg text-primary-700 text-justify md:leading-8">
                        <PortableText value={post.cuerpo} />
                    </div>
                </div>

                <span className='mt-8 font-bold'>Comentarios ({comments?.length})</span>
                <CommentInput slug={post.slug.current} title={post.titulo} />
                <div className="flex flex-col gap-6">
                    {comments && comments.length > 0 &&
                        comments
                            .sort((a,b) => (a.publishDate > b.publishDate) ? 1 : ((b.publishDate > a.publishDate) ? -1 : 0))
                            .map(comment => !comment.isReply && (
                                <Comments
                                    key={comment.id}
                                    comment={comment}
                                    replies={comments.filter(c => c.isReply && c.parent === comment.id) || []}/>
                                ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = async (context) => {
    const query = groq`*[
        _type == "obra" &&
        (slug.current in path("${context.params?.slug}")) &&
        !(_id in path('drafts.**'))]{
            titulo,
            slug,
            cuerpo,
            fecha,
    }`;
    const categorias_q = groq`*[_type == "categoria" && !(_id in path('drafts.**'))]{
        nombre_plural,
        nombre_singular
    }`;
    const post: Post[] = await client.fetch(query);
    const categorias = await client.fetch(categorias_q);

    return {
        props: {
            post: post[0],
            categorias: categorias
        },
    };
};

export const getStaticPaths: GetStaticPaths = async () => {
    const query = groq`*[_type == "obra" && !(_id in path('drafts.**'))]{
        slug,
    }`;
    const posts: Post[] = await client.fetch(query);

    return {
        paths: posts.map((post) => ({ params: { slug: post.slug.current } })),
        fallback: false,
    };
};

export default Obra;