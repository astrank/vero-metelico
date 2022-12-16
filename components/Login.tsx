import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useAuth } from "../utils/Auth";
import Button from "../components/Button";

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
            className="flex flex-col justify-center text-primary-900 p-4"
        >
            <h1 className="text-4xl font-bold mb-10">
                Ingresa con tu cuenta
            </h1>
            {error && (
                <label htmlFor="" className="text-red-600 py-4">
                    {`Wrong Email or Password`}
                </label>
            )}
            <button className="text-white flex gap-4 items-center justify-center px-4 py-2 bg-google border border-2 rounded text-sm border-google-hover hover:bg-google-hover" onClick={() => google()}>
                <svg xmlns="http://www.w3.org/2000/svg" width="13" height="12" viewBox="0 0 13 12">  <g fill="none" fill-rule="evenodd" transform="translate(-1.488 -2)">    <rect width="16" height="16"/>    <path fill="#FFFFFF" fill-rule="nonzero" d="M0.652734375,3.29528244 C0.237984375,4.10583206 2.84217094e-14,5.0160458 2.84217094e-14,5.97938931 C2.84217094e-14,6.94273282 0.237984375,7.85290076 0.652734375,8.66345038 C1.65904687,10.6167023 3.72609375,11.9587786 6.11953125,11.9587786 C7.77178125,11.9587786 9.15885937,11.4272519 10.1720156,10.5104427 C11.3279062,9.46735878 11.9942812,7.93264122 11.9942812,6.11225954 C11.9942812,5.62062595 11.9534531,5.2618626 11.8650937,4.88981679 L6.11953125,4.88981679 L6.11953125,7.10880916 L9.49204687,7.10880916 C9.42407812,7.66025954 9.05690625,8.49073282 8.24095312,9.04877863 C7.72420312,9.40090076 7.03064062,9.64671756 6.11953125,9.64671756 C4.50126562,9.64671756 3.12778125,8.60367939 2.63817187,7.16198473 L2.62871205,7.16276959 C2.50534158,6.79729468 2.43421875,6.38112285 2.43421875,5.97938931 C2.43421875,5.56745038 2.50898438,5.16883969 2.631375,4.79679389 C3.12778125,3.35509924 4.50126562,2.31201527 6.11953125,2.31201527 C7.268625,2.31201527 8.04375,2.79700763 8.48573437,3.20230534 L10.2127969,1.55464122 C9.15210937,0.59129771 7.77178125,8.8817842e-16 6.11953125,8.8817842e-16 C3.72609375,8.8817842e-16 1.65904687,1.34203053 0.652734375,3.29528244 L0.652734375,3.29528244 Z" transform="translate(2 2)"/>  </g></svg>
                <span className="mt-0.5">Entra con Google</span>
            </button>
            <form onSubmit={formik.handleSubmit} className="flex flex-col gap-4 w-full mt-8">
                <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="font-darker_grotesque text-lg">
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
                <div className="flex flex-col gap-2">
                    <label htmlFor="password" className="font-darker_grotesque text-lg">
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
                <Button text="Entrar" type="submit" />
            </form>
        </div>
    );
};

export default Login;
