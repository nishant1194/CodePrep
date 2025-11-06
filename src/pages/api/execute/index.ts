import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { code, language, stdin } = req.body;

  console.log("stdin:", stdin);
  console.log("language:", language);
  console.log(code);

  try {
    const response = await axios.post(
      'https://api.jdoodle.com/v1/execute',
      {
        script: code,
        stdin: stdin,
        language: language,
        versionIndex: '2',
        clientId: '5f224a9c870399fe970ebfb3cdfdc097',
        clientSecret: '6126437b29b6cf171174cae7438458f705d2e470af6225d775c54991f13ad5fc',
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error("JDoodle error:", error.response?.data || error.message);
    res.status(500).json({
      error: error.response?.data?.error || 'Execution failed',
    });
  }
}
