import { Link } from "react-router-dom";

const Games = () => {
  return (
    <div className="flex flex-col items-center gap-4 p-4">
      <h1 className="text-2xl font-bold">Select a Game</h1>
      <Link to="/tic-tac-toe" className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Play Tic-Tac-Toe
      </Link>
      {/* Add links for other games later */}
    </div>
  );
};

export default Games;
