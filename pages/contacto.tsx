import Head from "next/head";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useState } from "react";
import * as Toast from "@radix-ui/react-toast";
import { ToastType } from "../types/Toast";

export default function Contacto() {
    const [toast, setToast] = useState<ToastType | false>(false);
    const [isToastOpen, toggleToast] = useState<boolean>(false);

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
        onSubmit: (values, { resetForm }) => {
            fetch('https://formsubmit.co/ajax/verometelico@gmail.com', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    nombre: values.nombre,
                    email: values.email,
                    asunto: values.asunto,
                    mensaje: values.mensaje, 
                    _subject: "Te han enviado un nuevo email a través de tu pagina web."}),
            })
            .then(response => response.json())
            .then(data => {
                resetForm();
                setToast({
                    title: "El email ha sido enviado.", 
                    duration: 4000,
                    status: "success"}); 
                toggleToast(!isToastOpen);
            })
            .catch(error => setToast({
                title: "Ha ocurrido un error el enviar el email.", 
                duration: 4000, 
                status: "error"})); 
            toggleToast(!isToastOpen);

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
            </Head>

            <Header />

            <div className="flex flex-col gap-8 text-primary-900 mx-4 my-10 lg:my-24 lg:mx-60">
                <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4">
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
                    <input type="text" name="_honey" className="hidden"></input>
                    <button 
                        type="submit"
                        disabled={formik.isSubmitting || !formik.isValid || (Object.keys(formik.touched).length === 0 && formik.touched.constructor === Object)}
                        className="bg-secondary-400 text-sm px-5 md:px-6 py-3 mt-4 self-end hover:bg-secondary-200"
                        >Enviar</button>
                </form>
            </div>

            <Footer />

            {toast &&
                <Toast.Provider duration={5000}>
                    <Toast.Root 
                        open={isToastOpen}
                        onOpenChange={toggleToast}
                        className={`flex items-center py-6 px-8 rounded 
                                    ${toast.status == "success" ? "bg-green-400 text-primary-700" 
                                        : toast.status == "error" ? "bg-red-300 text-primary-700" 
                                        : "bg-primary-900 text-white"}`}>
                            <Toast.Title className="mr-8">{toast.title}</Toast.Title>
                            <Toast.Close>
                                <svg className={`w-6 h-6 rounded
                                    ${toast.status == "success" ? "hover:bg-green-300" 
                                        : toast.status == "error" ? "hover:bg-error-200" 
                                        : "bg-primary-700"}`} 
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </Toast.Close>
                    </Toast.Root>

                    <Toast.Viewport className="fixed top-0 right-0 m-5" />
                </Toast.Provider>}
        </>
    );
}