import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

const UserForm = () => {
    const { id } = useParams();
    const Navigate = useNavigate();
    const [errors, setError] = useState(null);
    const [loading, setLoading] = useState();
    const {setNotification} = useStateContext();
    const [user, setUser] = useState({
        id: null,
        name: "",
        password: "",
        password_confirmation: "",
    });
    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data.data);
                    // debugger;
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }
    function onSubmit(e) {
        e.preventDefault();
        if (user.id) {
            axiosClient
                .put(`/users/${user.id}`, user)
                .then(() => {
                    // NOTIFICATION.
                    setNotification("User updated successfully");
                    Navigate("/users");
                })
                .catch((err) => {
                    console.log(err);
                    const response = err.response;
                    // 422 means validation error
                    if (response && response.status === 422) {
                        setError(response.data.errors);
                    }
                });
        } else {
            axiosClient
                .post(`/users`, user)
                .then(() => {
                    // NOTIFICATION.
                    setNotification("User created successfully");
                    Navigate("/users");
                })
                .catch((err) => {
                    console.log(err);
                    const response = err.response;
                    // 422 means validation error
                    if (response && response.status === 422) {
                        setError(response.data.errors);
                    }
                });
        }
    }
    return (
        <>
            {user.id && <h1>User Name:{user.name}</h1>}
            {!user.id && <h1>New User</h1>}
            <div className="card animated fadeInDown">
                {loading && <div className="text-center">Loading...</div>}
                {errors && (
                    <div className="alert">
                        {Object.keys(errors).map((key) => (
                            <p key={key}>{errors[key][0]}</p>
                        ))}
                    </div>
                )}
                {!loading && (
                    <form onSubmit={onSubmit}>
                        <input
                            type="text"
                            onChange={(ev) =>
                                setUser({ ...user, name: ev.target.value })
                            }
                            value={user.name}
                            placeholder="Name"
                        />
                        <input
                            type="email"
                            onChange={(ev) =>
                                setUser({ ...user, email: ev.target.value })
                            }
                            value={user.email}
                            placeholder="Email"
                        />
                        <input
                            type="password"
                            onChange={(ev) =>
                                setUser({ ...user, password: ev.target.value })
                            }
                            placeholder="Password"
                        />
                        <input
                            type="password"
                            onChange={(ev) =>
                                setUser({
                                    ...user,
                                    password_confirmation: ev.target.value,
                                })
                            }
                            placeholder="Password Confirmation"
                        />
                        <button className="btn">Save</button>
                    </form>
                )}
            </div>
        </>
    );
};

export default UserForm;
