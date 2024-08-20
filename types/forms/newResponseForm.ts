export type NewResponseForm = {
    _id: string;
    body: string;
    images: ImageType[],
}

export type ImageType = {
    _id: string;
    url: string;
}