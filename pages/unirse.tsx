import Head from 'next/head'
import { useState, useRef, useEffect } from "react";
import { useAuth } from "../utils/Auth";
import router from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function SignUp() {
    const firstRender = useRef(true);
    const [error, setError] = useState("");
    const { signup, user, updateUser } = useAuth();

    const signUpSchema = Yup.object().shape({
        displayName: Yup.string()
            .required("Introduce un nombre de usuario.")
            .min(2, "El nombre debe tener entre 2 y 50 caracteres.")
            .max(50, "El nombre debe tener entre 2 y 50 caracteres."),
        email: Yup.string()
            .required("Introduce un email.")
            .email("El email ingresado no es valido."),
        password: Yup.string()
            .required("Introduce una contraseña.")
            .min(8, "La contraseña debe tener entre 8 y 50 caracteres.")
            .max(50, "La contraseña debe tener entre 8 y 50 caracteres."),
        repeatPassword: Yup.string()
            .required("Vuelve a introducir tu contraseña.")
            .oneOf([Yup.ref("password")], "Las contraseñas deben ser iguales.")
    });

    const formik = useFormik({
        initialValues: {
            displayName: '',
            email: '',
            password: '',
            repeatPassword: ''
        },
        validationSchema: signUpSchema,
        onSubmit: values => {
            signup(values.email, values.password)
                .then(() => {
                    updateUser(values.displayName);
                })
                .then(() => {
                    router.push("/obra");
                })
                .catch((error: any) => {
                    setError(error.message);
                });
        },
    })

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;
            return;
        }

        if (user) {
            router.push("/obra");
        }
    })

    return (
        <>
            <Head>
                <title>Unirse | Verónica Metélico</title>
                <meta
                name="description"
                content="Cuentos y Reflexiones | Verónica Metélico"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <Header />

            <div className="h-full font-roboto text-primary-900">
                <form onSubmit={formik.handleSubmit} className="flex flex-col flex items-start w-96 mx-auto my-28">
                    <h1 className="text-4xl mb-10">
                        Crear una cuenta
                    </h1>
                    {error &&
                        <label htmlFor="" className="text-red-600 my-4">
                            {`${error}`}
                        </label>
                    }
                    <div className="flex flex-col gap-4 w-full">
                        <div className="flex flex-col gap-2">
                            <label htmlFor="displayName">Nombre de usuario</label>
                            <input 
                                className={`border outline-none h-8 ${formik.errors.displayName && formik.touched.displayName ? 'border-red-500' : ''}`} 
                                type="text" 
                                {...formik.getFieldProps('displayName')}
                                aria-label="Nombre de Usuario" />
                            {formik.errors.displayName && formik.touched.displayName &&
                                <span className="text-red-500" aria-label="Display name field errors">{formik.errors.displayName}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="email">Email</label>
                            <input 
                                className={`border outline-none h-8 ${formik.errors.email && formik.touched.email ? 'border-red-500' : ''}`} 
                                type="email" 
                                {...formik.getFieldProps('email')}
                                aria-label="Email" />
                            {formik.errors.email && formik.touched.email &&
                                <span className="text-red-500" aria-label="Email field errors">{formik.errors.email}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="password">Contraseña</label>
                            <input 
                                className={`border outline-none h-8 ${formik.errors.password && formik.touched.password ? 'border-red-500' : ''}`} 
                                type="password" 
                                {...formik.getFieldProps('password')}
                                aria-label="Contraseña" />
                            {formik.errors.password && formik.touched.password &&
                                <span className="text-red-500" aria-label="Password field errors">{formik.errors.password}</span>}
                        </div>
                        <div className="flex flex-col gap-2">
                            <label htmlFor="repeatPassword">Repetir Contraseña</label>
                            <input 
                                className={`border outline-none h-8 ${formik.errors.repeatPassword && formik.touched.repeatPassword ? 'border-red-500' : ''}`} 
                                type="password" 
                                {...formik.getFieldProps('repeatPassword')}
                                aria-label="Repetir Contraseña" />
                            {formik.errors.repeatPassword && formik.touched.repeatPassword &&
                                <span className="text-red-500" aria-label="Repeat password field errors">{formik.errors.repeatPassword}</span>}
                        </div>
                    </div>
                    <button className="bg-secondary-400 text-sm px-5 md:px-6 py-3 hover:bg-secondary-200 self-end mt-10" type="submit">Crear cuenta</button>
                </form>
            </div>
            
            <Footer />
        </>
    );
}
