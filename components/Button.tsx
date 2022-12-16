type ButtonProps = {
    text: string,
    type?: "submit" | "reset" | "button",
    onClick?: () => void,
    disabled?: boolean,
}

export default function Button({ text, type, onClick }: ButtonProps) {
    return (
        <button 
            className="bg-secondary-400 text-sm px-5 md:px-6 py-3 mt-4 self-end hover:bg-secondary-200"
            type={type || undefined} 
            onClick={() => { onClick ? onClick() : undefined }}>
                {text}
        </button>
    )
}