import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axiosClient from "../axios-client";

const UserForm = () => {
    const { id } = useParams();
    const [user, setUser] = useState({
        id: "",
        name: "",
        password: "",
        password_confirmation: "",
    });
    const [loading, setLoading] = useState();
    if (id) {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        useEffect(() => {
            setLoading(true);
            axiosClient
                .get(`/users/${id}`)
                .then(({ data }) => {
                    setLoading(false);
                    setUser(data);
                })
                .catch(() => {
                    setLoading(false);
                });
        }, []);
    }
    return (
        <>
            {user.id && <h1>user name:{user.name}</h1>}
            {!user.id && <h1>new user</h1>}
        </>
    );
};

export default UserForm;
