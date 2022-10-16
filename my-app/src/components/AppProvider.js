import React, {createContext, useEffect, useState } from "react";
import { ThemeProvider } from 'styled-components';
// import { theme } from './../styles/';
import { GlobalStyles, theme } from './../styles';

export const AppContext = createContext();

const AppProvider = ({ children }) => {
    const [themeMode, setThemeMode] = useState(
        localStorage.getItem("theme") || "lightTheme"
    );

    const costumTheme = theme[themeMode];

    const toggleTheme = () => {
        setThemeMode(prevState => {
            if (prevState === 'lightTheme'){
                return 'darkTheme'
            } else {
                return 'lightTheme'
            }
        })
    }

    const value = { toggleTheme, themeMode };

    // const [themeMode, setThemeMode] = useState(
    //     localStorage.getItem("theme") || "lightTheme"
    // );

    useEffect(() => {
        localStorage.setItem("theme", themeMode);
    }, [themeMode]);

    return (
    <AppContext.Provider value = {value}>
        <ThemeProvider theme = {costumTheme}>
            <GlobalStyles />
            {children}
        </ThemeProvider>
    </AppContext.Provider>
    );
};

export default AppProvider;