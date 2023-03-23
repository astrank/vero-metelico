export type GuestPost = {
    titulo: string,
    introduction: [],
    cuerpo: [],
    categoria: string,
    autor: string,
    autor_link?: string,
    slug: {
        current: string,
    },
    fecha: string,
}