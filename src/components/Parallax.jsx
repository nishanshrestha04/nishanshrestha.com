"use client";

import { useScroll, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { motion } from "motion/react";
import React, { useEffect } from "react";

const Parallax = ({ mouseX = 0, mouseY = 0 }) => {
    const ref = React.useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start start", "end start"],
    });

    // Scroll-based transforms
    const scrollSpring = useSpring(scrollYProgress, { damping: 50 });
    const scrollMountain3Y = useTransform(scrollSpring, [0, 1], [0, 30]);
    const scrollPlanetsX = useTransform(scrollSpring, [0, 1], [0, -20]);
    const scrollMountain2Y = useTransform(scrollSpring, [0, 1], [0, 15]);
    const scrollMountain1Y = useTransform(scrollSpring, [0, 1], [0, 5]);

    // Mouse-based transforms (calculated from props)
    const mouseMountain3X = mouseX * 15;
    const mouseMountain3Y = mouseY * 10;
    const mousePlanetsX = mouseX * 25;
    const mousePlanetsY = mouseY * 15;
    const mouseMountain2X = mouseX * 10;
    const mouseMountain2Y = mouseY * 8;
    const mouseMountain1X = mouseX * 5;
    const mouseMountain1Y = mouseY * 5;

    // Combined transforms
    const mountain3Transform = useMotionTemplate`translateX(${mouseMountain3X}px) translateY(calc(${scrollMountain3Y}% + ${mouseMountain3Y}px))`;
    const planetsTransform = useMotionTemplate`translateX(calc(${scrollPlanetsX}% + ${mousePlanetsX}px)) translateY(${mousePlanetsY}px)`;
    const mountain2Transform = useMotionTemplate`translateX(${mouseMountain2X}px) translateY(calc(${scrollMountain2Y}% + ${mouseMountain2Y}px))`;
    const mountain1Transform = useMotionTemplate`translateX(${mouseMountain1X}px) translateY(calc(${scrollMountain1Y}% + ${mouseMountain1Y}px))`;

    return (
        <section 
            ref={ref} 
            className="absolute inset-0 pointer-events-none"
        >
            <div className="relative h-screen">
                <div
                    className="absolute inset-0 w-full h-screen"
                    style={{
                        backgroundImage: "url(/assets/sky.jpg)",
                        backgroundSize: "cover",
                        backgroundPosition: "bottom",
                    }}
                />

                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url(/assets/mountain-3.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "bottom",
                        transform: mountain3Transform,
                    }}
                />

                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url(/assets/planets.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "bottom",
                        transform: planetsTransform,
                    }}
                />

                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url(/assets/mountain-2.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "bottom",
                        transform: mountain2Transform,
                    }}
                />

                <motion.div
                    className="absolute inset-0"
                    style={{
                        backgroundImage: "url(/assets/mountain-1.png)",
                        backgroundSize: "cover",
                        backgroundPosition: "bottom",
                        transform: mountain1Transform,
                    }}
                />
                <div className="absolute inset-0 bg-black/40" />
            </div>
        </section>
    );
};

export default Parallax;
