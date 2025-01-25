import { NextApiRequest, NextApiResponse } from "next";
import prisma, { handler } from "@/lib/prisma"; // Import the centralized handler
import { PrismaModelKeys } from "@/types/dynamic";
import { getSession } from "next-auth/react"; // Import NextAuth session getter

export default async function dynamicApiRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req }); // Get session for the request

  if (!session) {
    return res.status(401).json({ error: "Unauthorized" }); // If no session, respond with Unauthorized
  }
  const { model } = req.query; // Extract the model name from the URL
  const operation = req.method; // Map HTTP methods to operations
  const data = req.method === "GET" ? req.query : req.body; // Use query for GET and body for other methods

  if (
    typeof model !== "string" ||
    !Object.keys(prisma).includes(String(model))
  ) {
    return res.status(400).json({ error: "Invalid model name." });
  }

  try {
    // Map HTTP methods to Prisma operations
    let operationName:
      | "findMany"
      | "create"
      | "update"
      | "delete"
      | "findUnique";
    switch (operation) {
      case "GET":
        operationName = req.query.id ? "findUnique" : "findMany";
        break;
      case "POST":
        operationName = "create";
        break;
      case "PUT":
        operationName = "update";
        break;
      case "DELETE":
        operationName = "delete";
        break;

      default:
        return res.status(405).json({ error: "Method not allowed." });
    }

    // Call the centralized handler
    const result = await handler(model as PrismaModelKeys, operationName, data);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in dynamic API route:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
}
