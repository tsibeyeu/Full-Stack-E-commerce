/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    notification: null,
    setUser: () => {},
    setToken: () => {},
    setNotification: () => {},
});
const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({});
    const [notification, _setNotification] = useState("");
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    function setNotification(message) {
        _setNotification(message);
        setTimeout(() => {
            _setNotification("");
        }, 5000);
    }

    function setToken(token) {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }
    return (
        <StateContext.Provider
            value={{
                user,
                token,
                setUser,
                setToken,
                notification,
                setNotification,
            }}
        >
            {children}
        </StateContext.Provider>
    );
};

function useStateContext() {
    const context = useContext(StateContext);
    return context;
}

export { ContextProvider, useStateContext };
