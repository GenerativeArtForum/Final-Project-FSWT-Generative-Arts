export type NewThreadForm = {
    _id: string;
    title: string;
    description: string;
    tags: Tag[];
}

export type Tag = {
    _id: string;
    name: string;
}