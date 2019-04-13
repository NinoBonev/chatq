import React from 'react';
import {Layout} from 'antd';
import {withRouter, Link} from "react-router-dom";
import AppRouter from './AppRouter'
import 'antd/dist/antd.css'

import FooterClass from './components/common/Footer'

import AuthService from './utilities/AuthService'
import CrudService from './utilities/CrudService';
import HelperService from './utilities/HelperService';
import Header from "./components/common/Header";
import HeaderCoverUserInfo from './components/common/utils/HeaderCoverUserInfo'
import HeaderCoverGroupInfo from './components/common/utils/HeaderCoverGroupInfo'

const {Content} = Layout;
const Auth = new AuthService();
const Crud = new CrudService();
const Helper = new HelperService();

class App extends React.Component {
    state = {
        subHeaderKey: 'welcome',
        contentKey: '',
        withHeaderCover: false,
        headerCoverSource: '',
        headerCoverAvatar: '',
        headerCoverUserInfo: '',
        headerCoverGroupInfo: '',
        subHeaderLocation: '/'
    }


    setSubHeaderLocation = (newProps) => {
        this.setState({
            subHeaderLocation: newProps
        })
    }

    setSubHeaderKey = (key) => {
        this.setState({
            subHeaderKey: key
        })
    }

    setContentKey = (key) => {
        this.setState({
            contentKey: key
        })
    }

    setHeaderCoverVisibility = (boolean) => {
        this.setState({
            withHeaderCover: boolean
        })
    }

    setHeaderCoverSource = (image) => {
        this.setState({
            headerCoverSource: image
        })
    }

    setHeaderCoverAvatar = (image) => {
        this.setState({
            headerCoverAvatar: image
        })
    }

    setHeaderCoverUserInfo = (name, username, followers, following, followGroups, stories) => {
        this.setState({
            headerCoverUserInfo: <HeaderCoverUserInfo
                name={name}
                username={username}
                followers={followers}
                following={following}
                followGroups={followGroups}
                stories={stories}
            />
        })
    }

    clearHeaderCoverUserInfo(){
        this.setState({
            headerCoverUserInfo: ''
        })
    }

    setHeaderCoverGroupInfo = (name, followers, stories) => {
        this.setState({
            headerCoverGroupInfo: <HeaderCoverGroupInfo
                name={name}
                followers={followers}
                stories={stories}
            />
        })
    }

    clearHeaderCoverGroupInfo(){
        this.setState({
            headerCoverGroupInfo: ''
        })
    }

    render() {
        return (
            <Layout>
                <Content>
                    <Header
                        {...this.props}
                        subHeaderLocation={this.state.subHeaderLocation}
                        setSubHeaderLocation={this.setSubHeaderLocation.bind(this)}
                        isAuth={Auth.isLoggedIn()}
                        isAdmin={Auth.isAdmin()}
                        Crud={Crud}
                        Auth={Auth}
                        subHeaderKey={this.state.subHeaderKey}
                        setSubHeaderKey={this.setSubHeaderKey.bind(this)}
                        setContentKey={this.setContentKey.bind(this)}
                        setHeaderCoverVisibility={this.setHeaderCoverVisibility.bind(this)}
                        withHeaderCover={this.state.withHeaderCover}
                        setHeaderCoverSource={this.setHeaderCoverSource.bind(this)}
                        headerCoverSource={this.state.headerCoverSource}
                        setHeaderCoverAvatar={this.setHeaderCoverAvatar.bind(this)}
                        headerCoverAvatar={this.state.headerCoverAvatar}
                        setHeaderCoverUserInfo={this.setHeaderCoverUserInfo.bind(this)}
                        clearHeaderCoverUserInfo={this.clearHeaderCoverUserInfo.bind(this)}
                        headerCoverUserInfo={this.state.headerCoverUserInfo}
                        setHeaderCoverGroupInfo={this.setHeaderCoverGroupInfo.bind(this)}
                        clearHeaderCoverGroupInfo={this.clearHeaderCoverGroupInfo.bind(this)}
                        headerCoverGroupInfo={this.state.headerCoverGroupInfo}
                    />
                    <div className='main-container'>
                        <AppRouter
                            Auth={Auth}
                            Crud={Crud}
                            Helper={Helper}
                            setContentKey={this.setContentKey.bind(this)}
                            setSubHeaderKey={this.setSubHeaderKey.bind(this)}
                            setSubHeaderLocation={this.setSubHeaderLocation.bind(this)}
                            setHeaderCoverVisibility={this.setHeaderCoverVisibility.bind(this)}
                            setHeaderCoverSource={this.setHeaderCoverSource.bind(this)}
                            setHeaderCoverAvatar={this.setHeaderCoverAvatar.bind(this)}
                            setHeaderCoverUserInfo={this.setHeaderCoverUserInfo.bind(this)}
                            clearHeaderCoverUserInfo={this.clearHeaderCoverUserInfo.bind(this)}
                            setHeaderCoverGroupInfo={this.setHeaderCoverGroupInfo.bind(this)}
                            clearHeaderCoverGroupInfo={this.clearHeaderCoverGroupInfo.bind(this)}
                            {...this.state}
                            {...this.props}
                        />
                    </div>
                    <FooterClass/>
                </Content>
            </Layout>
        );
    }
}

export default withRouter(App);
