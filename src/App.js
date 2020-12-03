import React, {Component} from "react";
import {Route, Switch} from "react-router";
import Layout from "./components/Layout";
import {Home} from "./components/Home";
import DefineSiteApartment from "./components/Admin/SiteApartment/DefineSiteApartment";
import MemberDefine from "./components/Admin/Member/member-define";
import MemberList from "./components/Admin/Member/member-list";
import UserProfile from "./components/User/user-profile";
import InboxComponent from "./components/User/Inbox";
import VoteDefining from "./components/Vote/VoteDefining";
import VotingAndResult from "./components/Vote/VotingAndResult";


export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Switch>
                    <Route exact path="/" component={Home}/>
                    <Route
                        path="/admin/definesiteapartment"
                        component={DefineSiteApartment}
                    />
                    <Route path="/admin/definemember" component={MemberDefine}/>
                    <Route path='/admin/votedefining' component={VoteDefining}/>
                    <Route path='/admin/memberlist' component={MemberList}/>
                    <Route path='/user/profile' component={UserProfile}/>
                    <Route path='/user/inbox' component={InboxComponent}/>
                    <Route path='/vote/votingandresult' component={VotingAndResult}/>
                </Switch>
            </Layout>
        );
    }
}
