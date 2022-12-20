import { useEffect } from "react";

export default function Instagram() {
    const token = process.env.NEXT_PUBLIC_INSTAGRAM_TOKEN;
    const url = `https://graph.instagram.com/me/media?fields=id,media_url,permalink&access_token=${token}`;

    useEffect(() => {
        fetch(url)
            .then(res => res.json())
            .then(data => console.log(data.data))
            .catch(error => console.log(error))
    }, [])
    
    return (
        <>
            <h2>Instagram</h2>
        </>
    )
}