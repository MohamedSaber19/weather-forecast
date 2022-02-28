import notFoundImg from "assets/images/page-not-found.png"
import ErrorMessage from "components/shared/ErrorMessage";
import { IErrorMSG } from "resources/interfaces";

const NotFound: React.FC = (): JSX.Element => {
    const errObj: IErrorMSG = {
        imgURL: notFoundImg,
        message: "Page not found",
        linkURL: "/",
        linkText: "Go Home"
    };
    return (
        <ErrorMessage data={errObj} />
    )
}

export default NotFound;

