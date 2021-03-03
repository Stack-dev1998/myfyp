import React from "react";
import { Nav } from "react-bootstrap";
import { Link, withRouter } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { FaFirstOrder } from "react-icons/fa";
import { FaCheck } from "react-icons/fa";
import { FiLogOut } from "react-icons/fi";
import { FaLongArrowAltDown } from "react-icons/fa";
import { FaUserEdit } from "react-icons/fa";
import CheckStatus from "./CheckStatus";
import UpdateProfile from "./UpdateProfile";
import CreateProfile from "./CreateProfile";
import { Cookies } from "react-cookie";
const cookies = new Cookies();
class NeedyPeopleSidebarContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showStatus: false,
      showUpdateProfile: false,
      showCreateProfile: false,
      userInfo: this.props.userInfo,
    };
  }
  arrayBufferToBase64(buffer) {
    var binary = "";
    var bytes = [].slice.call(new Uint8Array(buffer.data));
    bytes.forEach((b) => (binary += String.fromCharCode(b)));
    const imgString = window.btoa(binary);
    const base64Flag = "data:image/jpeg;base64,";
    const finalImg = base64Flag + imgString;
    return finalImg;
  }
  render() {
    let user = this.state.userInfo;
    return (
      <div style={{ margin: "none" }}>
        <div className="pr-3 pl-3">
          <div style={{ display: "inline-flex", marginTop: "20px" }}>
            <img
              style={{ borderRadius: "10px", display: "inline-flex" }}
              width={64}
              height={64}
              className=""
              src={this.arrayBufferToBase64(user.img)}
              alt="Generic placeholder"
            />
            <span>
              <h6
                className="ml-2 mt-1 "
                style={{ lineHeight: "0.9", textTransform: "capitalize" }}
              >
                {user.name}
              </h6>
              <h6
                className="ml-2 "
                style={{
                  lineHeight: "1",
                  fontSize: "0.8rem",
                  textTransform: "capitalize",
                }}
              >
                {user.email}
              </h6>
              <h6
                className="ml-2 mt-2 text-muted"
                style={{ fontSize: "0.7rem", textTransform: "capitalize" }}
              >
                {user.role}
              </h6>
            </span>
          </div>

          <p
            className="text-muted mt-4  "
            style={{
              fontFamily: "Algerian",
              lineHeight: "1px",
              letterSpacing: "2px",
              fontSize: "0.8rem",
            }}
          >
            DASHBOARD
          </p>
        </div>

        <div
          style={{
            height: "50px",
            background: "#EFEFF0",
            padding: "none",
            maxWidth: "100%",
            margin: "none",
          }}
        >
          <div
            className="pl-4 pr-4"
            style={{
              display: "inline-flex",
              marginTop: "10px",
              lineHeight: "45px",
            }}
          >
            <AiOutlineDashboard
              style={{ fontSize: "28px", color: " #1F618D" }}
            />
            <Nav.Link
              style={{
                lineHeight: "2px",
                fontSize: " 0.9rem",
                color: "#1F618D",
                fontFamily: "Berlin Sans FB",
              }}
              as={Link}
              className="ml-1 mt-1 "
              to="/needy-person/dashboard"
            >
              HOME
            </Nav.Link>
          </div>
        </div>
        <p
          className="text-muted mt-2 ml-3  "
          style={{
            fontFamily: "Algerian",
            letterSpacing: "2px",
            fontSize: "0.8rem",
          }}
        >
          COMPONENTS
        </p>
        {user.needyPerson.profileCreated ? (
          <div>
            <div style={{ display: "inline-flex" }} className=" mt-4 pl-4">
              <FaUserEdit style={{ fontSize: "22px", color: " #1F618D" }} />
              <Nav.Link
                style={{
                  lineHeight: "2px",
                  fontSize: " 0.9rem",
                  color: "#1F618D",
                  fontFamily: "Berlin Sans FB",
                }}
                onClick={() => {
                  this.setState({
                    showUpdateProfile: true,
                  });
                }}
              >
                UPDATE PROFILE
              </Nav.Link>
            </div>
            <div style={{ display: "inline-flex" }} className=" mt-4 pl-4">
              <FaFirstOrder style={{ fontSize: "22px", color: " #1F618D" }} />
              <Nav.Link
                style={{
                  lineHeight: "2px",
                  fontSize: " 0.9rem",
                  color: "#1F618D",
                  fontFamily: "Berlin Sans FB",
                }}
                onClick={() => {
                  this.setState({
                    showStatus: true,
                  });
                }}
              >
                CHECK STATUS
              </Nav.Link>
            </div>

            <div style={{ display: "inline-flex" }} className=" mt-4 pl-4">
              <FaLongArrowAltDown
                style={{ fontSize: "23px", color: " #1F618D" }}
              />
              <Nav.Link
                style={{
                  lineHeight: "2px",
                  fontSize: " 0.9rem",
                  color: "#1F618D",
                  fontFamily: "Berlin Sans FB",
                }}
                as={Link}
                className="active  "
                to={"/needy-person/recieving-donations"}
              >
                RECIEVING DONATIONS
              </Nav.Link>
            </div>

            <div style={{ display: "inline-flex" }} className=" mt-4 pl-4">
              <FaCheck style={{ fontSize: "22px", color: " #1F618D" }} />

              <Nav.Link
                style={{
                  lineHeight: "2px",
                  fontSize: " 0.9rem",
                  color: "#1F618D",
                  fontFamily: "Berlin Sans FB",
                }}
                as={Link}
                className="mt-1  "
                to="/needy-person/recieved-donations"
              >
                RECIEVED DOANTIONS
              </Nav.Link>
            </div>
          </div>
        ) : (
            <div style={{ display: "inline-flex" }} className=" mt-2 pl-4">
              <FaUserEdit style={{ fontSize: "22px", color: " #1F618D" }} />
              <Nav.Link
                style={{
                  lineHeight: "2px",
                  fontSize: " 0.9rem",
                  color: "#1F618D",
                  fontFamily: "Berlin Sans FB",
                }}
                onClick={() => {
                  this.setState({
                    showCreateProfile: true,
                  });
                }}
              >
                CREATE PROFILE
            </Nav.Link>
            </div>
          )}

        <div
          className=" inline-flex text-center"
          style={{
            marginLeft: "auto",
            marginRight: "auto",
            width: "200px",
            background: "#6b1d1d",
            height: "30px",
            borderRadius: "30px",
            marginTop: "50px",
            lineHeight: "28px",
            color: "white",
          }}
        >
          <FiLogOut
            style={{ display: "inline", fontWeight: "700", marginTop: "-2px" }}
          />
          <p
            onClick={() => {
              cookies.remove("employee");
              this.props.history.push("/login");
            }}
            style={{
              display: "inline",
              fontSize: "0.8rem",
              paddingLeft: "5px",
              fontFamily: "Berlin Sans FB",
            }}
          >
            LOGOUT
          </p>
        </div>
        {
          this.state.showStatus ? <CheckStatus
            show={this.state.showStatus}
            onHide={() =>
              this.setState({
                showStatus: false,
              })
            }
          /> : null
        }
        {
          this.state.showCreateProfile ? <CreateProfile
            show={this.state.showCreateProfile}
            onHide={() =>
              this.setState({
                showCreateProfile: false,
              })
            }
          /> : null
        }
        {
          this.state.showUpdateProfile ? <UpdateProfile
            user={this.state.userInfo}
            show={this.state.showUpdateProfile}
            onHide={() =>
              this.setState({
                showUpdateProfile: false,
              })
            }
          /> : null
        }

      </div>
    );
  }
}

export default withRouter(NeedyPeopleSidebarContent);
