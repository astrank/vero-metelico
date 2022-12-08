import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { Post } from "../types/Post";
import { NextPage } from "next";

type ObraProps = {
    posts: Post[]
}

const Obra: NextPage<ObraProps> = ({ posts }) => {
    return (
        <div className="min-h-screen flex flex-col justify-between">
            <Head>
                <title>Obra | Verónica Metélico</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="flex flex-col gap-8 text-primary-900 mx-4 my-12 lg:mx-44 ">
                <div className="flex gap-6">
                    <button className="bg-secondary-400 font-darker_grotesque text-md font-bold px-5 lg:text-xl md:px-6 py-2 hover:bg-secondary-200">Cuentos</button>
                    <button className="bg-secondary-400 font-darker_grotesque text-md px-5 lg:text-xl md:px-6 py-2 hover:bg-secondary-200">Reflexiones</button>
                </div>
                <div className="flex flex-col gap-4 my-6">
                    {posts && posts.length > 0 && 
                        posts.map((post, i) => (
                            <div key={i} className="flex flex-col gap-6">
                                <Link href={`/obra/${post.slug}`} className="self-start">
                                    <h2 className="font-asap text-3xl">{post.title}</h2>
                                </Link>
                                <Link href={`/obra/${post.slug}`}>
                                    <p className="font-roboto text:md md:text-md text-primary-700 leading-8">
                                        {post.content
                                            .split(" ")
                                            .slice(0, 35)
                                            .join(" ")}...</p>
                                </Link>
                            </div>
                        ))}
                </div>
            </div>

            <Footer />
        </div>
    );
}

export const getStaticProps = async () => {
    const posts = await import("../public/data/posts.json").then(
        (res) => res.default
    );

    return {
        props: { posts },
        //revalidate: 60,
    };
};

export default Obra;
