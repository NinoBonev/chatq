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

const {Content} = Layout;
const Auth = new AuthService();
const Crud = new CrudService();
const Helper = new HelperService();

class App extends React.Component {
    state = {
        subHeaderKey: 'welcome',
        contentKey: 'followedGroups',
        withHeaderCover: false,
        headerCoverSource: '',
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
