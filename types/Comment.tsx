export type Comment = {
    id: string,
    author: string,
    userId: string,
    post: string,
    comment: string,
    publishDate: string,
    likes: string[],
    reply: boolean,
    parent: boolean | string,
    replies: string[],
}