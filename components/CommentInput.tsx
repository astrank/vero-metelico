import { useEffect, useState } from "react";
import { Dialog } from '@headlessui/react'
import { Comment as CommentType } from "../types/Comment";
import Login from "./Login"
import Button from "./Button"

import { getFirestore, collection, addDoc, onSnapshot, doc, query, arrayUnion, arrayRemove, deleteDoc, updateDoc } from "firebase/firestore";
import { initializeFirebase } from "../utils/Firebase";
import { useAuth } from "../utils/Auth";

type CommentInputProps = {
    slug: string,
    title: string,
    comment?: CommentType,
    closeReplyBox?: () => void,
}

const CommentInput = ({ slug, title, comment, closeReplyBox }: CommentInputProps) => {
    const app = initializeFirebase();
    const db = getFirestore(app);
    const { user } = useAuth();
    const uid = "7NXk8PiCwggyA5vWYdJT5lVTxg22";

    const [loginDialog, toggleLoginDialog] = useState(false);
    const [newComment, writeNewComment] = useState<string>("");

    useEffect(() => {
        if (user) {
            toggleLoginDialog(false);
        }
    }, [user])

    const postComment = async () => {
        try {
            const docRef = await addDoc(collection(db, "posts", slug, "comments"), {
                userId: user.uid,
                author: user.displayName,
                comment: newComment,
                post: slug,
                postTitle: title,
                publishDate: Date.now(),
                likes: [],
                parent: 
                    comment ? 
                        comment.parent ? 
                            comment.parent : 
                            comment.id : 
                        false,
                replies: [],
            });

            await addDoc(collection(db, "notifications", uid, "comment"), {
                type: comment ? "new-reply" : "new-comment",
                authorId: user.uid,
                author: user.displayName,
                comment: newComment,
                commentId: docRef.id,
                post: slug,
                postTitle: title,
                publishDate: Date.now(),
                watched: false,
            });

            writeNewComment("");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    return (
        <>
            <div className='flex flex-col gap-6 my-6'>
                <textarea 
                    className='border border-primary-700 py-2 px-4 focus:outline-none' 
                    onChange={(e) => writeNewComment(e.target.value)} 
                    onClick={() => !user ? toggleLoginDialog(true) : ""}
                    value={newComment}
                    placeholder={user ? `Comenta como ${user.displayName}` : `Ingresa para comentar`} />
                <div className="flex gap-4 items-center justify-end">
                    {closeReplyBox &&
                        <Button text="Cancel" onClick={closeReplyBox} />}
                    <Button
                        text="Comment"
                        onClick={postComment}
                        disabled={!user || newComment.length < 1} />
                </div>
            </div>

            <Dialog open={loginDialog} onClose={() => toggleLoginDialog(false)} className="relative z-50">
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto bg-white p-14">
                        <Login />
                    </Dialog.Panel>
                </div>
            </Dialog>
        </>
    )
}

export default CommentInput;



    /*const replyComment = async () => {
        if(comment) {
            try {
                const docRef = await addDoc(collection(db, "posts", slug, "comments"), {
                    userId: user.uid,
                    author: user.displayName,
                    comment: newComment,
                    post: slug,
                    postTitle: title,
                    publishDate: Date.now(),
                    likes: [],
                    reply: true,
                    parent: comment.parent ? comment.parent : comment.id,
                    replies: [],
                });

                if(!comment.replies.includes(docRef.id)) {
                    await updateDoc(doc(db, "posts", slug, "comments", comment.id), {
                        replies: arrayUnion(docRef.id)
                    });
                }

                const notiRef = await addDoc(collection(db, "notifications", uid, "comment"), {
                    type: "new-reply",
                    authorId: user.uid,
                    author: user.displayName,
                    comment: newComment,
                    commentId: docRef.id,
                    post: comment.post,
                    postTitle: comment.postTitle,
                    publishDate: Date.now(),
                    watched: false,
                });

                writeNewComment("");
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
    };*/