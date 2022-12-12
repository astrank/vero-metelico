import Head from "next/head";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import posts from "../../public/data/posts.json";
import Link from "next/link";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Markdown from "react-markdown";
import Comments from "../../components/Comments";
import { Post } from "../../types/Post";

type ObraProps = {
    post: Post
}

const Obra: NextPage<ObraProps> = ({ post }) => {
    return (
        <div className="min-h-screen">
            <Head>
                <title>{`${post.title} | Verónica Metélico`}</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="flex flex-col gap-8 text-primary-900 mx-4 my-20 lg:mx-44">
                <Link href="/obra" className="flex gap-2 items-center font-darker_grotesque text-lg">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="h-3">
                        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                    </svg>
                    <span className="mb-1">Volver a Obra</span>
                </Link>
                <div className="flex flex-col gap-10 my-6">
                    <h1 className="font-asap text-3xl">{post.title}</h1>
                    <Markdown className="flex flex-col gap-6 font-roboto text:md md:text-lg text-primary-700 leading-8">
                        {post.content}
                    </Markdown>
                </div>
                <Comments post="post" />
            </div>

            <Footer />
        </div>
    );
}

export const getStaticProps: GetStaticProps = (context) => {
    return {
        props: {
            post: posts.find((post) => post.slug === context.params?.slug),
        },
    };
};

export const getStaticPaths: GetStaticPaths = () => {
    return {
        paths: posts.map((post) => ({ params: { slug: post.slug } })),
        fallback: false,
    };
};

export default Obra;