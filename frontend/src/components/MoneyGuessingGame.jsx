import  useGameLogic  from "../components/useGameLogic";

const moneyGuessingGame = () => {
  const {
    money,
    buttonStates,
    gameOver,
    timeLeft,
    handlePick,
    lossAndProfit,
    endOfTheGame,
    getGameOverMessage,
    reloadGame,
  
  } = useGameLogic();

  const buttonColors = [
    "bg-red-500",
    "bg-blue-500",
    "bg-green-500",
    "bg-yellow-500",
    "bg-purple-500",
    "bg-pink-500",
    "bg-teal-500",
    "bg-indigo-500",
    "bg-orange-500",
    "bg-gray-500",
  ];

  return (
    <div className="border-4 border-gray-50 shadow-xl  p-6 rounded-lg max-w-[400px] mx-auto h-[600px] flex flex-col mt-4">
      <div className="flex flex-col flex-grow">
        {/* Top section */}
        <div className="flex-1 flex flex-col items-center justify-between">
          <button
            className="px-4 py-2 z-30 text-white font-bold rounded-lg bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 hover:from-red-500 hover:via-purple-500 hover:to-blue-500 transition-all duration-500"
            onClick={reloadGame}
          >
            Start The Game
          </button>
          <h1 className="text-[18px] font-bold mt-1 text-purple-600">
            See How Much You Can Win
          </h1>
          <p className="text-[18px] font-bold mt-1 text-pink-500">
            in 10 seconds
          </p>
          <div className="mt-4 pt-3 border-2 border-green-400 rounded bg-gradient-to-r from-blue-200 via-green-100 to-teal-200 w-80 h-14 text-center">
            <p className="text-lg font-bold text-green-700">
              {lossAndProfit()}
            </p>
          </div>
          <h2 className="text-2xl font-extrabold font-poppins mb-4">
            Current Money: ${money}
          </h2>
          <h3 className="text-xl font-bold font-poppins mb-4">
            Time Left: {timeLeft} seconds
          </h3>

          {/* Display the countdown */}
          <div className="grid grid-cols-3 gap-4">
            {Array.from({ length: 10 }, (_, index) => {
              const number = index + 1;
              return (
                <button
                  key={number}
                  onClick={() => handlePick(number)}
                  className={`relative px-4  py-2 rounded text-white ${
                    buttonStates[number] === "won"
                      ? "bg-green-500"
                      : buttonStates[number] === "lost"
                      ? "bg-gray-950"
                      : buttonColors[index] // Apply the unique background color based on the index
                  }`}
                >
                  {number}
                  {buttonStates[number] === "won" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-90 z-10">
                      <small className="font-bold text-red-500">$1000</small>
                    </div>
                  )}
                </button>
              );
            })}
          </div>
          <div className="mt-1 text-lg font-bold border-2 border-purple-400 rounded bg-gradient-to-r from-yellow-200 via-purple-100 to-pink-200 w-80 h-14">
            {gameOver && (
              <p className="pt-3 text-center">{getGameOverMessage()}</p>
            )}
          </div>
        </div>

        {gameOver && (
          <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center text-center p-4 z-10 bg-black bg-opacity-70 rounded-lg">
            {endOfTheGame()}
          </p>
        )}
      </div>
    </div>
  );
};

export default moneyGuessingGame;
