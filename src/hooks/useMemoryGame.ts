import { useState, useEffect, useCallback, useRef } from 'react';
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
  const [lastMatchedCard, setLastMatchedCard] = useState<CardType | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseStartTime, setPauseStartTime] = useState<number | null>(null);
  const [totalPausedTime, setTotalPausedTime] = useState(0);
  const lastActivityRef = useRef<number>(Date.now());
  const inactivityTimeoutRef = useRef<NodeJS.Timeout>();

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
    setLastMatchedCard(null);
    setIsPaused(false);
    setPauseStartTime(null);
    setTotalPausedTime(0);
    lastActivityRef.current = Date.now();
  }, []);

  // Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimeoutRef.current) {
      clearTimeout(inactivityTimeoutRef.current);
    }
    
    if (gameState.isStarted && !gameState.isGameOver) {
      lastActivityRef.current = Date.now();
      
      // If game was paused, resume it
      if (isPaused && pauseStartTime) {
        const pauseDuration = Date.now() - pauseStartTime;
        setTotalPausedTime(prev => prev + pauseDuration);
        setIsPaused(false);
        setPauseStartTime(null);
      }

      // Set new inactivity timeout
      inactivityTimeoutRef.current = setTimeout(() => {
        setIsPaused(true);
        setPauseStartTime(Date.now());
      }, 15000); // 15 seconds
    }
  }, [gameState.isStarted, gameState.isGameOver, isPaused, pauseStartTime]);

  // Handle card click
  const handleCardClick = useCallback((clickedCard: CardType) => {
    if (!gameState.isStarted || isPaused) return;

    // Reset inactivity timer on any card click
    resetInactivityTimer();

    setGameState(prevState => {
      // Check if all pairs are matched except the unpaired card
      const allPairsMatched = prevState.cards
        .filter(card => !card.isUnpaired)
        .every(card => card.isMatched);

      // If clicked card is unpaired and not all pairs are matched, ignore the click
      if (clickedCard.isUnpaired && !allPairsMatched) {
        return prevState;
      }

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

      // If this is the unpaired card and all pairs are matched
      if (clickedCard.isUnpaired && allPairsMatched) {
        setTimeout(() => {
          setLastMatchedCard(clickedCard);
          setGameState(prev => ({
            ...prev,
            cards: prev.cards.map(card =>
              card.id === clickedCard.id
                ? { ...card, isFlipped: true, isMatched: true }
                : card
            ),
            flippedCards: [],
            isGameOver: true,
            endTime: Date.now()
          }));
        }, 500);

        return {
          ...prevState,
          cards: updatedCards,
          moves: prevState.moves + 1
        };
      }

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
              
              return {
                ...prev,
                cards: matchedCards,
                flippedCards: []
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
  }, [gameState.isStarted, isPaused, resetInactivityTimer]);

  // Initialize inactivity timer when game starts
  useEffect(() => {
    if (gameState.isStarted && !gameState.isGameOver) {
      resetInactivityTimer();
    }

    return () => {
      if (inactivityTimeoutRef.current) {
        clearTimeout(inactivityTimeoutRef.current);
      }
    };
  }, [gameState.isStarted, gameState.isGameOver, resetInactivityTimer]);

  // Calculate game statistics - always show current elapsed time
  const gameTime = gameState.endTime && gameState.startTime
    ? gameState.endTime - gameState.startTime - totalPausedTime
    : gameState.startTime
      ? Date.now() - gameState.startTime - totalPausedTime - (isPaused && pauseStartTime ? Date.now() - pauseStartTime : 0)
      : 0;

  return {
    cards: gameState.cards,
    moves: gameState.moves,
    isGameOver: gameState.isGameOver,
    gameTime,
    handleCardClick,
    startGame,
    isGameStarted: gameState.isStarted,
    lastMatchedCard,
    isPaused
  };
};