import { Pet } from "@/types/pet";
import { useCallback, useEffect, useState } from "react";
import { debounce } from "lodash";
import { useUser } from "@/context/user.context";
import { TYPE_TABS } from "@/utils/constants";
import axiosClient from "@/utils/axios.client";

export interface usePetsTableProps {
  pets: Pet[];
  pages: number;
  count: number;
}

export const usePetsTable = ({ pets, pages, count }: usePetsTableProps) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [data, setData] = useState<Pet[]>(pets);
  const [page, setPage] = useState<number>(1);
  const [perPage, setPerPage] = useState<number>(10);
  const [search, setSearch] = useState<string>("");
  const [type, setType] = useState<string>("all");
  const [totalPages, setTotalPages] = useState<number>(pages);
  const [totalCount, setTotalCount] = useState<number>(count);
  const { user } = useUser();

  const fetchPets = useCallback(() => {
    axiosClient
      .get("/pets", {
        params: {
          page,
          pageSize: perPage,
          name: search,
          ...(type !== "all" && { type }),
        },
      })
      .then((response) => {
        const { pets, pages, count } = response.data;
        setData(pets);
        setTotalPages(pages);
        setTotalCount(count);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [page, perPage, search, type]);

  useEffect(() => fetchPets(), [fetchPets, page, perPage, search, type]);

  const handleDebounceSearch = debounce((value) => {
    setSearch(value);
    setPage(1);
  }, 500);

  const handleChangePerPage = (value: number) => {
    setPerPage(value);
    setPage(1);
  };

  const handleChangeType = (value: number) => {
    setType(TYPE_TABS[value]);
    setPage(1);
  };

  const handleCreatePet = async (data: {
    name: string;
    type: string;
    breed: string;
    age: number;
    isSterilized: boolean;
  }) => {
    return axiosClient.post("/create-pet", data).then(() => fetchPets());
  };

  return {
    loading,
    data,
    page,
    perPage,
    search,
    type,
    totalPages,
    totalCount,
    user,
    handleDebounceSearch,
    handleChangePerPage,
    handleChangeType,
    setPage,
    handleCreatePet,
  };
};
