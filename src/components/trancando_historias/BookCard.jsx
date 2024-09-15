import clsx from "clsx"

export default function BookCard({ book, className, ...rest }) {
    return (
        <div className={clsx("flex flex-col items-center border-2 p-3 border-gray-400 rounded-lg w-60 h-80", className)} {...rest}>
            <img
                className="w-40 h-52 object-cover rounded-lg"
                src={book?.thumbnail}
                alt={book?.title}
            />
            <div className="flex flex-col h-full py-1 justify-between">
                <span className="text-center line-clamp-1">{book?.title}</span>
                <span className="line-clamp-1 text-center">{book?.authors}</span>
            </div>
        </div>
    )
}