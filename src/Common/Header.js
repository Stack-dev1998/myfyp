import React, { useState } from "react";
import HamburgerMenu from "react-hamburger-menu";
import { Row, Container } from "react-bootstrap";
import { MdClose } from "react-icons/md";

const mql = window.matchMedia(`(min-width: 800px)`);
export default function Header(props) {
  const [sidebar, setOpenSidebar] = useState(true);

  return (
    <Container fluid>
      <Row
        style={{
          height: "70px",
          background: "#6b1d1d",
        }}
      >
        <div style={{ float: "", marginTop: "25px", marginLeft: "20px" }}>
          {mql.matches ? null : props.isOpen ? (
            <MdClose
              onClick={() => {
                props.side_bar_Conroller();
                setOpenSidebar(false);
              }}
              style={{
                width: "30px",
                fontSize: "30px",
                marginLeft: "-5px",
                marginTop: "-15px",
                color: "white",
              }}
            />
          ) : (
            <HamburgerMenu
              isOpen={props.isOpen}
              menuClicked={() => {
                props.side_bar_Conroller();
                setOpenSidebar(false);
              }}
              width={20}
              height={15}
              strokeWidth={2}
              rotate={1}
              color="white"
              borderRadius={5}
              animationDuration={0.5}
            />
          )}
        </div>

        <div
          className="text-center  mr-auto ml-auto "
          style={{
            height: "40px",
            background: "#6b1d1d",
            width: "250px",
            marginTop: "14px",
          }}
        >
          <span
            style={{
              color: "white",
              lineHeight: "40px",
            }}
          >
            {props.children}
          </span>
        </div>
      </Row>
    </Container>
  );
}
