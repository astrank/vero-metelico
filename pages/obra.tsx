import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Link from "next/link";
import { Post } from "../types/Post";
import { Category } from "../types/Category";
import { NextPage } from "next";
import { useEffect, useState } from "react";

type ObraProps = {
    posts: Post[],
    categories: Category[],
}

const Obra: NextPage<ObraProps> = ({ posts, categories }) => {
    const [visiblePosts, editPosts] = useState<Post[]>(posts);

    useEffect(() => {
        console.log(posts[0].category === categories[1].name)
    }, [])

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

            <div className="flex flex-col gap-8 text-primary-900 mx-4 my-12 lg:mx-44 mb-auto">
                <div className="flex gap-6">
                    <button 
                        key="All"
                        onClick={() => editPosts(posts)}
                        className="bg-secondary-400 font-darker_grotesque text-md px-5 lg:text-xl md:px-6 py-2 hover:bg-secondary-200">
                            Todo
                    </button>
                    {categories && categories.length > 0 &&
                        categories.map(category => (
                            <button 
                                key={category.name}
                                onClick={() => editPosts(posts.filter(post => post.category === category.name))}
                                className="bg-secondary-400 font-darker_grotesque text-md px-5 lg:text-xl md:px-6 py-2 hover:bg-secondary-200">
                                    {category.name}
                            </button>
                        ))}
                </div>
                <div className="flex flex-col gap-10 my-6">
                    {visiblePosts && visiblePosts.length > 0 && 
                        visiblePosts.map((post, i) => (
                            <div key={i} className="group flex flex-col gap-3">
                                <Link href={`/obra/${post.slug}`} className="self-start">
                                    <h2 className="font-asap text-2xl group-hover:text-primary-700">{post.title}</h2>
                                </Link>
                                <Link href={`/obra/${post.slug}`}>
                                    <p className="font-roboto text-md text-primary-700 leading-8">
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

    const categories = await import("../public/data/categories.json").then(
        (res) => res.default
    );

    return {
        props: { posts, categories },
    };
};

export default Obra;
