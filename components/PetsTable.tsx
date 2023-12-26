"use client";
import { Pet } from "@/types/pet";
import { getPetBreed, getPetType } from "@/utils/pets";
import { Badge, Empty, Pagination, Spinner, Table } from "keep-react";
import { usePetsTable } from "@/hooks/usePetsTable";
import { useModal } from "@/hooks/useModal";
import PetsTableHeader from "./PetsTableHeader";
import { SetStateAction } from "react";

export interface PetsTableProps {
  pets: Pet[];
  pages: number;
  count: number;
}

export default function PetsTable({ pets, pages, count }: PetsTableProps) {
  const {
    loading,
    data,
    page,
    perPage,
    type,
    totalPages,
    totalCount,
    user,
    handleDebounceSearch,
    handleChangePerPage,
    handleChangeType,
    setPage,
  } = usePetsTable({
    pets,
    pages,
    count,
  });
  const {
    showModal,
    setShowModal,
    modalMode,
    setModalMode,
    handleOpenLoginModal,
  } = useModal();

  return (
    <>
      <PetsTableHeader
        user={user}
        showModal={showModal}
        setShowModal={setShowModal}
        modalMode={modalMode}
        setModalMode={setModalMode}
        totalCount={totalCount}
        type={type}
        handleDebounceSearch={handleDebounceSearch}
        handleChangeType={handleChangeType}
        handleOpenLoginModal={handleOpenLoginModal}
      />
      {loading ? (
        <div className="w-full flex justify-center p-12">
          <Spinner />
        </div>
      ) : data?.length > 0 ? (
        <>
          <Table>
            <Table.Head>
              <Table.HeadCell>Type</Table.HeadCell>
              <Table.HeadCell>Breed</Table.HeadCell>
              <Table.HeadCell>Age</Table.HeadCell>
              <Table.HeadCell>User</Table.HeadCell>
              <Table.HeadCell>Sterilized</Table.HeadCell>
            </Table.Head>
            <Table.Body className="divide-gray-25 divide-y">
              {data.map((pet) => (
                <Table.Row className="bg-white" key={pet.id}>
                  <Table.Cell>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          {getPetType(pet.type)?.icon}
                          <div>
                            <p className="-mb-0.5 text-body-4 font-medium text-metal-600">
                              {pet.name}
                            </p>
                            <span>{getPetType(pet.type)?.label}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Table.Cell>
                  <Table.Cell>{getPetBreed(pet.breed)?.label}</Table.Cell>
                  <Table.Cell>
                    {pet.age} year{pet.age > 1 ? "s" : ""}
                  </Table.Cell>
                  <Table.Cell>{pet.user}</Table.Cell>
                  <Table.Cell>
                    {pet.isSterilized ? (
                      <Badge colorType="light" color="success">
                        Sterilized
                      </Badge>
                    ) : (
                      <Badge colorType="light" color="error">
                        Not Sterilized
                      </Badge>
                    )}
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
          <div className="w-full flex justify-center gap-4 p-6">
            <Pagination
              currentPage={page}
              onPageChange={(val) => setPage(val)}
              totalPages={totalPages}
              iconWithOutText
              prevNextShape="roundSquare"
            />
            <select
              value={perPage}
              onChange={(e) =>
                handleChangePerPage(Number(e.currentTarget.value))
              }
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
          </div>
        </>
      ) : (
        <div className="w-full flex justify-center p-6">
          <Empty>
            <Empty.Title>No Pets Found</Empty.Title>
            <Empty.Description>
              It looks like we couldn&apos;t find any pets matching your
              criteria. Please adjust your search or check back later as our pet
              list is regularly updated.
            </Empty.Description>
          </Empty>
        </div>
      )}
    </>
  );
}
