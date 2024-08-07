export type NewThreadForm = {
    _id: string;
    title: string;
    description: string;
    tags: TagType[];
}

export type TagType = {
    _id: string;
    name: string;
}