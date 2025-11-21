import { useState, useEffect } from "react";
import styles from "./App.module.css";

export function StarRating({ value = 0, onChange, readOnly = false }) {
    const [rating, setRating] = useState(value);

    useEffect(() => {
        setRating(value);
    }, [value]);

    const handleClick = (index) => {
        if (readOnly) return;
        setRating(index);
        if (onChange) onChange(index);
    };

    const getStarClass = (i) => {
        const diff = rating - i;

        if (rating >= i) {
            return styles.starFilled; // estrela cheia
        }

        // meia estrela quando o valor está entre (i - 1) e (i - 0.5)
        if (rating >= i - 0.5) {
            return styles.starHalf;
        }

        return styles.starEmpty;
    };

    return (
        <div className={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
                <span
                    key={i}
                    className={getStarClass(i)}
                    onClick={() => handleClick(i)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}