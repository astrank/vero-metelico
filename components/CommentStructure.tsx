import Login from "./Login"
import { Comment } from "../types/Comment";
import { User } from "firebase/auth";
import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { getFirestore, collection, addDoc, onSnapshot, doc, query, arrayUnion, arrayRemove, deleteDoc, updateDoc } from "firebase/firestore";
import { initializeFirebase } from "../utils/Firebase";
import { useAuth } from "../utils/Auth";

type CommentStructureProps = {
    comment: Comment,
    likeComment: (comment: Comment) => {},
    deleteComment: (id: string) => {},
}

const CommentStructure = ({ comment, deleteComment, likeComment }: CommentStructureProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isReplyBoxOpen, toggleReplyBox] = useState<boolean>(false)
    const [newComment, writeNewComment] = useState<string>("");

    const { user, isAdmin } = useAuth();

    const app = initializeFirebase();
    const db = getFirestore(app);

    useEffect(() => {
        if (user) {
            setIsOpen(false);
        }
    }, [user])

    const replyComment = async () => {
        try {
            const docRef = await addDoc(collection(db, "posts", comment.post, "comments"), {
                userId: user.uid,
                author: user.displayName,
                comment: newComment,
                post: `${comment.post}`,
                publishDate: Date.now(),
                likes: [],
                reply: true,
                parent: comment.parent ? comment.parent : comment.id,
                replies: [],
            });

            if(!comment.replies.includes(docRef.id)) {
                await updateDoc(doc(db, "posts", comment.post, "comments", comment.id), {
                    replies: arrayUnion(docRef.id)
                });
            }

            writeNewComment("");
            toggleReplyBox(false);
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <div className='flex flex-col gap-4 group' id={comment.id} key={comment.id}>
            <div className="flex justify-between items-center">
                <div>
                    <span className='font-bold'>{comment.author}</span>
                    <span> · {new Date(comment.publishDate).toLocaleString("es-AR", {dateStyle: 'long', timeStyle: 'short'})}</span>
                </div>
                {(comment.userId === user?.uid || isAdmin) &&
                    <button className="hidden justify-self-end group-hover:block" onClick={() => deleteComment(comment.id)} >
                        <svg className="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                        </svg>
                    </button>}
            </div>
            <p>{comment.comment}</p>
            <div className="flex gap-4 items-center">
                <button className="text-sm flex items-center gap-2" onClick={() => user ? likeComment(comment) : setIsOpen(true)}>
                    <svg className="h-6" xmlns="http://www.w3.org/2000/svg" fill={ comment.likes.includes(user?.uid) ? "currentColor" : "none" } viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                    </svg>
                    <span>{comment.likes.length}</span>
                </button>
                <button onClick={() => toggleReplyBox(true)}>Responder</button>
            </div>

            {isReplyBoxOpen &&
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
                                <Login />
                            </Dialog.Panel>
                        </div>
                    </Dialog>
                    <div className="flex gap-4 items-center justify-end">
                        <button className='bg-secondary-400 font-darker_grotesque text-md px-5 lg:text-xl md:px-6 py-2 self-end hover:bg-secondary-200' onClick={() => toggleReplyBox(false)}>Cancelar</button>
                        <button className='bg-secondary-400 font-darker_grotesque text-md px-5 lg:text-xl md:px-6 py-2 self-end hover:bg-secondary-200' onClick={() => replyComment()} disabled={!user || newComment.length < 1}>Responder</button>
                    </div>
                </div>}

            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto bg-white p-14">
                        <Login />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}

export default CommentStructure;