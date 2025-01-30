import React from "react";

const difficultyColors: Record<string, string> = {
    Easy: "text-green-500",
    Medium: "text-yellow-500",
    Hard: "text-red-500",
  };
  
  const ProblemRow = ({ problem }: { problem: { id: number; title: string; difficulty: string } }) => {
    return (
      <tr className="border">
        <td className="border p-2">{problem.id}</td>
        <td className="border p-2 text-blue-500 hover:underline cursor-pointer">{problem.title}</td>
        <td className={`border p-2 font-semibold ${difficultyColors[problem.difficulty]}`}>
          {problem.difficulty}
        </td>
      </tr>
    );
  };
  
  export default ProblemRow;