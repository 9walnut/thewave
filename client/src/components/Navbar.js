import { Link } from "react-router-dom";
import styled from "styled-components";
import { useEffect, useState } from "react";
import logo from "../assets/img/theWave.png";
import search from "../assets/img/search.png";
import menu from "../assets/img/menu.png";
import basket from "../assets/img/basket.png";
import mypage from "../assets/img/mypage.png";
import React from "react";
import "./Navbar.css";

function Navbar() {
  const [screenSize, setScreenSize] = useState(window.innerWidth <= 582);
  const [isMenuVisible, setMenuVisible] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setScreenSize(window.innerWidth <= 582);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleMouseEnter = () => {
    setMenuVisible(true);
  };

  const handleMouseLeave = () => {
    // 굳이 필요 없음
    setMenuVisible(false);
  };

  const handleMouseContainer = () => {
    setMenuVisible(false);
  };

  return (
    <>
      <header>
        {/* searchbar */}
        <div className="logoBar">
          <div>
            <a>{screenSize ? <img src={menu} /> : <img src={search} />}</a>
          </div>
          <div>
            <a>
              <Link to={"/"}>
                <img src={logo} />
              </Link>
            </a>
          </div>
          <div>
            <div onMouseLeave={handleMouseContainer}>
              <a
                onMouseEnter={handleMouseEnter}
                style={{ marginRight: "10px" }}
              >
                <img src={mypage} />
              </a>
              {isMenuVisible && (
                <div className="myPageMenu">
                  <div>
                    <a className="menuItem">
                      <Link to="/login">Login</Link>
                    </a>
                  </div>
                  <div>
                    <a className="menuItem">
                      <Link to="/register">SignUp</Link>
                    </a>
                  </div>
                </div>
              )}
            </div>
            <div>
              <a>
                <img src={basket} />
              </a>
            </div>
          </div>
        </div>

        {/* navbar */}
        {screenSize ? null : (
          <nav>
            <ul>
              <li>
                <a href="#" style={{ fontWeight: "bold" }}>
                  All Products
                </a>
              </li>
              <li>
                <a href="#">Best</a>
              </li>
              <li>
                <a href="#">커스텀 풍선</a>
              </li>
              <li>
                <a href="#">브라이덜 샤워</a>
              </li>
              <li>
                <a href="#">생화</a>
              </li>
            </ul>
          </nav>
        )}
      </header>
    </>
  );
}

export default Navbar;
