import { useEffect, useState } from 'react';
import NavBar from '../components/NavBar';
import CheckifUserIsLogged from '../!function/CheckifUserIsLogged';
import { MdWork } from "react-icons/md";

const Home = () => {
  const [isLogged, setIsLogged] = useState(false);
  const [username, setUsername] = useState("");

  useEffect(() => {
    const checkLoginStatus = async () => {
      const response = await CheckifUserIsLogged();
      setIsLogged(response.status);
      if (response.username != null) {
        setUsername(response.username);
      }
    };
    checkLoginStatus();
  }, []);

  if (isLogged) {
    return (
      <>
        <NavBar />
        <div id="home_page_container">
          <h1>Welcome back, {username}</h1>
          <div className="home_page_container_pageinfo">
            <p>We are working on the Graphics</p>
            <p>
              You can use the menu to navigate through the website.
              <br />
              <MdWork />
            </p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div id="home_page_container">
        <h1>Please Register or LogIn</h1>
        <div className="home_page_container_pageinfo">
          <p>We are working on the Graphics</p>
            <MdWork />
        </div>
      </div>
    </>
  );
};

export default Home;
