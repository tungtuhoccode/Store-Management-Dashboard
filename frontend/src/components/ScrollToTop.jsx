import React from 'react'
import { useLocation } from 'react-router-dom'
export default function ScrollToTop() {
    const location = useLocation();

    React.useEffect(() => {
        window.scrollTo({ top: 0, behavior: "smooth" })
    }, [location.search, location.pathname]);
    return null;
}

