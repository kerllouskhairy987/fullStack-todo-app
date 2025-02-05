import { ChangeEvent, useState } from "react";
import Paginator from "../components/Paginator";
import { ButtonSkeleton } from "../components/TodoSkeleton";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import NoTodo from "../NoTodo";


const storageKey = "loggedInUser"
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const TodosPage = () => {
    const [page, setPage] = useState<number>(1);
    const [pageSize, setPageSize] = useState<number>(10);
    const [sortBy, setSortBy] = useState<string>("DESC");

    const { isLoading, data, isFetching } = useAuthenticatedQuery({
        queryKey: [`todo-list-${page}`, `${pageSize}`, `${sortBy}`], url: `/todos?pagination[pageSize]=${pageSize}&pagination[page]=${page}&sort=createdAt:${sortBy}`, config: {
            headers: {
                Authorization: `Bearer ${userData.jwt}`
            }
        }
    })
    console.log(data);

    if (isLoading) {
        return (
            <>
                <div className="container mt-10">
                    <div className="flex items-center justify-end space-x-3">
                        <ButtonSkeleton widthBtn="113px" heightBtn="40px" />
                        <ButtonSkeleton widthBtn="96px" heightBtn="40px" />
                    </div>

                    {Array.from({ length: 10 }, (_, idx) => (
                        <ButtonSkeleton widthBtn="250px" heightBtn="24px" className="my-5 p-2" key={idx} />
                    ))
                    }

                    <div className="flex flex-col items-center space-y-5 mx-auto mt-10">
                        <div className="text-sm text-gray-600 mx-3">
                            <ButtonSkeleton widthBtn="195px" heightBtn="20px" />
                        </div>
                        <div className="flex items-center space-x-1">
                            <ButtonSkeleton widthBtn="92px" heightBtn="40px" />
                            <ButtonSkeleton widthBtn="94px" heightBtn="40px" />
                        </div>
                    </div>
                </div>
            </>
        )
    }

    // ** Handlers
    const onClickPrev = () => {
        setPage(prev => prev - 1)
    }

    const onClickNext = () => {
        setPage(prev => prev + 1)
    }

    const onChangePageSize = (e: ChangeEvent<HTMLSelectElement>) => {
        setPageSize(Number(e.target.value))
    }

    const onChangeSortBy = (e: ChangeEvent<HTMLSelectElement>) => {
        setSortBy(e.target.value)
    }

    return (
        <div className="container my-10">
            <div className="flex items-center justify-end space-x-3">
                <select className="border-2 border-indigo-600 rounded-md w-fit p-2" value={sortBy} onChange={onChangeSortBy}>
                    <option disabled>Sort by</option>
                    <option value="ASC">Oldest</option>
                    <option value="DESC">Latest</option>
                </select>

                <select className="border-2 border-indigo-600 rounded-md w-fit p-2" value={pageSize} onChange={onChangePageSize}>
                    <option disabled>Page Size</option>
                    <option value={10}>10</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                </select>
            </div>
            {
                data.data.length ? data.data.map(({ id, documentId, title }: { id: number, documentId: string; title: string }) => (
                    <div key={documentId} className="flex justify-between items-center my-5 p-2 hover:bg-gray-100 duration-300 rounded-md even:bg-gray-100">
                        <p> {id} - {title}</p>
                    </div>
                )) : <NoTodo />
            }

            <Paginator
                page={page}
                pageCount={data.meta.pagination.pageCount}
                total={data.meta.pagination.total}
                isLoading={isLoading || isFetching}
                onClickPrev={onClickPrev}
                onClickNext={onClickNext}
            />
        </div>
    )
}

export default TodosPage