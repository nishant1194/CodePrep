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

  // Validate required fields
  if (typeof code !== 'string' || typeof language !== 'string' || (typeof stdin !== 'string' && !Array.isArray(stdin))) {
    return res.status(400).json({ error: 'Invalid or missing required fields' });
  }

  
console.log(stdin+ "  == stdin");
console.log(language)
 
  try {
    const response = await axios.post('https://api.jdoodle.com/v1/execute', {
      script: code,
      stdin: stdin,
      language,
      versionIndex: '5',
      clientId: 'c8748c725528490e1195c4d47b2d5747', // ⚠️ Use environment variables in production
      clientSecret: 'a4ca964244206bc1abd16bbcb15a4d2b251caa3a234b4580b894e32e10a22e9a', // ⚠️ Use environment variables
    });

    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error: any) {
    console.error(error);
    res.status(500).json({
      error: error.response?.data?.message || 'Execution failed',
    });
  }
}
