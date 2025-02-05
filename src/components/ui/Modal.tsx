import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react'
import { ReactNode } from 'react'

interface IProps {
    children: ReactNode;
    close: () => void;
    isOpen: boolean;
    title?: string;
    description?: string
}

const Modal = ({ children, close, isOpen, title, description }: IProps) => {
    return (
        <>

            <Dialog open={isOpen} as="div" className="relative z-10 focus:outline-none bg-red-500" onClose={close} __demoMode>
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto bg-black/20">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <DialogPanel
                            transition
                            className="w-full max-w-md rounded-xl bg-gray-200 p-6 backdrop-blur-2xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0 shadow-md"
                        >
                            {
                                title ? <DialogTitle as="h3" className="text-xl font-medium text-black">
                                    {title}
                                </DialogTitle> : null
                            }
                            {
                                description ? <p className="mt-2 text-sm/6 text-gray-500">
                                    {description}
                                </p> : null
                            }

                            {children}
                        </DialogPanel>
                    </div>
                </div>
            </Dialog>
        </>
    )
}
export default Modal;








/*

<Button
                onClick={open}
                className="rounded-md bg-black/20 py-2 px-4 text-sm font-medium text-white focus:outline-none data-[hover]:bg-black/30 data-[focus]:outline-1 data-[focus]:outline-white"
            >
                Open dialog
            </Button>

*/