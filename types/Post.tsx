import { Category } from "../types/Category";

export type Post = {
    titulo: string,
    cuerpo: [],
    categoria: Category,
    introduction: [],
    slug: {
        current: string,
    },
    fecha: string,
}