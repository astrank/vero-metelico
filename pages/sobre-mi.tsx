import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Image from "next/image";
import Instagram from "../components/Instagram";

export default function SobreMi() {
    return (
        <div className="min-h-screen text-primary-700">
            <Head>
                <title>Contacto | Verónica Metélico</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <section className="flex flex-col-reverse gap-10 mx-4 h-full my-10 lg:gap-20 lg:my-20 lg:flex-row md:mx-10 lg:mx-14 xl:mx-44">
                <div className="relative w-full h-96 lg:h-auto lg:w-5/12">
                    <Image
                        src="/veronica-metelico.webp"
                        fill
                        priority
                        alt="Imagen de Verónica"
                        className="object-cover object-top"
                    />
                </div>
                <div className="flex flex-col gap-4 lg:w-7/12 font-light text-base leading-7 font-roboto lg:text-lg">
                    <h1 className="font-asap text-2xl text-primary-900 mb-2 lg:mb-4 lg:text-3xl text-justify">Verónica Metélico</h1>
                    <p className="text-justify">
                        Soy Verónica Metélico. Nací el 24 de octubre de 1973 así que
                        saquen ustedes las cuentas. Nací en Córdoba Capital,
                        Argentina, pero a los tres años mis padres volvieron a
                        Rosario y acá me quedé.
                    </p>
                    <p className="text-justify">
                        Rosario, ciudad violenta. Pero con
                        un Rio tan ancho que compensa su mal vivir.
                    </p>
                    <p className="text-justify">
                        Amo acariciar el
                        Paraná con mi kayak y amo la isla. Pero también amo los
                        jacarandás, los lapachos y los tilos de sus cuadras. Amo las
                        veredas anchas llenas de césped de Fisherton y su estación
                        de trenes, donde di mis primeros pasos en este mundo
                        maravilloso de la escritura de la mano de mi profe Alejandro
                        Marsili. 
                    </p>
                    <p className="text-justify">
                        Pienso que mis escritos reúnen las dos caras de
                        esta ciudad: la violencia, la muerte y la oscuridad junto
                        con la belleza, la profundidad y la vida.
                    </p>
                    <p className="text-justify">
                        Quizás todo esto
                        sea parte de mi búsqueda espiritual. 
                    </p>
                    <p className="text-justify">Aquí les dejo mis
                        cuentos y mis reflexiones, que son por supuesto, yo misma.</p>
                </div>
            </section>

            <section>
                <Instagram />
            </section>

            <Footer />
        </div>
    );
}
