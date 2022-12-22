import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Instagram from "../components/Instagram";

export default function SobreMi() {
    const [showingTranslation, toggleShowingTranslation] = useState(false);
    let translate = false;
    const firstRender = useRef(true);

    const googleTranslateElementInit = () => {
        if(!translate) {
            new window.google.translate.TranslateElement({
                pageLanguage: "es",
                autoDisplay: false
            }, "google_translate_element");

            translate = true;
        }
    };

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }
        
        if(!translate) {
            var addScript = document.createElement("script");
            addScript.setAttribute(
            "src",
            "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
            );
            document.body.appendChild(addScript);
            window.googleTranslateElementInit = googleTranslateElementInit;
        }
    }, []);

    return (
        <div className="min-h-screen text-primary-700">
            <Head>
                <title>Sobre mí | Verónica Metélico</title>
                <meta
                    name="description"
                    content="Cuentos y Reflexiones | Verónica Metélico"
                />
            </Head>

            <Header />

            <div className="flex flex-col justify-start items-end gap-2 mx-4 h-full my-10 lg:my-20 md:mx-10 lg:mx-14 xl:mx-44">
                <button onClick={() => toggleShowingTranslation(!showingTranslation)} className="flex items-center gap-1 text-sm">
                    <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C11.176 10.658 7.69 15.08 3 17.502m9.334-12.138c.896.061 1.785.147 2.666.257m-4.589 8.495a18.023 18.023 0 01-3.827-5.802" />
                    </svg>
                    <span>TRADUCTOR</span>
                </button>
                <div id="google_translate_element" className={`${!showingTranslation ? "hidden" : ""}`}></div>
            </div>

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
                    <h1 className="font-asap text-2xl text-primary-900 mb-2 lg:mb-4 lg:text-3xl text-justify">Te doy la bienvenida a mi sitio</h1>
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
