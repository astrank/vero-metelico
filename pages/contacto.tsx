import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";

export default function Obra() {
    const signUpSchema = Yup.object().shape({
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
        validationSchema: signUpSchema,
        onSubmit: values => {},
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
                <form method="POST" className="flex flex-col gap-4" action="https://formsubmit.co/46c8e5f4ab3f3c79b050148e5511b3cd" >
                    <div className="flex flex-col gap-3">
                        <label htmlFor="nombre" className="font-darker_grotesque">Nombre y Apellido (*)</label>
                        <input 
                            type="text" 
                            id="nombre"
                            className={`border border-primary-700 p-1 lg:p-2 focus:outline-none placeholder:text-primary-700 placeholder:font-darker_grotesque placeholder:text-lg ${formik.errors.nombre && formik.touched.nombre ? "outline outline-1 outline-red-500" : ""}`}
                            {...formik.getFieldProps('nombre')}
                            aria-label="Nombre" />
                        {formik.errors.nombre && formik.touched.nombre &&
                                <span className="text-red-500 font-darker_grotesque" aria-label={formik.errors.nombre}>{formik.errors.nombre}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="email" className="font-darker_grotesque">Email (*)</label>
                        <input 
                            type="email" 
                            id="email" 
                            {...formik.getFieldProps('email')}
                            className={`border border-primary-700 p-1 lg:p-2 focus:outline-none placeholder:text-primary-700 placeholder:font-darker_grotesque placeholder:text-lg ${formik.errors.email && formik.touched.email ? "outline outline-1 outline-red-500" : ""}`}
                            aria-label="Email" />
                        {formik.errors.email && formik.touched.email &&
                                <span className="text-red-500 font-darker_grotesque" aria-label={formik.errors.email}>{formik.errors.email}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="subject" className="font-darker_grotesque">Asunto (*)</label>
                        <input 
                            type="text" 
                            id="asunto" 
                            {...formik.getFieldProps('asunto')}
                            className={`border border-primary-700 p-1 lg:p-2 focus:outline-none placeholder:text-primary-700 placeholder:font-darker_grotesque placeholder:text-lg ${formik.errors.asunto && formik.touched.asunto ? "outline outline-1 outline-red-500" : ""}`}
                            aria-label="asunto" />
                        {formik.errors.asunto && formik.touched.asunto &&
                                <span className="text-red-500 font-darker_grotesque" aria-label={formik.errors.asunto}>{formik.errors.asunto}</span>}
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="message" className="font-darker_grotesque">Mensaje (*)</label>
                        <textarea 
                            {...formik.getFieldProps('mensaje')}
                            id="mensaje" 
                            className={`border border-primary-700 p-1 lg:p-2 focus:outline-none placeholder:text-primary-700 placeholder:font-darker_grotesque placeholder:text-lg ${formik.errors.mensaje && formik.touched.mensaje ? "outline outline-1 outline-red-500" : ""}`} 
                            aria-label="mensaje"
                            rows={5}></textarea>
                        {formik.errors.mensaje && formik.touched.mensaje &&
                                <span className="text-red-500 font-darker_grotesque" aria-label={formik.errors.mensaje}>{formik.errors.mensaje}</span>}
                    </div>
                    <input type="hidden" name="_subject" value="Te han enviado un nuevo email a través de tu pagina web."></input>
                    <input type="hidden" name="_captcha" value="false"></input>
                    <input type="hidden" name="_next" value="https://verometelico.netlify.app/contacto"></input>
                    <input type="text" name="_honey" className="hidden"></input>
                    <button type="submit" className="bg-secondary-400 font-darker_grotesque text-md px-5 lg:text-xl md:px-6 py-2 mt-4 self-end hover:bg-secondary-200">Enviar</button>
                </form>
            </div>

            <Footer />
        </>
    );
}