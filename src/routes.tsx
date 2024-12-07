import Homepage from "./pages/homepage";
import NotFound from "./pages/not-found";

export default [
    {
        path: "/gencap",
        element: <Homepage />,
        errorElement: <NotFound />,
    },
];
