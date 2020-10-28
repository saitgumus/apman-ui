import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import Login from "./Login";
import SignIn from "./SignIn";
import { connect } from "react-redux";
import {bindActionCreators} from "redux";
import * as messageActions from "../../redux/actions/message-actions";
import {CommonTypes} from "../../Types/Common";
import * as pageActions from "../../redux/actions/page-actions";


const TabIn = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if(props.registeredUser && props.registeredUser.isRegistered === true){
      props.actions.changeBackdropStatus(false);
      props.actions.showMessage("Kayıt işleminiz gerçekleşti.. giriş yapabilirsiniz.",CommonTypes.MessageTypes.success);
    }
    if (activeTab !== tab) setActiveTab(tab);
  };
  
  return (
    <div>
      { (props.registeredUser && props.registeredUser.isRegistered === true) ? toggle("1"):toggle(activeTab)}
      <Nav tabs>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "1" })}
            onClick={() => {
              toggle("1");
            }}
          >
            Giriş Yap
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            className={classnames({ active: activeTab === "2" })}
            onClick={() => {
              toggle("2");
            }}
          >
            Kayıt Ol
          </NavLink>
        </NavItem>
      </Nav>
      <TabContent activeTab={activeTab}>
        <TabPane tabId="1">
          <Login/>
        </TabPane>
        <TabPane tabId="2">
          <SignIn/>
        </TabPane>
      </TabContent>
    </div>
  );
};

function mapStateToProps(state) {
  return {
    registeredUser: state.registerReducer,
  };
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
      changeBackdropStatus:bindActionCreators(pageActions.changeBackDropStatus,dispatch),
    },
  };
}

export default connect(mapStateToProps,mapDispatchToProps)(TabIn);
