import ReactDOM from 'react-dom/client'
import {App} from './App.tsx'

import '@mantine/core/styles.css'
import {MantineProvider} from "@mantine/core";
import {BrowserRouter} from "react-router-dom";

import {AuthProvider} from "./context";

import './assets/index.css'
ReactDOM.createRoot(document.getElementById('root')!).render(
    <MantineProvider defaultColorScheme="light">
        <BrowserRouter>
            <AuthProvider>
                <App/>
            </AuthProvider>
        </BrowserRouter>
    </MantineProvider>
)
