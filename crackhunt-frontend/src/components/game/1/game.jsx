import React, { useState, useEffect } from "react";
import styles from "./game1.module.css";
import { useNavigate } from "react-router-dom";

const words = [
  "javascript", "react", "developer", "computer", "algorithm",
  "variable", "object", "string", "number", "boolean"
];

const Hangman = () => {
  const [word, setWord] = useState("");
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [mistakes, setMistakes] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [levelCompleted, setLevelCompleted] = useState(false);
  const maxMistakes = 6;
  const navigate = useNavigate();

  useEffect(() => {
    setWord(words[Math.floor(Math.random() * words.length)].toUpperCase());
  }, []);

  const handleGuess = (letter) => {
    if (gameOver || guessedLetters.includes(letter)) return;

    setGuessedLetters(prevLetters => [...prevLetters, letter]);

    if (!word.includes(letter)) {
      setMistakes(prevMistakes => prevMistakes + 1);
    }
  };

  const displayWord = () => {
    return word
      .split("")
      .map(letter => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");
  };

  useEffect(() => {
    if (mistakes >= maxMistakes) {
      setGameOver(true);
    } else if (word && word.split("").every(letter => guessedLetters.includes(letter))) {
      setGameOver(true);
      setLevelCompleted(true);
      // Automatically navigate to next level after 2 seconds
      const timer = setTimeout(() => {
        navigate("/game/2");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [mistakes, guessedLetters, word, navigate]);

  const resetGame = () => {
    setWord(words[Math.floor(Math.random() * words.length)].toUpperCase());
    setGuessedLetters([]);
    setMistakes(0);
    setGameOver(false);
    setLevelCompleted(false);
  };

  return (
    <div className={styles.container}>
      <div className={styles.hangman}>
        <h1>Hangman</h1>
        <p className={styles.word}>{displayWord()}</p>
        <p className={styles.mistakes}>Mistakes: {mistakes} / {maxMistakes}</p>

        <div className={styles.alphabet}>
          {"ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("").map(letter => (
            <button
              key={letter}
              className={styles.letter}
              onClick={() => handleGuess(letter)}
              disabled={guessedLetters.includes(letter) || gameOver}
            >
              {letter}
            </button>
          ))}
        </div>

        <button onClick={resetGame} className={styles.resetButton}>
          Restart
        </button>

        {gameOver && (
          <p className={`${styles.gameOver} ${mistakes >= maxMistakes ? styles.lose : styles.win}`}>
            {mistakes >= maxMistakes 
              ? `You Lost! 😞 The word was ${word}` 
              : "You Won! 🎉 Moving to next level..."}
          </p>
        )}
      </div>
    </div>
  );
};

export default Hangman;