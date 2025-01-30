import React from "react";

import ProblemTable from "../components/ProblemTable";
import useFetchProblems from "../hooks/useFetchProblems";

const ProblemsPage = () => {
  const { problems, loading, error } = useFetchProblems();

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Problems</h1>
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <ProblemTable problems={problems} />
      )}
    </div>
  );
};

export default ProblemsPage;