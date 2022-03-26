import { useState, useEffect } from "react";

export const useMove = () => {
    const [state, setState] = useState({ x: 0, y: 0 });

    useEffect(() => {
        window.addEventListener("mousemove", handleMouseMove);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
        };
    }, []);

    const handleMouseMove = (e) => {
        setState((state) => ({
            ...state,
            x: e.clientX / window.innerWidth - 0.5,
            y: e.clientY / window.innerHeight - 0.5,
        }));
    };
    return {
        mouseX: state.x,
        mouseY: state.y,
    };
};
