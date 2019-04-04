import React from 'react';
import {Layout, Breadcrumb} from 'antd';
import {withRouter} from "react-router-dom";
import AppRouter from './AppRouter'
import 'antd/dist/antd.css'

import AnonymousHeadroom from "./components/common/main_headers/AnonymousHeadroom";
import AuthenticatedHeadroom from './components/common/main_headers/AuthenticatedHeadroom'
import FooterClass from './components/common/Footer'

import AuthService from './utilities/AuthService'
import CrudService from './utilities/CrudService';
import HelperService from './utilities/HelperService';

const {Content} = Layout;
const Auth = new AuthService();
const Crud = new CrudService();
const Helper = new HelperService();

class App extends React.Component {
    state = {
        activeKey: 'welcome'
    }

    setActiveKey =(key) => {
        this.setState({
            activeKey: key
        })
    }

    render(){
        return (
            <Layout>
                <div style={{minHeight: 600, backgroundColor: '#f5f5f5'}}>
                    <Content>
                        <AppRouter Auth={Auth} Crud={Crud} Helper={Helper}
                                   {...this.state} setActiveKey={this.setActiveKey}/>
                    </Content>
                    <FooterClass/>
                </div>
            </Layout>
        );
    }
}

export default withRouter(App);
