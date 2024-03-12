import React, { lazy } from "react";

export const Signin = lazy(() => import("../views/authentication/sign-in"));
const Signup = lazy(() => import("../views/authentication/register"));
const Dashboard = lazy(() => import("../views/workspaces/dashboard"));

export const AuthRoutes = [
  { id: "signin", url: "/", element: <Signin /> },
  { id: "signin-2", url: "/signup", element: <Signup /> },
  { id: "dashboard", url: "/dashboard", element: <Dashboard /> },
];
