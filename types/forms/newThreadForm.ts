export type NewThreadForm = {
    _id: string;
    question: string;
    userId: string;
    body: string;
    tagIds: string[];
    images: ImageType[],
    status: string;
}

export type TagType = {
    id: string;
    name: string;
}

export type ImageType = {
    _id: string;
    url: string;
}