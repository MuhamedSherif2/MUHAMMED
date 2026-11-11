"use client";

import { useEffect, useState } from "react";
import StrokeText from "@/components/StrokeText";

const DURATION = 3500;

// بيفضل true طول ما التاب مفتوح ومعملتش refresh
let introDone = false;

const IntroScreen = () => {
    const [visible, setVisible] = useState(true);
    const [fading, setFading] = useState(false);

    useEffect(() => {
        // لو الـ intro خلصت قبل كده (تنقل بين صفحات) اخفيها فوراً
        if (introDone) {
            setVisible(false);
            return;
        }

        document.body.style.overflow = "hidden";

        const fadeTimer = setTimeout(() => setFading(true), DURATION);
        const endTimer = setTimeout(() => {
            introDone = true; // علّم إنها خلصت بعد ما تخلص فعلاً
            setVisible(false);
            document.body.style.overflow = "";
        }, DURATION + 700);

        return () => {
            clearTimeout(fadeTimer);
            clearTimeout(endTimer);
            document.body.style.overflow = "";
        };
    }, []);

    if (!visible) return null;

    return (
        <div
            className={`fixed inset-0 z-100 flex items-center justify-center bg-background transition-opacity duration-700 ${fading ? "opacity-0" : "opacity-100"
                }`}
        >
            <div className="w-[90vw] max-w-3xl text-text">
                <StrokeText
                    text="MUHAMAD SHERIF"
                    strokeColor="#7C3AED"
                    shadow
                    shadowColor="#2563EB"
                    fontSize={96}
                    fontWeight={800}
                    letterSpacing={-2}
                    strokeWidth={1.6}
                    drawDuration={1.8}
                    stagger={0.07}
                    fillMode="wipe"
                    wipeFrom="left"
                />
            </div>
        </div>
    );
};

export default IntroScreen;