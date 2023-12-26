import { cookies } from "next/headers";

export async function POST() {
  try {
    const cookieStore = cookies();
    cookieStore.delete("authToken");
    return Response.json("Logout success");
  } catch (error) {
    console.error(error);

    return Response.json(
      {
        message: "Something went wrong while logging out",
      },
      {
        status: 400,
      }
    );
  }
}
