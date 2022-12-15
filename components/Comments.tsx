import { getFirestore, collection, addDoc, onSnapshot, doc, query, arrayUnion, arrayRemove, deleteDoc, updateDoc } from "firebase/firestore";
import { initializeFirebase } from "../utils/Firebase";
import { getDatabase, set, ref, onValue } from "firebase/database";
import { useAuth } from "../utils/Auth";
import { useEffect, useState } from "react";
import { Comment } from "../types/Comment";
import CommentComponent from "./Comment";
import { Dialog } from '@headlessui/react'
import Dialoga from "./Login"

type CommentsProps = {
    slug: string;
}

const Comments = ({ slug }: CommentsProps) => {
    const app = initializeFirebase();
    const firestore = getFirestore(app);
    const db = getDatabase(app);
    const { user, isAdmin } = useAuth();
    const uid = "7NXk8PiCwggyA5vWYdJT5lVTxg22";

    const [isOpen, setIsOpen] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [newComment, writeNewComment] = useState<string>("");

    useEffect(() => {
        if (user) {
            setIsOpen(false);
        }
    }, [user])

    // Get all comments of post
    useEffect(() => {
        const q = query(collection(firestore, "posts", slug, "comments"));
        onSnapshot(q, (commentsQuery) => {
            setComments(commentsQuery.docs.map((c) => {
                let comment = c.data();
                comment.id = c.id;
                return comment as Comment
            }));
        });
    }, [])

    const postComment = async (comment: string) => {
        try {
            const docRef = await addDoc(collection(firestore, "posts", slug, "comments"), {
                userId: user.uid,
                author: user.displayName,
                comment: comment,
                post: `${slug}`,
                publishDate: Date.now(),
                likes: [],
                reply: false,
                parent: false,
                replies: [],
            });
            
            set(ref(db, `notifications/${user.uid}`), {
                type: `Nuevo comentario de ${user.displayName}`,
                comment: comment,
                post: slug
            })

            const notiRef = await addDoc(collection(firestore, "notifications", uid, "comment"), {
                type: "new-comment",
                authorId: user.uid,
                author: user.displayName,
                comment: comment,
                commentId: docRef.id,
                post: `${slug}`,
                publishDate: Date.now(),
                watched: false,
            });

            writeNewComment("");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const deleteComment = async (id: string) => {
        await deleteDoc(doc(firestore, "posts", slug, "comments", id))
    };

    const likeComment = async (comment: Comment) => {
        if(!comment.likes.includes(user.uid)) {
            await updateDoc(doc(firestore, "posts", slug, "comments", comment.id), {
                likes: arrayUnion(user.uid)
            });
        } else {
            await updateDoc(doc(firestore, "posts", slug, "comments", comment.id), {
                likes: arrayRemove(user.uid)
            });
        }
    };

    return (
        <div className='mt-8 mb-10 text-primary-900 lg:mt-20'>
            <span className='mt-8 font-bold'>Comentarios ({comments?.length})</span>
            <div className='flex flex-col gap-6 my-6'>
                <textarea 
                    className='border border-primary-900 py-2 px-4 focus:outline-none' 
                    onChange={(e) => writeNewComment(e.target.value)} 
                    onClick={() => !user ? setIsOpen(true) : ""}
                    placeholder={user ? `Comenta como ${user.displayName}` : `Ingresa para comentar`} />
                <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                    {/* Overlay */}
                    <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                    
                    <div className="fixed inset-0 flex items-center justify-center p-4">
                        <Dialog.Panel className="mx-auto bg-white p-14">
                            <Dialoga />
                        </Dialog.Panel>
                    </div>
                </Dialog>
                <button className='bg-secondary-400 font-darker_grotesque text-md px-5 lg:text-xl md:px-6 py-2 self-end hover:bg-secondary-200' onClick={() => postComment(newComment)} disabled={!user || newComment.length < 1}>Comment</button>
            </div>
            <div className="flex flex-col gap-6">
                {comments && comments.length > 0 &&
                    comments
                        .sort((a,b) => (a.publishDate > b.publishDate) ? 1 : ((b.publishDate > a.publishDate) ? -1 : 0))
                        .map(comment => !comment.reply && (
                            <CommentComponent
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
    )
}

export default Comments;