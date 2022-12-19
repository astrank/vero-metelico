export type Comment = {
    id: string,
    author: string,
    userId: string,
    post: string,
    postTitle: string,
    comment: string,
    publishDate: string,
    likes: string[],
    isReply: boolean,
    parent: false | string,
    replies: string[],
}