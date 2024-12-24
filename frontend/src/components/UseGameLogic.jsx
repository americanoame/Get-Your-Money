import { useState, useEffect } from "react";

 const  useGameLogic = () => {
  const [money, setMoney] = useState(1000); // Initial money state
  const [buttonStates, setButtonStates] = useState({}); // Track the state (win/lose) of each button
  const [clickedButtons, setClickedButtons] = useState({});
  const [gameOver, setGameOver] = useState(false);
  const [timeLeft, setTimeLeft] = useState(10); // Time left in seconds

  useEffect(() => {
    // Set a timeout of 10 seconds to end the game
    if (timeLeft === 0) {
      setGameOver(true); // End the game when time reaches 0
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - 1); // Decrease timeLeft every second
    }, 1000);

    return () => clearInterval(timer); // Clean up the timer when the component unmounts or timeLeft reaches 0
  }, [timeLeft]); // Only run this effect when timeLeft changes

  const handlePick = (number) => {
    if (gameOver || clickedButtons[number]) return; // Prevent further clicks on the same button

    const winningNumber = Math.ceil(Math.random() * 10); // Generate winning number dynamically

    setButtonStates(() => {
      const newState = { [number]: number === winningNumber ? "won" : "lost" }; // Reset all other states
      if (number === winningNumber) {
        setMoney((prevMoney) => prevMoney + 1000); // Increase money for winning
      } else {
        setMoney((prevMoney) => Math.max(0, prevMoney - 100)); // Decrease money for losing
      }
      return newState; // Return new state with only the clicked button's state
    });

    setClickedButtons({ [number]: true }); 
    // indicating that the button with that specific number has been clicked. It overwrites any previous state, 
    // so only the clicked button is marked as true.
  };

  const lossAndProfit = () => {
    if (money < 1000) {
      return (
        <span className="text-red-600 font-bold">You lost {money - 1000}</span>
      );
    } else if (money > 1000) {
      return (
        <span className="text-green-600 font-bold">
          You made a profit of ${money - 1000}
        </span>
      );
    }
  };

  const getGameOverMessage = () => {
    if (money <= 0) {
      return (
        <span className="text-red-600 font-bold">
          Wow! You lost all your money!
        </span>
      );
    } else if (money > 1000) {
      return (
        <span className="text-green-500 font-bold">
          Congratulations,{" "}
          <span>
            You made ${money - 1000}!
          </span>
        </span>
      );
    } else if (money < 1000) {
      return (
        <span>
          <span className="text-red-600 font-bold">
            You finished with a loss of {money - 1000}
          </span>
        </span>
      );
    }
  };

  const endOfTheGame = () => {
    if (gameOver) {
      return <span className="text-white font-bold">Game Over</span>;
    }
  };

  const reloadGame = () => {
    setMoney(1000);
    setButtonStates({});
    setClickedButtons({});
    setGameOver(false);
    setTimeLeft(10);
  };

  return {
    money,
    buttonStates,
    clickedButtons,
    gameOver,
    endOfTheGame,
    timeLeft,
    handlePick,
    lossAndProfit,
    getGameOverMessage,
    reloadGame,
  };
};

export default useGameLogic;