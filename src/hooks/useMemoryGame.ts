import { useState, useEffect, useCallback } from 'react';
import { GameState, CardType } from '../types/game';
import { createDeck } from '../utils/gameHelpers';

export const useMemoryGame = () => {
  const [gameState, setGameState] = useState<GameState>({
    cards: [],
    flippedCards: [],
    moves: 0,
    isGameOver: false,
    startTime: null,
    endTime: null,
    isStarted: false
  });

  const startGame = useCallback(() => {
    setGameState({
      cards: createDeck(),
      flippedCards: [],
      moves: 0,
      isGameOver: false,
      startTime: Date.now(),
      endTime: null,
      isStarted: true
    });
  }, []);

  // Handle card click
  const handleCardClick = useCallback((clickedCard: CardType) => {
    if (!gameState.isStarted) return;

    setGameState(prevState => {
      // Ignore clicks if card is already flipped, matched, or we already have 2 cards flipped
      if (
        clickedCard.isFlipped ||
        clickedCard.isMatched ||
        prevState.flippedCards.length >= 2
      ) {
        return prevState;
      }

      // Flip the card
      const updatedCards = prevState.cards.map(card =>
        card.id === clickedCard.id ? { ...card, isFlipped: true } : card
      );

      const updatedFlippedCards = [...prevState.flippedCards, clickedCard];

      // If we have 2 cards flipped, check for a match
      if (updatedFlippedCards.length === 2) {
        const [first, second] = updatedFlippedCards;
        
        // Check if values match
        if (first.value === second.value) {
          // Set the matched cards
          setTimeout(() => {
            setGameState(prev => {
              const matchedCards = prev.cards.map(card =>
                card.id === first.id || card.id === second.id
                  ? { ...card, isMatched: true }
                  : card
              );

              // Check if all cards are matched to end the game
              const allMatched = matchedCards.every(card => card.isMatched);
              
              return {
                ...prev,
                cards: matchedCards,
                flippedCards: [],
                isGameOver: allMatched,
                endTime: allMatched ? Date.now() : null
              };
            });
          }, 500);
        } else {
          // If no match, flip the cards back
          setTimeout(() => {
            setGameState(prev => ({
              ...prev,
              cards: prev.cards.map(card =>
                card.id === first.id || card.id === second.id
                  ? { ...card, isFlipped: false }
                  : card
              ),
              flippedCards: []
            }));
          }, 1000);
        }

        // Increment moves when two cards are flipped
        return {
          ...prevState,
          cards: updatedCards,
          flippedCards: updatedFlippedCards,
          moves: prevState.moves + 1
        };
      }

      // First card flip
      return {
        ...prevState,
        cards: updatedCards,
        flippedCards: updatedFlippedCards
      };
    });
  }, [gameState.isStarted]);

  // Calculate game statistics
  const gameTime = gameState.endTime && gameState.startTime
    ? gameState.endTime - gameState.startTime
    : gameState.startTime
      ? Date.now() - gameState.startTime
      : 0;

  return {
    cards: gameState.cards,
    moves: gameState.moves,
    isGameOver: gameState.isGameOver,
    gameTime,
    handleCardClick,
    startGame,
    isGameStarted: gameState.isStarted
  };
};