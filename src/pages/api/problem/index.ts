
import dbConnect from "@/lib/dbConnect";
import ProblemModel from "@/models/Problem.model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    await dbConnect();
  if (req.method === "GET") {
    try {
        const problems = await ProblemModel.find();
        res.status(200).json({ 
            problems: problems,
            message:"problems fetched " 
        });
     } catch (error) {
        console.log("problems fetched faild",error);
        res.status(500).json({ 
            message:"Some error in fetching problems." 
        });
    }
  } else if (req.method === "POST") {
    try {
        const data = req.body;
        const problem = await ProblemModel.create(data) ;
        res.status(201).json({ message: "Create item", problem });
        
    } catch (error) {
        console.log("Some error in adding problems" ,error);
         res.status(500).json({ 
            message:"Some error in adding problems."
        });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
