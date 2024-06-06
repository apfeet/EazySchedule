import '../style.css';
import Button from './Button';
import { FaCheck } from "react-icons/fa";
import { SlChemistry } from "react-icons/sl";
import { MdOutlineDownloading } from "react-icons/md";
import { FaPlug } from "react-icons/fa";

const Cards = ({ title = "title", status = "loading", icon = <SlChemistry size={40} />, onClick }) => {
  return (
    <div className="cards_container">
      {status === "loading" ? (
        <>
          <h1>Loading</h1>
          <MdOutlineDownloading size={50}/>
          <p>{status}</p>
        </>
      ) : (
        <>
          <h1>{title}</h1>
          {icon}
          <p>{status}</p>
          {status === "connected" ? (
            <FaCheck size={40}/>
          ) : (
            <Button
              buttonText="Connect"
              icon={<FaPlug/>}
              action={onClick}
            />
          )}
        </>
      )}
    </div>
  );
}

export default Cards;
