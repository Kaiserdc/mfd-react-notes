import {Navigate, Route, Routes} from "react-router";
import LoginPage from "./pages/LoginPage";
import NotesPage from "./pages/NotesPage";
import {useAuth} from "./hooks";
import type {AuthContextType} from "./interfaces";
import {NotesProvider} from "./context";

export function App() {
    const user: AuthContextType = useAuth()
    return (
        <>
            <Routes>
                <Route path="/login" element={<LoginPage/>}/>
                <Route path="/notes" element={
                    user ? (
                        <NotesProvider>
                            <NotesPage/>
                        </NotesProvider>
                    ) : (
                        <Navigate to={'/login'} replace/>
                    )
                }/>
                <Route path="*" element={<Navigate to="/login" replace/>}/>

            </Routes>
        </>
    )
}

