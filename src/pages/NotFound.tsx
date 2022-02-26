import { FC } from 'react'
import notFoundImg from "assets/images/page-not-found.png"
import { Link } from 'react-router-dom';
const NotFound: FC = (): JSX.Element => {
    return (
        <article className="p-6 flex items-center flex-col">
            <img className="w-80 h-auto" src={notFoundImg} alt="Page not found" />
            <p className="text-gray-500 text-xl">Page not found</p>
            <Link className="text-teal-400 underline text-bold" to="/">Go Home</Link>
        </article>
    )
}

export default NotFound;

