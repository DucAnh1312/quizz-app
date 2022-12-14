import React, { Suspense } from "react"
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import LoadingComponent from "../components/LoadingComponent/LoadingComponent";
import PlayComponent from "../components/PlayComponent/MainComponent/PlayComponent";
import ROUTES from "../config/ROUTES";
import ProtectedRoute from "./ProtectedRoute";

const Routing = () => {
    return (
        <Router>
            <Suspense fallback={<LoadingComponent/>}>
                <Routes>
                    {ROUTES.map((route, index) => {
                        if (!route.role) {
                            return <Route key={index} path={route.path} element={route.component} />
                        } else {
                            return <Route key={index} path={route.path} element={<ProtectedRoute role={route.role}>{route.component}</ProtectedRoute>} />
                        }
                    })}
                    <Route path='/' element={<ProtectedRoute role={'user'}><PlayComponent/></ProtectedRoute>} />
                    <Route path='*' element={<>404 Error</>} />
                </Routes>
            </Suspense>
        </Router>
    )
}
export default Routing;