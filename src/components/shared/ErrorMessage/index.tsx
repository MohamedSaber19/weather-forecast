import { Link } from "react-router-dom";
import { IErrorMSG } from "resources/interfaces";

type Props = {
    data: IErrorMSG
}

const ErrorMessage: React.FC<Props> = ({ data }): JSX.Element => {
    const { imgURL, message, linkURL, linkText } = data;
    return (<article className="p-6 flex items-center flex-col">
        <img className="max-w-xs h-auto" src={imgURL} alt={message} />
        <p className="text-gray-500 text-xl">{message}</p>
        <Link className="text-teal-400 underline text-bold"
            to={linkURL}>{linkText}
        </Link>
    </article>)
}

export default ErrorMessage;