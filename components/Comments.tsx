import { useState } from 'react'
import Login from "./Login"
import { Comment as CommentType } from "../types/Comment";
import { Dialog } from '@headlessui/react'
import Comment from "./Comment";

type CommentsProps = {
    comment: CommentType,
    replies: CommentType[],
}

const Comments = ({ comment, replies }: CommentsProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [showingReplies, toggleReplies] = useState<boolean>(false);

    return (
        <div className='flex flex-col gap-6 mt-8' key={comment.id}>
            <Comment comment={comment} />
            
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
                        <Comment comment={c} />
                    </div>
                ))}


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

export default Comments;