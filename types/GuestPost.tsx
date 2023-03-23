import { Category } from "../types/Category";

export type GuestPost = {
    titulo: string,
    introduction: [],
    cuerpo: [],
    categoria: Category,
    autor: {
        nombre: string,
        link?: string,
    }
    slug: {
        current: string,
    },
    fecha: string,
}