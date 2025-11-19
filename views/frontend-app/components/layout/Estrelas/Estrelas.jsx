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

    return (
        <div className={styles.starsContainer}>
            {[1, 2, 3, 4, 5].map((i) => (
                <span
                    key={i}
                    className={i <= Math.round(rating) ? styles.starFilled : styles.starEmpty}
                    onClick={() => handleClick(i)}
                >
                    ★
                </span>
            ))}
        </div>
    );
}
