import React, {Component} from 'react';
import {Layout, Breadcrumb} from 'antd';
import { withRouter } from "react-router-dom";
import AppRouter from './AppRouter'
import 'antd/dist/antd.css'

import SiderClass from './components/common/Sider';
import HeaderClass from './components/common/Header'
import FooterClass from './components/common/Footer'

import AuthService from './utilities/AuthService'
import CrudService from './utilities/CrudService';
import HelperService from './utilities/HelperService';

const {Content} = Layout;
const Auth = new AuthService();
const Crud = new CrudService();
const Helper = new HelperService();


class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            collapsed: true,
        };

        this.toggleCollapsed = this.toggleCollapsed.bind(this)
    }

    toggleCollapsed = () => {
        this.setState(prevState => ({
            collapsed: !prevState.collapsed,
        }));
    }

    render() {
        return (
            <Layout >
                <SiderClass
                    Auth={Auth}
                    collapsed={this.state.collapsed}/>
                <Layout >
                    <HeaderClass
                        Crud={Crud}
                        Auth={Auth}
                        toggleCollapsed={this.toggleCollapsed}
                        collapsed={this.state.collapsed}>
                    </HeaderClass>
                    <div style={{minHeight: 600, backgroundColor: '#f5f5f5'}}>
                        <Content >
                            <AppRouter Auth={Auth} Crud={Crud} Helper={Helper} />
                        </Content>
                    </div>
                    <FooterClass/>
                </Layout>
            </Layout>
        );
    }
}

export default withRouter(App);
