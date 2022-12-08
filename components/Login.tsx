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
        <form
            onSubmit={formik.handleSubmit}
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
            <button className="font-bold self-start" onClick={() => google()}>
                Google
            </button>
            <div className="flex flex-col gap-4 w-full mt-6">
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
            </div>
            <button
                type="submit"
                className="bg-secondary-400 font-darker_grotesque text-md px-5 lg:text-xl md:px-6 py-2 mt-8 self-start"
            >
                Entrar
            </button>
        </form>
    );
};

export default Login;
