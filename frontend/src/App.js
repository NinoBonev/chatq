import React from 'react';
import {Layout, Breadcrumb} from 'antd';
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
        contentKey: 'followedGroups'
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

    render() {
        return (
            <Layout>
                <Content>
                    <Header {...this.props}
                            Auth={Auth}
                            subHeaderKey={this.state.subHeaderKey}
                            setSubHeaderKey={this.setSubHeaderKey.bind(this)}
                            setContentKey={this.setContentKey.bind(this)}
                    />
                    <div className='main-container'>
                        <AppRouter
                            Auth={Auth}
                            Crud={Crud}
                            Helper={Helper}
                            setContentKey={this.setContentKey.bind(this)}
                            setSubHeaderKey={this.setSubHeaderKey.bind(this)}
                            {...this.state}
                        />
                    </div>
                    <FooterClass />
                </Content>
            </Layout>
        );
    }
}

export default withRouter(App);
