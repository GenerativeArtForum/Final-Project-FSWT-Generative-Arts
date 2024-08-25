export type NewThreadForm = {
    _id: string;
    question: string;
    body: string;
    tags: TagType[];
    images: ImageType[],
}

export type TagType = {
    id: string;
    name: string;
}

export type ImageType = {
    _id: string;
    url: string;
}