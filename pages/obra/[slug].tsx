import { useEffect, useState } from "react";
import { GetStaticProps, GetStaticPaths, NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import Markdown from "react-markdown";
import posts from "../../public/data/posts.json";

import { Comment as CommentType } from "../../types/Comment";
import { Post } from "../../types/Post";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import CommentInput from "../../components/CommentInput";
import Comments from "../../components/Comments";

import { getFirestore, collection, onSnapshot, doc, query, arrayUnion, arrayRemove, deleteDoc, updateDoc } from "firebase/firestore";
import { initializeFirebase } from "../../utils/Firebase";
import { useAuth } from "../../utils/Auth";

type ObraProps = {
    post: Post
}

const Obra: NextPage<ObraProps> = ({ post }) => {
    const app = initializeFirebase();
    const firestore = getFirestore(app);
    const [comments, setComments] = useState<CommentType[]>([]);
    const { user, isAdmin } = useAuth();
    
    useEffect(() => {
        const q = query(collection(firestore, "posts", post.slug, "comments"));
        onSnapshot(q, (commentsQuery) => {
            setComments(commentsQuery.docs.map((c) => {
                let comment = c.data();
                comment.id = c.id;
                return comment as CommentType
            }));
        });
    }, [])

    const deleteComment = async (id: string) => {
        await deleteDoc(doc(firestore, "posts", post.slug, "comments", id))
    };

    const likeComment = async (comment: CommentType) => {
        if(!comment.likes.includes(user.uid)) {
            await updateDoc(doc(firestore, "posts", post.slug, "comments", comment.id), {
                likes: arrayUnion(user.uid)
            });
        } else {
            await updateDoc(doc(firestore, "posts", post.slug, "comments", comment.id), {
                likes: arrayRemove(user.uid)
            });
        }
    };

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

            <div className="flex flex-col gap-2 text-primary-900 my-10 mx-4 md:mx-10 lg:mx-14 lg:my-20 lg:mx-44">
                <Link href="/obra" className="flex gap-2 items-center text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512" fill="currentColor" className="h-3">
                        <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 278.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"/>
                    </svg>
                    <span>Volver a Obra</span>
                </Link>
                <div className="flex flex-col gap-10 my-6">
                    <h1 className="font-asap text-3xl">{post.title}</h1>
                    <Markdown className="flex flex-col gap-6 font-roboto text:md md:text-lg text-primary-700 leading-8">
                        {post.content}
                    </Markdown>
                </div>

                <span className='mt-8 font-bold'>Comentarios ({comments?.length})</span>
                <CommentInput slug={post.slug} title={post.title} />
                <div className="flex flex-col gap-6">
                    {comments && comments.length > 0 &&
                        comments
                            .sort((a,b) => (a.publishDate > b.publishDate) ? 1 : ((b.publishDate > a.publishDate) ? -1 : 0))
                            .map(comment => !comment.reply && (
                                <Comments
                                    key={comment.id}
                                    comment={comment}
                                    replies={comments.filter(c => c.reply && c.parent === comment.id) || []}
                                    user={user}
                                    isAdmin={isAdmin}
                                    deleteComment={deleteComment}
                                    likeComment={likeComment} />
                                ))}
                </div>
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