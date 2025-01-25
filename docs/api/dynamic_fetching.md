# **Dynamic API with Next.js, Prisma, and Authentication via NextAuth**

**Dynamic Prisma API Handler**

This document describes a dynamic API handler for interacting with a Prisma database in a Next.js application.

**Features:**

- Supports CRUD operations (Create, Read, Update, Delete) for various Prisma models.
- Dynamically handles requests for different models and operations.
- Includes type safety and input validation for enhanced robustness.
- Provides informative error messages.

**Usage:**

- **Supported Models:**

  - The handler currently supports the following Prisma models:
    - `image`, `component`, `page`, `navigation`, `section`, `form`, `field`, `input`, `account`, `session`, `verificationToken`, `layout`, `type`, `category`, `user`, `role`, `form`, `page`, `contact`, `inquiry`.
    - You can add or remove models as needed.

- **Request Parameters:**

  - `model`: The name of the Prisma model to interact with (e.g., "user", "post").
  - `operation`: The desired operation:
    - `findMany`: Retrieve multiple records.
    - `findUnique`: Retrieve a single record.
    - `create`: Create a new record.
    - `update`: Update an existing record.
    - `delete`: Delete a record.

- **Request Body:**

  - `findUnique`, `update`, and `delete` operations require a `where` clause in the request body to specify the record to be retrieved or modified.
  - The `create` and `update` operations require a `data` object in the request body to provide the data for the new or updated record.

- **Error Handling:**

- The handler includes built-in error handling for invalid models, operations, missing request parameters, and Prisma errors.
- It returns informative error messages with appropriate HTTP status codes.

**Security:**

- **Input Validation:** The handler validates input parameters and ensures that only valid models and operations are processed.
- **Authentication and Authorization:** (Not implemented in this example) You should implement authentication and authorization mechanisms to control access to this API endpoint.

**Further Enhancements:**

- **Pagination:** Implement pagination for `findMany` operations to improve performance and handle large datasets.
- **Filtering and Sorting:** Add support for filtering and sorting options in `findMany` operations.
- **Data Transformation:** Implement data transformations (e.g., serialization, formatting) before returning the response.
- **Caching:** Consider implementing caching strategies to improve performance for frequently accessed data.

This documentation provides a basic overview of the dynamic Prisma API handler. You can further customize and enhance it based on your specific requirements and use cases.

Here's a summary and documentation for the work you've done today:

---

## **1. Setup Prisma with Dynamic CRUD Operations**

### **Goal**:

Create a dynamic API route that interacts with multiple Prisma models, providing CRUD functionality.

### **Steps**:

1. **Define a Centralized Prisma Handler**:
   The centralized handler is responsible for dynamically handling different Prisma operations (`findMany`, `findUnique`, `create`, `update`, `delete`) based on the model and operation type received from the API request.

2. **Create Prisma Model Keys**:
   We defined a custom type `PrismaModelKeys` that ensures only valid Prisma models are accepted by the handler.

   ```typescript
   export type PrismaModelKeys = {
     [K in keyof PrismaClient]: PrismaClient[K] extends { findMany: Function }
       ? K
       : never;
   }[keyof PrismaClient];
   ```

3. **Dynamic API Route**:

   - The dynamic API route (`api/[model]`) uses the model name in the URL and the HTTP method (`GET`, `POST`, `PUT`, `DELETE`) to determine which Prisma operation to execute.
   - **GET**: If `id` is passed in the query, it performs a `findUnique`, otherwise `findMany`.
   - **POST**: Performs a `create` operation.
   - **PUT**: Performs an `update` operation.
   - **DELETE**: Performs a `delete` operation based on the provided `id`.

   Example of dynamic handler implementation:

   ```typescript
   const result = await handler(model as PrismaModelKeys, operationName, data);
   ```

---

## **2. Add Authentication via NextAuth**

### **Goal**:

Secure the dynamic API routes with authentication to ensure that only authorized users can access or modify the data.

### **Steps**:

1. **NextAuth Setup**:

   - Used the `next-auth` package to handle authentication.
   - Set up multiple authentication providers: **Google**, **GitHub**, and **Credentials** (email/password-based login).
   - Utilized Prisma as the adapter to store session and user data.

   Example configuration:

   ```typescript
   export const providersMap = [
     GoogleProvider({
       /* Google credentials */
     }),
     GithubProvider({
       /* GitHub credentials */
     }),
     CredentialsProvider({
       async authorize(credentials) {
         // Validate user credentials against Prisma
       },
     }),
   ];
   ```

2. **Secure API Route with `getSession`**:

   - In the `api/[model]` route, we used `getSession` to check if the user is authenticated.
   - If no session exists, the API responds with `401 Unauthorized`.
   - If the user is authenticated, the operation proceeds.

   Example of session validation:

   ```typescript
   const session = await getSession({ req });
   if (!session) {
     return res.status(401).json({ error: "Unauthorized" });
   }
   ```

---

## **3. Authentication Flow for API Access**

### **Goal**:

Ensure only authenticated users can perform CRUD operations on the dynamic API.

### **Steps**:

1. **Map HTTP Methods to Prisma Operations**:

   - Map HTTP methods (`GET`, `POST`, `PUT`, `DELETE`) to respective Prisma operations (`findMany`, `findUnique`, `create`, `update`, `delete`).

   ```typescript
   let operationName:
     | "findMany"
     | "findUnique"
     | "create"
     | "update"
     | "delete";
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
   ```

2. **Session Check**:

   - Ensured that the `getSession` function is used to check if the user is authenticated.
   - Only proceed with the Prisma operation if the user is authenticated.

   ```typescript
   const session = await getSession({ req });
   if (!session) {
     return res.status(401).json({ error: "Unauthorized" });
   }
   ```

3. **Error Handling**:
   - Implemented detailed error handling in the handler, such as:
     - If `data` is missing for `create` or `update` operations.
     - If the provided model name is invalid.
     - If no `id` is provided for `delete` operation.

---

## **4. Example API Routes**

### **Dynamic API Route**:

```typescript
import { NextApiRequest, NextApiResponse } from "next";
import { handler } from "@/lib/prisma"; // Import centralized handler
import { PrismaModelKeys } from "@/types/dynamic";
import { getSession } from "next-auth/react"; // NextAuth session check

export default async function dynamicApiRoute(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Authentication check
  const session = await getSession({ req });
  if (!session) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const { model } = req.query;
  const operation = req.method;
  const data = req.method === "GET" ? req.query : req.body;

  // Validate model name
  if (
    typeof model !== "string" ||
    !Object.keys(prisma).includes(String(model))
  ) {
    return res.status(400).json({ error: "Invalid model name." });
  }

  try {
    let operationName:
      | "findMany"
      | "findUnique"
      | "create"
      | "update"
      | "delete";
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

    const result = await handler(model as PrismaModelKeys, operationName, data);
    return res.status(200).json(result);
  } catch (error) {
    console.error("Error in dynamic API route:", error);
    return res.status(500).json({ error: "Internal Server Error." });
  }
}
```

---

## **5. Conclusion**

- **Dynamic API Routes**: You’ve built a flexible dynamic API that can interact with any Prisma model and perform CRUD operations based on HTTP methods.
- **Authentication Integration**: You integrated NextAuth to secure the API, ensuring that only authenticated users can access and modify data.
- **Scalability**: This approach allows you to easily add new Prisma models and handle them through the dynamic API, making the solution highly maintainable and scalable.

---

Let me know if you need any further adjustments or additional information for your documentation!
