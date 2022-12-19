import { useEffect, useState } from 'react'
import { Dialog } from '@headlessui/react'
import { Comment as CommentType } from "../types/Comment";
import Login from "./Login"
import CommentInput from './CommentInput';

import { useAuth } from "../utils/Auth";
import { useComments } from "../utils/Comments"

type CommentProps = {
    comment: CommentType,
}

const Comment = ({ comment }: CommentProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isReplyBoxOpen, toggleReplyBox] = useState<boolean>(false);
    const [isAdminBoxOpen, toggleAdminBox] = useState<boolean>(false);
    const [deleteCommentAlert, toggleDeleteCommentAlert] = useState<boolean>(false);

    const { user, isAdmin } = useAuth();
    const { likeComment, deleteComment } = useComments();

    const dayjs = require('dayjs')
    const relativeTime = require('dayjs/plugin/relativeTime')
    require('dayjs/locale/es')
    dayjs.extend(relativeTime);

    const uid = "7NXk8PiCwggyA5vWYdJT5lVTxg22";

    useEffect(() => {
        if (user) {
            setIsOpen(false);
        }
    }, [user])

    const closeReplyBox = () => {
        toggleReplyBox(false);
    }

    return (
        <div className='flex flex-col gap-4 group' id={comment.id} key={comment.id}>
            <div className="flex justify-between items-center">
                <div>
                    <span className='font-bold'>{comment.author}</span>
                    <span className='text-primary-700'> · {dayjs(comment.publishDate).locale("es").fromNow()}</span>
                </div>
                {(comment.userId === user?.uid || isAdmin) &&
                    <div>
                        <button 
                            className={`block justify-self-end ${isAdminBoxOpen ? "md:block" : "md:hidden md:group-hover:block"}`}
                            onClick={() => toggleAdminBox(!isAdminBoxOpen)}>
                            <svg className="h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                            </svg>
                        </button>
                        {isAdminBoxOpen &&
                            <div className="absolute mt-2 flex flex-col justify-start py-1 text-sm rounded overflow-hidden bg-neutral-800 text-white right-6 md:right-12 lg:right-44">
                                <button className='px-3 py-2 hover:bg-neutral-700' onClick={() => {toggleDeleteCommentAlert(true); toggleAdminBox(false)}}>Eliminar Comentario</button>
                                <button disabled className='px-3 py-2 w-full text-neutral-500 text-start'>Bloquear usuario</button>
                            </div>}
                    </div>}
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
                <CommentInput comment={comment} closeReplyBox={closeReplyBox} title={comment.postTitle} slug={comment.post} />}

            {/* Login panel */}
            <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
                {/* Overlay */}
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="mx-auto bg-white p-14">
                        <Login />
                    </Dialog.Panel>
                </div>
            </Dialog>

            {/* Delete confirmation */}
            <Dialog open={deleteCommentAlert} onClose={() => toggleDeleteCommentAlert(false)}>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className='fixed inset-0 flex items-center justify-center p-4'>
                    <Dialog.Panel className="flex flex-col gap-4 p-2 text-sm bg-neutral-800 text-white rounded">
                            <span className='p-2'>¿Elminar comentario permanentemente?</span>
                            <div className='flex self-end'>
                                <button className='p-2 rounded hover:bg-neutral-700' onClick={() => toggleDeleteCommentAlert(false)}>Cancelar</button>
                                <button className='p-2 rounded hover:bg-neutral-700' onClick={() => deleteComment(comment.id, comment.post)}>Confirmar</button>
                            </div>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    )
}

export default Comment;