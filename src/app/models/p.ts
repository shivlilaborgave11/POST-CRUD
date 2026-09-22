import { __exportStar } from "tslib";

export interface IPost {
    id: number;
    title: string;
    body: string;
    status: 'active' | 'draft'
}
export interface IPostRes {
    msg: string;
    post: IPost | null;
}