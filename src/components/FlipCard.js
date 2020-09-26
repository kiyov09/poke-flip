import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import './FlipCard.css';

const FlipCard = ({ info, flipped, className, onClick, index, disabled }) => {

    const [isFlipped, setIsFlipped] = useState(flipped);

    useEffect(() => {
        setIsFlipped(flipped);
    }, [flipped])

    const onCardClick = () => {
        if (disabled) return;

        setIsFlipped(!isFlipped);
        onClick(info);
    }

    return (
        <motion.div
            className={`flipCard relative ${ className }`}
            onClick={ onCardClick }
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: 0.8+ ((index - (index / 2)) / 4)}}
        >
            <div className={
                `flipCard__inner h-full w-full ${ isFlipped ? 'flipCard__inner--rotate' : '' }`
            }>
                <div className="flipCard__side flipCard__side--front bg-blue-800 border-solid border-white border-4 rounded-md h-full w-full absolute shadow-2xl flex items-center justify-center ">
                    <img src="./images/Poke_Ball_Vector.png" alt="Pokeball" />
                </div>
                <div className="flipCard__side flipCard__side--back bg-gray-300 border-solid border-gray-200 border-4 h-full w-full absolute shadow-2xl flex items-center justify-center rounded-md ">
                    <img src={ info.image } alt="value" />
                </div>
            </div>
        </motion.div>
    );
}

export default FlipCard;
