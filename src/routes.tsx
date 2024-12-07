import Homepage from "./pages/homepage";
import NotFound from "./pages/not-found";

export default [
    {
        path: "/",
        element: <Homepage />,
        errorElement: <NotFound />,
    },
];
