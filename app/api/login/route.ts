import { cookies } from "next/headers";
import axiosServer from "@/utils/axios.server";
import { jwtDecode } from "jwt-decode";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const { email, password } = await request.json();

    const response = await axiosServer.post("/auth/login", {
      email,
      password,
    });

    const { access_token } = response.data;

    cookieStore.set("authToken", access_token, {
      httpOnly: true,
      path: "/",
    });

    const decoded = jwtDecode(access_token);
    return Response.json(decoded);
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: "Email or password is incorrect",
      },
      {
        status: 400,
      }
    );
  }
}
