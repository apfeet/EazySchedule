import React from "react";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import Button from "../components/Button";
import { RiLoginBoxLine } from "react-icons/ri";
import { MdOutlineAssignmentInd } from "react-icons/md";

const Enterportal = () => {
    const navigate = useNavigate();

    const HandleClick = (input) => {
        if (input === 0) {
            navigate("/register");
        } else if (input === 1) {
            navigate("/login");
        }
    };

    return (
        <>
            <NavBar />
            <div className="EnterPortalContainer">
                <div className="EnterPortalContainer_box">
                    <div className="EnterPortalContainer_box_InnerBox">
                        <h1>Register or Log-in?</h1>
                        <div className="EnterPortalContainer_box_InnerBox_button">
                            <Button
                                buttonText="Register"
                                icon={<MdOutlineAssignmentInd />}
                                action={() => HandleClick(0)}
                            />
                            <Button
                                buttonText="Login"
                                icon={<RiLoginBoxLine />}
                                action={() => HandleClick(1)}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Enterportal;
