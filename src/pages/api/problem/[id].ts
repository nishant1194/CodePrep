// pages/api/items/[id].ts

import dbConnect from "@/lib/dbConnect";
import ProblemModel from "@/models/Problem.model";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
   await dbConnect();
  const {
    query: { id },
    method,
    body,
  } = req;

  if (!id || Array.isArray(id)) {
    return res.status(400).json({ error: "Invalid or missing id" });
  }

  if (method === "GET") {
  // Fetch item by id
  try {
    const problem = await ProblemModel.findOne({ id: id });
    res.status(200).json({ message: `Get item ${id}`, problem });
  } catch (error) {
    console.log("Error in getting problem by id", error);
    res.status(200).json({ message: `Problem not found with id = ${id}` });
  }
} else if (method === "PUT") {
  // Update item by id using req.body
  res.status(200).json({ message: `Update item ${id}`, updatedData: body });
} else if (method === "DELETE") {
  // Delete item by id
  res.status(200).json({ message: `Delete item ${id}` });
} else {
  res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
  res.status(405).end(`Method ${method} Not Allowed`);
}

}
