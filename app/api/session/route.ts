import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";

export async function GET(request: Request) {
  try {
    const cookieStore = cookies();
    const token = cookieStore.get("authToken")?.value;

    if (!token) {
      return Response.json(
        {
          message: "Invalid session",
        },
        {
          status: 401,
        }
      );
    }

    const decoded = jwtDecode(token);
    return Response.json(decoded);
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: "Something went wrong while checking session",
      },
      {
        status: 500,
      }
    );
  }
}
