import React, { useState, useEffect } from 'react';

import { shuffle, find } from 'lodash';

import CardsContainer from './components/CardsContainer';
import FlipCard from './components/FlipCard';

import PokeApi from './api/PokeApi';


const App = () => {

    const [flippedCards, setFlippedCards] = useState([]);
    const [found, setFound] = useState([]);
    const [items, setItems] = useState(null);
    const [done, setDone] = useState(true);

    const isCardFlipped = card => find(flippedCards, card);
    const isCardFound = card => find(found, card);

    const onCardFlipped = (card) => {
        if (isCardFlipped(card)) {
            setFlippedCards(flippedCards.filter(i => {
                return i.id !== card.id
            }));
            return;
        }

        setFlippedCards([...flippedCards, card]);
    }

    useEffect(() => {
        const timer = setTimeout( () => {
            if (flippedCards.length >= 2) {
                const [a, b] = flippedCards;
                if (a.value === b.value) {
                    setFound([...found, a, b]);
                    setFlippedCards([]);
                } else {
                    setFlippedCards([]);
                }
            }
        }, 500);

        return () => {
            clearTimeout(timer);
        }
    }, [flippedCards, found]);

    useEffect(() => {
        if (items && found.length === items.length) {
            setTimeout(() => {
                setDone(true);
            }, 1000);
        }
    }, [found, items])

    useEffect(() => {
        if (!done) return;

        (async () => {
            const res = await PokeApi.list();
            const newItems = [...res, ...res].map(
                (i, index) => ({...i, id: i.id + index })
            )
            setFlippedCards([]);
            setFound([]);
            setItems(shuffle(newItems));
            setDone(false);
        })()
    }, [done]);

    return (
        <div className="bg-blue-700 h-screen w-screen shadow-inner">
            <div className="container text-center m-auto p-2 max-w-xl pb-8">
                <h1 className="text-6xl m-auto inline-block"
                    style={{ fontFamily: "Pokemon", color: '#ffcc03' }}>Poke Flip</h1>

                <CardsContainer>
                    { items && items.map( (card, index) => {
                        const isFound = isCardFound(card);
                        const isFlipped = isCardFlipped(card);

                        return (
                            <FlipCard
                                className={isFound ? 'opacity-50' : ''}
                                key={ card.id + '_' + index }
                                info={ card }
                                index={index}
                                flipped={ isFlipped || isFound }
                                onClick={ onCardFlipped }
                                disabled={ flippedCards.length >= 2 || isFound }
                            />
                        )
                    }) }
                </CardsContainer>
            </div>
        </div>
    );
}

export default App;
