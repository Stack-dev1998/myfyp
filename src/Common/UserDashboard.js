import React from "react";
import Header from "./Header";
import Sidebar from "react-sidebar";
const mql = window.matchMedia(`(min-width: 800px)`);
export default class UserDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: false,
      mql: mql,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentDidMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    const styles = {
      overlay: {
        zIndex: 1,
        position: "fixed",
        top: 70,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 0,
        visibility: "hidden",
        transition: "opacity .3s ease-out, visibility .3s ease-out",
        backgroundColor: "rgba(0,0,0,0.3)",
      },
      sidebar: {
        zIndex: 2,
        position: "fixed",
        top: mql.matches ? 0 : 70,
        bottom: 0,
        transition: "transform .3s ease-out",
        WebkitTransition: "-webkit-transform .3s ease-out",
        willChange: "transform",
        overflowY: "auto",
        background: "white",
        width: "270px",
      },
      root: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        overflow: "hidden",
      },
    };

    return (
      <div style={{ overflowX: "hidden" }}>
        <Sidebar
          sidebar={this.props.userSidebar}
          open={this.state.sidebarOpen}
          docked={this.state.sidebarDocked}
          onSetOpen={this.onSetSidebarOpen}
          styles={{
            root: styles.root,
            sidebar: styles.sidebar,
            overlay: styles.overlay,
          }}
        >
          <Header
            isOpen={this.state.sidebarOpen}
            side_bar_Conroller={() => {
              this.setState({
                sidebarOpen: !this.state.sidebarOpen,
              });
            }}
          >
            {this.props.title}
          </Header>
          {this.props.children}
        </Sidebar>
      </div>
    );
  }
}
