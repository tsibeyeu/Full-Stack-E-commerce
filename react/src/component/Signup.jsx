/* eslint-disable react/no-unescaped-entities */
import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const Signup = () => {
    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const passwordConfirmationRef = useRef();
    const { setUser, setToken } = useStateContext();
    const [errors, setError] = useState(null);

    function handleSubmit(e) {
        e.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            password_confirmation: passwordConfirmationRef.current.value,
        };
        // console.log(payload)

        axiosClient
            .post("/signup", payload)
            .then(({ data }) => {
                // console.log(data.token);
                setToken(data.token);
                setUser(data.user);
            })
            .catch((err) => {
                const response = err.response;
                // 422 means validation error
                if (response && response.status === 422) {
                    setError(response.data.errors);
                }
            });
    }
    return (
        <div className="login-signup-form animated fadeInDown">
            <div className="form">
                <form onSubmit={handleSubmit}>
                    <h1 className="title">Sign up for free</h1>
                    {errors && (
                        <div className="alert">
                            {Object.keys(errors).map((key) => (
                                <p key={key}>{errors[key][0]}</p>
                            ))}
                        </div>
                    )}
                    <input ref={nameRef} type="text" placeholder="Full Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input
                        ref={passwordRef}
                        type="password"
                        placeholder="Password"
                    />
                    <input
                        ref={passwordConfirmationRef}
                        type="password"
                        placeholder="Password Confirmation"
                    />
                    <button className="btn btn-block">sign in</button>
                    <p className="message">
                        already you're Registered ?{" "}
                        <Link to="/login"> login here</Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Signup;
