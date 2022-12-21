import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useRouter } from 'next/router'
import { useEffect } from "react";

export default function Obra() {
    const router = useRouter();

    useEffect(() => {
        if(!router.isReady) return;
        const query = router.query;
    }, [router.isReady, router.query]);

    const emailSchema = Yup.object().shape({
        nombre: Yup.string()
            .required("Introduce tu nombre y apellido.")
            .min(2, "El nombre y apellido debe tener entre 2 y 50 caracteres.")
            .max(50, "El nombre y apellido debe tener entre 2 y 50 caracteres."),
        email: Yup.string()
            .required("Introduce un email.")
            .email("El email ingresado no es valido."),
        asunto: Yup.string()
            .required("Introduce el asunto.")
            .min(2, "El asunto debe tener entre 2 y 50 caracteres.")
            .max(50, "El asunto debe tener entre 2 y 50 caracteres."),
        mensaje: Yup.string()
            .required("Introduce un mensaje.")
            .min(2, "El mensaje debe tener entre 2 y 1000 caracteres.")
            .max(1000, "El mensaje debe tener entre 2 y 1000 caracteres."),
    });

    const formik = useFormik({
        initialValues: {
            nombre: '',
            email: '',
            asunto: '',
            mensaje: ''
        },
        validationSchema: emailSchema,
        onSubmit: values => { 
            fetch("https://formsubmit.co/46c8e5f4ab3f3c79b050148e5511b3cd", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nombre: values.nombre,
                    email: values.email,
                    asunto: values.asunto,
                    mensaje: values.mensaje
                })
            })
            .then(response => response.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        }
    })
    
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

            <div className="flex flex-col gap-8 text-primary-900 mx-4 my-10 lg:my-24 lg:mx-60">
                {router.isReady && router.query.q == "success" &&
                    <div className="flex items-center gap-2 text-green-600">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span>¡Tu mensaje ha sido enviado!</span>
                    </div>}
                <form method="POST" action="https://formsubmit.co/46c8e5f4ab3f3c79b050148e5511b3cd" className="flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="nombre" className="text-sm">Nombre y Apellido (*)</label>
                        <input 
                            type="text" 
                            id="nombre"
                            className={`border border-primary-700 p-1 lg:p-1.5 focus:outline-none placeholder:text-primary-700 placeholder:text-lg ${formik.errors.nombre && formik.touched.nombre ? "outline outline-1 outline-red-500" : ""}`}
                            {...formik.getFieldProps('nombre')}
                            aria-label="Nombre" />
                        {formik.errors.nombre && formik.touched.nombre &&
                                <span className="text-red-500 text-sm" aria-label={formik.errors.nombre}>{formik.errors.nombre}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="text-sm">Email (*)</label>
                        <input 
                            type="email" 
                            id="email" 
                            {...formik.getFieldProps('email')}
                            className={`border border-primary-700 p-1 lg:p-1.5 focus:outline-none placeholder:text-primary-700 placeholder:text-lg ${formik.errors.email && formik.touched.email ? "outline outline-1 outline-red-500" : ""}`}
                            aria-label="Email" />
                        {formik.errors.email && formik.touched.email &&
                                <span className="text-red-500 text-sm" aria-label={formik.errors.email}>{formik.errors.email}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="asunto" className="text-sm">Asunto (*)</label>
                        <input 
                            type="text" 
                            id="asunto" 
                            {...formik.getFieldProps('asunto')}
                            className={`border border-primary-700 p-1 lg:p-1.5 focus:outline-none placeholder:text-primary-700 placeholder:text-lg ${formik.errors.asunto && formik.touched.asunto ? "outline outline-1 outline-red-500" : ""}`}
                            aria-label="asunto" />
                        {formik.errors.asunto && formik.touched.asunto &&
                                <span className="text-red-500 text-sm" aria-label={formik.errors.asunto}>{formik.errors.asunto}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="mensaje" className="text-sm">Mensaje (*)</label>
                        <textarea 
                            {...formik.getFieldProps('mensaje')}
                            id="mensaje" 
                            className={`border border-primary-700 p-1 lg:p-1.5 focus:outline-none placeholder:text-primary-700 placeholder:text-lg ${formik.errors.mensaje && formik.touched.mensaje ? "outline outline-1 outline-red-500" : ""}`} 
                            aria-label="mensaje"
                            rows={5}></textarea>
                        {formik.errors.mensaje && formik.touched.mensaje &&
                                <span className="text-red-500 text-sm" aria-label={formik.errors.mensaje}>{formik.errors.mensaje}</span>}
                    </div>
                    <input type="hidden" name="_subject" value="Te han enviado un nuevo email a través de tu pagina web."></input>
                    <input type="hidden" name="_captcha" value="false"></input>
                    <input type="hidden" name="_next" value="https://verometelico.netlify.app/contacto?q=success"></input>
                    <input type="text" name="_honey" className="hidden"></input>
                    <button 
                        disabled={!formik.isValid || (Object.keys(formik.touched).length === 0 && formik.touched.constructor === Object)}
                        className="bg-secondary-400 text-sm px-5 md:px-6 py-3 mt-4 self-end hover:bg-secondary-200"
                        type="submit">Enviar</button>
                </form>
            </div>

            <Footer />
        </>
    );
}