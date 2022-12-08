import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Obra() {
    return (
        <>
            <Head>
                <title>Contacto | Verónica Metélico</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="flex flex-col gap-8 text-primary-900 mx-4 my-24 lg:mx-60">
                <form action="POST" className="flex flex-col gap-6">
                    <input type="text" name="name" className="border border-primary-700 px-2 py-2 focus:outline-none placeholder:text-primary-700 placeholder:font-darker_grotesque placeholder:text-lg" placeholder="Nombre y Apellido" />
                    <input type="text" name="email" className="border border-primary-700 px-2 py-2 focus:outline-none placeholder:text-primary-700 placeholder:font-darker_grotesque placeholder:text-lg" placeholder="Email" />
                    <input type="text" name="subject" className="border border-primary-700 px-2 py-2 focus:outline-none placeholder:text-primary-700 placeholder:font-darker_grotesque placeholder:text-lg" placeholder="Asunto" />
                    <textarea name="" className="border border-primary-700 px-2 py-2 focus:outline-none placeholder:text-primary-700 placeholder:font-darker_grotesque placeholder:text-lg" placeholder="Mensaje" rows={5}></textarea>
                    <button type="submit" className="bg-secondary-400 font-darker_grotesque text-md px-5 lg:text-xl md:px-6 py-2 mt-4 self-end">Enviar</button>
                </form>
            </div>

            <Footer />
        </>
    );
}