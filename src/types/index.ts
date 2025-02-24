export interface Post {
    id: number;
    title: string;
    body: string;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    password: string;
    createdAt: string;
    updatedAt: string;
}

export interface Comment {
    id: number;
    body: string;
    postId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}

export interface Like {
    id: number;
    postId: number;
    userId: number;
    createdAt: string;
    updatedAt: string;
}