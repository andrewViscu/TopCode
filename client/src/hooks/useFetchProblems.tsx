import { useEffect, useState } from "react";

const useFetchProblems = () => {
    type Problem = { id: number; title: string; difficulty: string };
    const [problems, setProblems] = useState<Problem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/problems")
      .then((res) => res.json())
      .then((data) => {
        setProblems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch problems.");
        setLoading(false);
      });
  }, []);

  return { problems, loading, error };
};

export default useFetchProblems;