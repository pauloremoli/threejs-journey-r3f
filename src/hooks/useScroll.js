import { useState, useEffect } from "react";

export const useScroll = () => {
    const [state, setState] = useState({ x: 0, y: 0 });
    const [currentSection, setSection] = useState(0);

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleScroll = () => {

        const section = Math.round(window.scrollY / window.innerHeight);
        setSection(section);


        setState((state) => ({
            ...state,
            x: window.scrollX,
            y: window.scrollY,
        }));
    };

    return {
        scrollX: state.x,
        scrollY: state.y,
        currentSection
    };
};
