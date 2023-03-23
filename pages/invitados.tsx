import Head from "next/head";
import Link from "next/link";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Instagram from "../components/Instagram";

import { GuestPost } from "../types/GuestPost";
import { Category } from "../types/Category";

import { groq } from "next-sanity";
import { client } from "../lib/sanity.client";
import { useEffect } from "react";
import { PortableText } from "@portabletext/react";

type InvitadosProps = {
  obras: GuestPost[];
  categorias: Category[];
};

export default function Invitados({ obras, categorias }: InvitadosProps) {
  useEffect(() => console.log(obras[0]));
  return (
    <div className="min-h-screen flex flex-col justify-between">
      <Head>
        <title>Invitados | Verónica Metélico</title>
        <meta
          name="description"
          content="Cuentos y Reflexiones | Verónica Metélico"
        />
      </Head>

      <Header categorias={categorias} />

      <div className="flex flex-col gap-6 text-primary-900 mx-4 my-8 md:mx-10 lg:mx-14 xl:mx-44 mb-auto">
        <div className="flex flex-col gap-6 mb-6">
          <h1 className="font-asap text-3xl">Espacio para invitados</h1>
          <p className="font-roboto font-light text-base text-primary-700 leading-8 text-justify">
            Este es el Salón de Honor para mis hermanos en la escritura. A
            quienes leo, admiro y de quienes aprendo.
            <br /> Están aquí los que tienen que estar.
          </p>
        </div>
        {obras &&
          obras
            .sort((p1, p2) => Date.parse(p2.fecha) - Date.parse(p1.fecha))
            .map((obra) => (
              <div className="flex flex-col gap-3" key={obra.slug.current}>
                <Link
                  href={`/invitados/${obra.slug.current}`}
                  className="group flex flex-col gap-3 self-start"
                >
                  <h2 className="font-asap text-2xl group-hover:text-primary-700 mb-2">
                    {obra.titulo}
                  </h2>
                  <div className="font-roboto font-light text-md text-primary-700 leading-8 text-justify">
                    <PortableText value={obra.introduction} />
                  </div>
                </Link>
                <div className="flex justify-between items-center">
                  {obra.autor.link ? (
                    <span>
                      Autor:{" "}
                      <Link
                        href={obra.autor.link}
                        className="underline"
                        target="_blank"
                        rel="noreferrer"
                      >
                        {obra.autor.nombre}
                      </Link>
                    </span>
                  ) : (
                    <span>Autor: {obra.autor.nombre}</span>
                  )}
                  <Link
                    className="flex gap-2 items-center justify-end text-sm text-secondary-600 hover:text-secondary-400"
                    href={`/invitados/${obra.slug.current}`}
                  >
                    <span>Seguir leyendo</span>
                    <svg
                      className="w-4 h-4 mt-0.5"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={1.5}
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                      />
                    </svg>
                  </Link>
                </div>
              </div>
            ))}
      </div>

      <section className="mt-14">
        <Instagram />
      </section>

      <Footer />
    </div>
  );
}

export const getStaticProps = async () => {
  const obras_invitados_q = groq`*[_type == "obras_invitados" && !(_id in path('drafts.**'))]{
        titulo,
        slug,
        cuerpo,
        autor->{
            nombre,
            link
        },
        fecha,
        introduction,
        categoria->{
            nombre_plural,
            nombre_singular
        }
    }`;
  const categorias_q = groq`*[_type == "categoria" && !(_id in path('drafts.**'))]{
        nombre_plural,
        nombre_singular
    }`;

  const obras_invitados = await client.fetch(obras_invitados_q);
  const categorias = await client.fetch(categorias_q);

  return {
    props: {
      obras: obras_invitados,
      categorias: categorias,
    },
    revalidate: 60,
  };
};
