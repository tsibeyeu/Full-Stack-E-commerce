/* eslint-disable react-hooks/rules-of-hooks */
import { Outlet, Navigate, Link } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import { useEffect } from "react";
import axiosClient from "../axios-client";

const DefaultLayout = () => {
    const { user, token, notification, setUser, setToken } = useStateContext();

    if (!token) {
        return <Navigate to="/login" />;
    }

    function handleLogout(e) {
        e.preventDefault();
        axiosClient.post("/logout").then(() => {
            setUser({});
            setToken(null);
        });
    }
    useEffect(() => {
        axiosClient.get("/user").then(({ data }) => {
            setUser(data);
        });
    }, []);
    return (
        <div id="defaultLayout">
            <aside>
                <Link to="/dashboard">Dashboard</Link>
                <Link to="/users">User</Link>
            </aside>
            <div className="content">
                {notification && (
                    <div className="notification">{notification}</div>
                )}
                <header>
                    <div>Header</div>
                    <div>
                        {user.name}
                        <a
                            className="btn-logout"
                            href="#"
                            onClick={handleLogout}
                        >
                            logout
                        </a>
                    </div>
                </header>
                <main>
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DefaultLayout;
