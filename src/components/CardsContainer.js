import React from 'react';
import { motion } from 'framer-motion';

const CardsContainer = ({ children }) => {
    return (
        <motion.div className={
            `grid grid-flow-row grid-cols-4 grid-rows-4 gap-4 p-6`
        }
            layout
        >
            {
                children
            }
        </motion.div>
    );
}

export default CardsContainer;
