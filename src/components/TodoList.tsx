import { ChangeEvent, FormEvent, useState } from "react";
import useAuthenticatedQuery from "../hooks/useAuthenticatedQuery";
import { ITodo } from "../interfaces";
import NoTodo from "../NoTodo";
import Button from "./ui/Button"
import Modal from "./ui/Modal";
import Input from "./ui/Input";
import toast from "react-hot-toast";
import TextArea from "./ui/TextArea";
import axiosInstance from "../config/axios.config";
import TodoSkeleton, { ButtonSkeleton } from "../components/TodoSkeleton";
import { faker } from '@faker-js/faker';


const storageKey = "loggedInUser"
const userDataString = localStorage.getItem(storageKey);
const userData = userDataString ? JSON.parse(userDataString) : null;

const TodoList = () => {
    let [isEditModalOpen, setIsEditModalOpen] = useState(false);
    let [isAddModalOpen, setIsAddModalOpen] = useState(false);
    let [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)
    let [isUpdating, setIsUpdating] = useState(false)
    let [todoToEdit, setTodoToEdit] = useState<ITodo>({
        documentId: "",
        title: "",
        description: "",
    })
    let [todoToAdd, setTodoToAdd] = useState({
        title: "",
        description: "",
    })
    const [queryVersion, setQueryVersion] = useState(1);

    // ** Renders
    function onOpenEditModal(todo: ITodo) {
        setTodoToEdit(todo)
        setIsEditModalOpen(true)
    }

    function onOpenAddModal() {
        setIsAddModalOpen(true)
    }

    function onCloseAddModal(msg: string, color: string) {
        setIsAddModalOpen(false)

        toast(`${msg}`, {
            duration: 1500,
            position: 'bottom-center',
            style: {
                backgroundColor: color,
                padding: "10px",
                color: "white",
            },
        });

        setTodoToAdd({
            title: "",
            description: "",
        })
    }

    function onCloseEditModal() {
        setIsEditModalOpen(false)

        toast.error('Your Edit Does Not Complete!', {
            duration: 1500,
            position: 'bottom-center',
            style: {
                backgroundColor: "red",
                padding: "10px",
                color: "white",
            },
        });

        setTodoToEdit({
            documentId: "",
            title: "",
            description: "",
        })
    }

    function onCloseUpdateModal() {
        setIsEditModalOpen(false)

        toast.success('Your Edit Is Complete!', {
            duration: 1500,
            position: 'bottom-center',
            style: {
                backgroundColor: "green",
                padding: "10px",
                color: "white",
            },
        });

        setTodoToEdit({
            documentId: "",
            title: "",
            description: "",
        })
    }

    const { isLoading, data } = useAuthenticatedQuery({
        queryKey: ["todos", `${queryVersion}`], url: "/users/me?populate=todos", config: {
            headers: {
                Authorization: `Bearer ${userData.jwt}`
            }
        }
    })
    console.log(data);

    if (isLoading) {
        return (
            <>
                <div className="flex items-center justify-center space-x-4 my-10">
                    <ButtonSkeleton widthBtn="160px" />
                    <ButtonSkeleton widthBtn="205px" />
                </div>
                <div className="container mt-10">
                    {Array.from({ length: 3 }, (_, idx) => (
                        <TodoSkeleton key={idx} />
                    ))
                    }
                </div>
            </>
        )
    }

    const onChangeHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = evt.target;
        setTodoToEdit({
            ...todoToEdit,
            [name]: value,
        })
    }

    const onChangeAddHandler = (evt: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = evt.target;
        setTodoToAdd({
            ...todoToAdd,
            [name]: value,
        })
    }


    const onOpenDeleteModal = (todo: ITodo) => {
        setTodoToEdit(todo)
        setIsDeleteModalOpen(true)
    }

    const onCloseDeleteModal = (msg: string, color: string) => {
        setIsDeleteModalOpen(false)
        setTodoToEdit({
            documentId: "",
            title: "",
            description: "",
        })

        toast(`${msg}`, {
            duration: 1500,
            position: 'bottom-center',
            style: {
                backgroundColor: `${color}`,
                padding: "10px",
                color: "white",
            },
        });
    }

    const onSubmitHandler = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setIsUpdating(true)
        const { title, description, documentId } = todoToEdit;
        try {
            const res = await axiosInstance.put(`/todos/${documentId}`, { data: { title, description } }, {
                headers: {
                    Authorization: `Bearer ${userData.jwt}`
                }
            })
            console.log("RES", res)
            if (res.status === 200) {
                onCloseUpdateModal();
                setQueryVersion(prev => prev + 1)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdating(false)
        }
    }

    const onSubmitAddHandler = async (evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        setIsUpdating(true)
        const { title, description } = todoToAdd;
        try {
            const res = await axiosInstance.post(`/todos`, { data: { title, description, user: [userData.user.id] } }, {
                headers: {
                    Authorization: `Bearer ${userData.jwt}`
                }
            })
            console.log("RES", res)
            if (res.status === 200) {
                onCloseAddModal('Your Add Is Completed!', "green");
                setQueryVersion(prev => prev + 1)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setIsUpdating(false)
        }
    }

    const onRemove = async () => {
        const { documentId } = todoToEdit;
        try {
            const res = await axiosInstance.delete(`/todos/${documentId}`, {
                headers: {
                    Authorization: `Bearer ${userData.jwt}`
                }
            })
            console.log("RES DELETE", res)
            if (res.status) {
                onCloseDeleteModal('Your Delete Is Complete!', "green");
                setQueryVersion(prev => prev + 1)
            }
        } catch (error) {
            console.log(error);
        }
    }

    const onGenerateTodos = async () => {
        // ** 100 Records
        for (let i = 0; i < 100; i++) {
            try {
                const { data } = await axiosInstance.post("/todos",
                    { data: { title: faker.word.words(5), description: faker.lorem.paragraph(2), user: [userData.user.id] } }, {
                    headers: {
                        Authorization: `Bearer ${userData.jwt}`
                    }
                })
                console.log(data);
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <div className="container mt-10">
            <div className="flex items-center justify-center space-x-4 my-10">
                <Button className="py-[10px!important]" width="w-fit" onClick={() => onOpenAddModal()}>
                    Post New Todo
                </Button>
                <Button className="py-[10px!important] bg-white text-[black!important] border border-[black!important]" width="w-fit" onClick={onGenerateTodos}>
                    Generate New Todo
                </Button>
            </div>

            {
                data.todos.length ? data.todos.map((todo: ITodo) => (
                    <div key={todo.documentId} className="flex justify-between items-center my-5 p-2 hover:bg-gray-100 duration-300 rounded-md even:bg-gray-100">
                        <p> {todo.id} - {todo.title}</p>
                        <div className="flex items-center space-x-4">
                            <Button width="w-fit" className="py-[4px!important] font-thin" onClick={() => onOpenEditModal(todo)}>Edit</Button>
                            <Button width="w-fit" className="py-[4px!important] bg-red-600 font-thin" onClick={() => onOpenDeleteModal(todo)}>Remove</Button>
                        </div>
                    </div>
                )) : <NoTodo />
            }

            {/* Add Todo Modal */}
            <Modal isOpen={isAddModalOpen} close={() => onCloseAddModal("Your Add Does Not Completed !", "red")} title="Add Todo">
                <form onSubmit={onSubmitAddHandler}>
                    <Input placeholder="Enter Todo Title ..." type="text" name="title" value={todoToAdd.title} className="w-full py-2 px-4 mt-3 rounded" onChange={onChangeAddHandler} />
                    <TextArea placeholder="Enter Todo Description ..." name="description" value={todoToAdd.description} className="my-3" onChange={onChangeAddHandler} />

                    <div className="flex justify-end space-x-2">
                        <Button
                            className="inline-flex items-center gap-2 rounded-md px-3 text-sm/6 font-semibold py-[4px!important] text-white shadow-inner hover:bg-indigo-900"
                            isLoading={isUpdating}
                            width="w-fit"
                        >
                            {isUpdating ? "Loading ..." : "Add"}
                        </Button>
                        <Button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-md bg-gray-300 px-3 text-sm/6 font-semibold py-[4px!important] text-[black!important] shadow-inner shadow-white/10 focus:scale-90 hover:bg-gray-400 duration-300"
                            onClick={() => onCloseAddModal("Your Add Does Not Completed !", "red")}
                            width="w-fit"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Edit Todo Modal */}
            <Modal isOpen={isEditModalOpen} close={onCloseEditModal} title="Edit Todo" >
                <form onSubmit={onSubmitHandler}>
                    <Input placeholder="Enter Todo Title ..." type="text" name="title" value={todoToEdit.title} className="w-full py-2 px-4 mt-3 rounded" onChange={onChangeHandler} />
                    <TextArea placeholder="Enter Todo Description ..." name="description" value={todoToEdit.description} className="my-3" onChange={onChangeHandler} />

                    <div className="flex justify-end space-x-2">
                        <Button
                            className="inline-flex items-center gap-2 rounded-md px-3 text-sm/6 font-semibold py-[4px!important] text-white shadow-inner hover:bg-indigo-900"
                            isLoading={isUpdating}
                            width="w-fit"
                        >
                            {isUpdating ? "Loading ..." : "Update"}
                        </Button>
                        <Button
                            type="button"
                            className="inline-flex items-center gap-2 rounded-md bg-gray-300 px-3 text-sm/6 font-semibold py-[4px!important] text-[black!important] shadow-inner shadow-white/10 focus:scale-90 hover:bg-gray-400 duration-300"
                            onClick={() => onCloseEditModal()}
                            width="w-fit"
                        >
                            Cancel
                        </Button>
                    </div>
                </form>
            </Modal>

            {/* Delete Confirm Modal */}
            <Modal
                title="Are You Sure To Delete This Todo From Your Store ?"
                description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae recusandae repellendus non explicabo soluta labore modi cumque! Alias, ab quidem."
                isOpen={isDeleteModalOpen}
                close={() => onCloseDeleteModal('Your Delete Does Not Complete!', "red")}
            >
                <div className="flex justify-start items-center gap-4 mt-3">
                    <Button width="w-fit" className="py-[4px!important] font-medium bg-red-700" onClick={onRemove}>YES, Remove</Button>
                    <Button width="w-fit" className="py-[4px!important] font-medium bg-gray-300 text-[black!important]" type="button" onClick={() => onCloseDeleteModal('Your Delete Does Not Complete!', "red")}>Cancel</Button>
                </div>
            </Modal>
        </div>
    )
}

export default TodoList
