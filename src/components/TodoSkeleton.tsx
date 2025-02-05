interface IPrps {
    widthBtn: string;
    heightBtn?: string;
    className?: string;
}

export const ButtonSkeleton = ({ widthBtn, heightBtn = "[50px]", className }: IPrps) => {
    return (
        <div role="status" className=" divide-gray-200 rounded-sm animate-pulse dark:divide-gray-500">
            <div className="flex items-center justify-between">
                <div style={{width: `${widthBtn}`, height: `${heightBtn}`}} className={`bg-gray-200 rounded-md dark:bg-gray-500 ${className}`}></div>
            </div>
        </div>
    )
}

const TodoSkeleton = () => {
    return (
        <div role="status" className="w-full p-2 my-3 divide-y divide-gray-200 rounded-sm animate-pulse dark:divide-gray-500">
            <div className="flex items-center justify-between">
                <div>
                    <div className="w-32 h-2 bg-gray-200 rounded-md dark:bg-gray-500"></div>
                </div>
                <div className="flex items-center space-x-4">
                    <div className="w-20 h-9 bg-gray-300 rounded-md dark:bg-gray-500"></div>
                    <div className="w-28 h-9 bg-gray-300 rounded-md dark:bg-gray-500"></div>
                </div>
            </div>
        </div>
    )
}

export default TodoSkeleton;