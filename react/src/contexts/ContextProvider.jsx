/* eslint-disable react/prop-types */
import { createContext, useContext, useState } from "react";

const StateContext = createContext({
    user: null,
    token: null,
    setUser: () => {},
    setToken: () => {},
});
const ContextProvider = ({ children }) => {
    const [user, setUser] = useState({ });
    const [token, _setToken] = useState(localStorage.getItem("ACCESS_TOKEN"));

    function setToken(token) {
        _setToken(token);
        if (token) {
            localStorage.setItem("ACCESS_TOKEN", token);
        } else {
            localStorage.removeItem("ACCESS_TOKEN");
        }
    }
    return (
        <StateContext.Provider value={{ user, token, setUser, setToken }}>
            {children}
        </StateContext.Provider>
    );
};

function useStateContext() {
    const context = useContext(StateContext);
    return context;
}

export { ContextProvider, useStateContext };
