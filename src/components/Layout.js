import React from "react";
import TabIn from "./Begin/TabIn";
import Messages from "../Types/Messages";
import { connect } from "react-redux";
import AppBarMenu from "./Navigation/app-bar";
import { Container } from "@material-ui/core";
import ActionBar from "./Navigation/action-bar";
import ShowMessage from "./ShowMessage";

import BackdropComponent from "./ToolBox/backdrop";
import { bindActionCreators } from "redux";
import * as messageActions from "../redux/actions/message-actions";
import * as pageActions from "../redux/actions/page-actions";
import User from "../Models/User";

function Layout(props) {
  let loginControl = () => {
    //let usr = window.localStorage.getItem("user");
    window.localStorage.removeItem("user");
    let userc = new User();
    userc.firstName = "api";
    userc.lastName = "api";
    userc.email = "api@gmail.com";
    userc.token = "asdasffasdf";
    userc.userName = "api";
    window.localStorage.setItem("user", JSON.stringify(userc));
    console.log("user active :", userc);

    return props.children;
    //todo: test e çıkmadan önce log-in geri aktifleştirilecek.
    // eslint-disable-next-line no-unreachable
    if (props.loginJwtObject && props.loginJwtObject.isSuccess) {
      return props.children;
    } else {
      return (
        <div>
          <p className={"lead"}>{Messages.PlsLogIn}</p>
          <TabIn />
        </div>
      );
    }
  };

  return (
    <div>
      <AppBarMenu>
        <BackdropComponent />
        <Container maxWidth="xl">
          <ActionBar />
          {props.loginJwtObject ? loginControl() : <p />}
          <ShowMessage />
        </Container>
      </AppBarMenu>
    </div>
  );
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      /**
       * showStatusMessage(message, type)
       */
      showMessage: bindActionCreators(
        messageActions.showStatusMessage,
        dispatch
      ),
      changeBackdropStatus: bindActionCreators(
        pageActions.changeBackDropStatus,
        dispatch
      ),
    },
  };
}

function mapStateToProps(state) {
  return {
    loginJwtObject: state.changeLoginStatusReducer,
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
