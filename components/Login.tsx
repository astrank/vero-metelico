import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../utils/Auth";

const Login = () => {
    const { login, google } = useAuth();
    const [error, setError] = useState("");

    const logInSchema = Yup.object().shape({
        email: Yup.string().required("Introduce tu email."),
        password: Yup.string().required("Introduce tu contraseña."),
    });

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
        },
        validationSchema: logInSchema,
        onSubmit: (values) => {
            login(values.email, values.password)
                .then(() => {
                    //router.push("/");
                })
                .catch((error: any) => {
                    setError(error.message);
                });
        },
    });

    return (
        <div
            className="flex flex-col justify-center text-primary-900"
        >
            <h1 className="text-4xl font-bold mb-10 font-darker_grotesque">
                Ingresa con tu cuenta
            </h1>
            {error && (
                <label htmlFor="" className="text-red-600 py-4">
                    {`Wrong Email or Password`}
                </label>
            )}
            <button
                className="flex items-center justify-start gap-4 font-bold"
                onClick={() => google()}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    xmlnsXlink="http://www.w3.org/1999/xlink"
                    width="46"
                    height="46"
                    viewBox="0 0 46 46"
                >
                   
                    <g
                        fill="none"
                        fillRule="evenodd"
                        stroke="none"
                        strokeWidth="1"
                    >
                        <g transform="translate(-1 -1)">
                            <g
                                filter="url(#filter-1)"
                                transform="translate(4 4)"
                            >
                                <g>
                                    <use fill="#FFF" xlinkHref="#path-2"></use>
                                    <use xlinkHref="#path-2"></use>
                                    <use xlinkHref="#path-2"></use>
                                    <use xlinkHref="#path-2"></use>
                                </g>
                            </g>
                            <g transform="translate(15 15)">
                                <path
                                    fill="#4285F4"
                                    d="M17.64 9.205c0-.639-.057-1.252-.164-1.841H9v3.481h4.844a4.14 4.14 0 01-1.796 2.716v2.259h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
                                ></path>
                                <path
                                    fill="#34A853"
                                    d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 009 18z"
                                ></path>
                                <path
                                    fill="#FBBC05"
                                    d="M3.964 10.71A5.41 5.41 0 013.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 000 9c0 1.452.348 2.827.957 4.042l3.007-2.332z"
                                ></path>
                                <path
                                    fill="#EA4335"
                                    d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 00.957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z"
                                ></path>
                                <path d="M0 0h18v18H0V0z"></path>
                            </g>
                        </g>
                    </g>
                </svg>
            </button>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full mt-6">
                <div className="flex flex-col gap-3">
                    <label htmlFor="email" className="font-bold">
                        Email
                    </label>
                    <input
                        type="text"
                        {...formik.getFieldProps("email")}
                        id="email"
                        className="border outline-none h-8 border-primary-700"
                    />
                    {formik.errors.email && formik.touched.email && (
                        <span
                            className="text-red-500 text-sm"
                            aria-label="Email field errors"
                        >
                            {formik.errors.email}
                        </span>
                    )}
                </div>
                <div className="flex flex-col gap-3">
                    <label htmlFor="password" className="font-bold">
                        Contraseña
                    </label>
                    <input
                        type="password"
                        id="password"
                        {...formik.getFieldProps("password")}
                        className="border outline-none h-8 border-primary-700"
                    />
                    {formik.errors.password && formik.touched.password && (
                        <span
                            className="text-red-500 text-sm"
                            aria-label="Password field errors"
                        >
                            {formik.errors.password}
                        </span>
                    )}
                </div>
                <button
                    type="submit"
                    className="bg-secondary-400 font-darker_grotesque text-md px-5 lg:text-xl md:px-6 py-2 mt-8 self-start hover:bg-secondary-200"
                >
                    Entrar
                </button>
            </form>
        </div>
    );
};

export default Login;
