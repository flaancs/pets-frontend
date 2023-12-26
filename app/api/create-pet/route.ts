import axiosServer from "@/utils/axios.server";

export async function POST(request: Request) {
  try {
    const { name, type, breed, age, isSterilized } = await request.json();

    if (!name || !type || !breed || !age) {
      return Response.json(
        {
          message: "Please fill all fields",
        },
        {
          status: 400,
        }
      );
    }

    const response = await axiosServer.post("/pets", {
      name,
      type,
      breed,
      age,
      isSterilized,
    });

    return Response.json(response.data);
  } catch (error) {
    console.error(error);

    let errorMessage = (error as any)?.response?.data?.message;
    if (Array.isArray(errorMessage)) {
      errorMessage = errorMessage.join(", ");
    }

    return Response.json(
      {
        message:
          errorMessage ||
          (error as any)?.message ||
          "Something went wrong while creating pet",
      },
      {
        status: 400,
      }
    );
  }
}
