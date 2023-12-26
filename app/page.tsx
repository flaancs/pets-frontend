import PetsTable from "@/components/PetsTable";
import axiosClient from "@/utils/axios.client";
import type { Pet } from "@/types/pet";

interface IPetsData {
  pets: Pet[];
  pages: number;
  count: number;
}

export async function getPetsData(): Promise<IPetsData> {
  const response = await axiosClient.get("/pets");
  return response.data;
}

export default async function Page() {
  const { pets, pages, count } = await getPetsData();

  return (
    <main className="min-h-screen p-24">
      <PetsTable pets={pets} pages={pages} count={count} />
    </main>
  );
}
