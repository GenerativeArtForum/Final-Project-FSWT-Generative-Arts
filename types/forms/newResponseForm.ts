export type NewResponseForm = {
    _id: string;
    text: string;
    userId: string;
    threadId: string;
    images: ImageType[],
}

export type ImageType = {
    _id: string;
    url: string;
}