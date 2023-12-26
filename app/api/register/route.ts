import { cookies } from "next/headers";
import axiosServer from "@/utils/axios.server";

export async function POST(request: Request) {
  try {
    const cookieStore = cookies();
    const { name, email, phoneNumber, password } = await request.json();

    if (!name || !email || !phoneNumber || !password) {
      return Response.json(
        {
          message: "Please fill all fields",
        },
        {
          status: 400,
        }
      );
    }

    await axiosServer.post("/auth/register", {
      name,
      email,
      phoneNumber,
      password,
    });

    const responseLogin = await axiosServer.post("/auth/login", {
      email,
      password,
    });

    const { access_token } = responseLogin.data;

    cookieStore.set("authToken", access_token, {
      httpOnly: true,
      path: "/",
    });

    return Response.json("Register success");
  } catch (error) {
    console.error(error);

    let errorMessage = (error as any)?.response?.data?.message;
    if (Array.isArray(errorMessage)) {
      errorMessage = errorMessage.join(", ");
    }

    return Response.json(
      {
        message:
          errorMessage || (error as any)?.message || "Something went wrong",
      },
      {
        status: 400,
      }
    );
  }
}
