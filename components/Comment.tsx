import Dialoga from "./Login"
import { Comment } from "../types/Comment";
import { User } from "firebase/auth";
import { useState } from 'react'
import { Dialog } from '@headlessui/react'
import { getFirestore, collection, addDoc, onSnapshot, doc, query, arrayUnion, arrayRemove, deleteDoc, updateDoc } from "firebase/firestore";
import { initializeFirebase } from "../utils/Firebase";
import CommentStructure from "./CommentStructure";

type CommentProps = {
    comment: Comment,
    replies: Comment[],
    user: User,
    isAdmin: boolean,
    likeComment: (comment: Comment) => {},
    deleteComment: (id: string) => {}
}

const CommentComponent = ({ comment, replies, user, isAdmin, deleteComment, likeComment }: CommentProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [isReplyBoxOpen, toggleReplyBox] = useState<boolean>(false)
    const [newComment, writeNewComment] = useState<string>("");
    const [showingReplies, toggleReplies] = useState<boolean>(false);

    const app = initializeFirebase();
    const db = getFirestore(app);

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
                parent: comment.id,
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
        <div className='flex flex-col gap-6 mt-8 group' key={comment.id}>
            <CommentStructure comment={comment} likeComment={likeComment} deleteComment={deleteComment} />
            
            {replies && replies.length > 0 && 
                <button 
                    className={`flex items-center gap-2 font-bold self-start`} 
                    onClick={() => toggleReplies(!showingReplies)}>
                    <svg className={`h-3 ${showingReplies ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
                        <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path>
                    </svg>
                    <span>{replies.length == 1 ? `${replies.length} respuesta` : `${replies.length} respuestas` }</span>
                </button>}

            {replies && replies.length > 0 && showingReplies &&
                replies.map(c => (
                    <div className="ml-6" key={c.id}>
                        <CommentStructure comment={c} likeComment={likeComment} deleteComment={deleteComment} />
                    </div>
                ))}


            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto bg-white p-14">
                        <Dialoga />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}

export default CommentComponent;