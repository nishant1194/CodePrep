import Topbar from '@/components/Topbar/Topbar'
import Workspace from '@/components/Workspace/Workspace'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import axios from 'axios'

type Props = {}

const ProblemPage = (props: Props) => {
  const router = useRouter();
  const { pid } = router.query;

  const [problem, setProblem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!pid) return;
    const fetchProblem = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`/api/problem/${pid}`);
        console.log(response.data.problem);
        setProblem({...response.data.problem});
      } catch (err) {
        setError("Failed to fetch problem");
      } finally {
        setLoading(false);
      }
    };
    fetchProblem();
  }, [pid]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className='bg-[rgb(26,26,26)] text-white h-[100vh]'>
       <Topbar />
      <Workspace problem={problem} />
    </div>
  )
}

export default ProblemPage;
