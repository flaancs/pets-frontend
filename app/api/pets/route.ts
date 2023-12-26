import axiosServer from "@/utils/axios.server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page: string = searchParams.get("page") || "1";
    const pageSize: string = searchParams.get("pageSize") || "10";
    const name: string | null = searchParams.get("name");
    const type: string | null = searchParams.get("type");

    const response = await axiosServer.get("/pets", {
      params: {
        page,
        pageSize,
        ...(name && { name }),
        ...(type && { type }),
      },
    });

    const { data } = response;
    const [pets, count] = data;

    const pages = Math.ceil(count / Number(pageSize));
    return Response.json({ pages, count, pets });
  } catch (error) {
    console.error(error);
    return Response.json(
      {
        message: "Something went wrong",
      },
      {
        status: 500,
      }
    );
  }
}
