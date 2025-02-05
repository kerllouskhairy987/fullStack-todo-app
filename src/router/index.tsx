import { createBrowserRouter, createRoutesFromElements, Route } from "react-router";
import RootLayout from "../pages/Layout";
import ProtectedRoute from "../auth/ProtectedRoute";
import Login from "../pages/Login";
import ErrorHandler from "../errors/ErrorHandler";
import Register from "../pages/Register";
import HomePage from "../pages";
import TodoList from "../components/TodoList";
import TodosPage from "../pages/Todos";
import ForgetPassword from "../pages/ForgetPassword";
import ForgetPasswordForm from "../pages/ResetPassword";

const storageKey = "loggedInUser"
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;
console.log("user data from local storage ", userData);


const router = createBrowserRouter(
    createRoutesFromElements(
        <>
            {/* Root Layout */}
            <Route path="/" element={<RootLayout />} errorElement={<ErrorHandler />} >

                <Route index element={<ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login" data={userData}>
                    {/* <HomePage /> */}
                    <TodoList />
                </ProtectedRoute>} />

                <Route path="todos" element={<ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login" data={userData}>
                    <TodosPage />
                </ProtectedRoute>} />

                <Route path="profile" element={<ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login" data={userData}>
                    <h2>Profile Page</h2>
                </ProtectedRoute>} />

                <Route path="login" element={<ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/" data={userData}>
                    <Login />
                </ProtectedRoute>} />

                <Route path="register" element={<ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/login" data={userData}>
                    <Register />
                </ProtectedRoute>} />

                <Route path="forget-password" element={<ProtectedRoute isAllowed={!userData?.jwt} redirectPath="/login" data={userData}>
                    <ForgetPassword />
                </ProtectedRoute>} />

                <Route path="reset-password" element={<ProtectedRoute isAllowed={userData?.jwt} redirectPath="/login" data={userData}>
                    <ForgetPasswordForm />
                </ProtectedRoute>} />

            </Route>
        </>
    )
);

export default router;