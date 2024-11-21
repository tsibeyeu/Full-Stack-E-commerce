import { useEffect, useState } from "react";
import axiosClient from "../axios-client";
import { Link } from "react-router-dom";

const User = () => {
    const [users, setUser] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        getUser();
    }, []);

    function getUser() {
        setLoading(true);
        axiosClient
            .get("users")
            .then(({ data }) => {
                console.log(data.data);
                setLoading(false);
                setUser(data.data);
            })
            .catch(() => {
                setLoading(false);
            });
    }

    function onDelete(e, user) {
        e.preventDefault();
        if (!window.confirm("Are you sure you want to delete this user?")) {
            return;
        }
        axiosClient.delete(`/users/${user.id}`).then(() => {
            getUser();
        });
    }

    return (
        <div>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <h1>User</h1>
                <Link to="/users/new" className="btn-add">
                    Add New
                </Link>
            </div>
            <div className="card animated fadeInDown">
                <table>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Created Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    {loading && (
                        <tbody>
                            <tr>
                                <td colSpan="5" className="text-center">
                                    Loading
                                </td>
                            </tr>
                        </tbody>
                    )}
                    {!loading && (
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.created_at}</td>
                                    <td>
                                        <Link
                                            className="btn-edit"
                                            to={`/users/${user.id}`}
                                        >
                                            Edit
                                        </Link>
                                        &nbsp;
                                        <button
                                            onClick={(e) => onDelete(e, user)}
                                            className="btn-delete"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    )}
                </table>
            </div>
        </div>
    );
};

export default User;
