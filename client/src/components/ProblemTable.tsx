import React from "react";
import ProblemRow from "./ProblemRow";

const ProblemTable = ({ problems }: { problems: { id: number; title: string; difficulty: string }[] }) => {
  return (
    <table className="w-full border-collapse border border-gray-300">
      <thead>
        <tr className="bg-gray-200">
          <th className="border p-2 text-left">ID</th>
          <th className="border p-2 text-left">Title</th>
          <th className="border p-2 text-left">Difficulty</th>
        </tr>
      </thead>
      <tbody>
        {problems.map((problem) => (
          <ProblemRow problem={problem} />
        ))}
      </tbody>
    </table>
  );
};

export default ProblemTable;