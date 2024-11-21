import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Login = () => {
    const { setUser, setToken } = useStateContext();
    const [errors, setError] = useState(null);
    const emailRef = useRef();
    const passwordRef = useRef();
    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            email: emailRef.current.value,
            password: passwordRef.current.value,
        };
        setError(null);
        axiosClient
            .post("/login", payload)
            .then(({ data }) => {
                console.log(data);
                setToken(data.token);
                setUser(data.user);
            })
            .catch((err) => {
                const response = err.response;
                // 422 means validation error
                console.log("respose",response);
                if (response && response.status === 422) {
                    if (response.data.errors) setError(response.data.errors);
                } else {
                    setError({
                        email: [response.data.message],
                    });
                }
            });
    }

    useEffect(() => {
        console.log("Updated errors:", errors);
    }, [errors]);

    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <h1 className="title"> Login into your account</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <button className="btn btn-block">login</button>
                    <p className="message">
                        Not Registered ?{" "}
                        <Link to="/signup"> create an acount</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
