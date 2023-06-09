import React from "react";
import Header from "../components/Header";
import { ReactComponent as IconAlertTriangleFill } from "bootstrap-icons/icons/exclamation-triangle-fill.svg";
import { Link } from "react-router-dom";
const NotFound = () => {
    return (
        <>
            <Header />
            <div className="container text-center p-5">
                <div className="display-1">
                    <IconAlertTriangleFill className="i-va text-warning" width={80} height={80} />
                    404
                </div>
                <h1 className="mb-3">Oops... Page Not Found!</h1>
                <div className="row justify-content-md-center">
                    <div className="col-md-6">
                        <Link to="/" type="button" className="btn btn-primary">Home</Link>
                    </div>
                </div>
            </div>
        </>

    );
}
export default NotFound