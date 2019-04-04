import React from 'react';
import {Layout, Breadcrumb} from 'antd';
import {withRouter} from "react-router-dom";
import AppRouter from './AppRouter'
import 'antd/dist/antd.css'

import HeadroomClass from "./components/common/main_header/HeadroomClass";
import FooterClass from './components/common/Footer'

import AuthService from './utilities/AuthService'
import CrudService from './utilities/CrudService';
import HelperService from './utilities/HelperService';

const {Content} = Layout;
const Auth = new AuthService();
const Crud = new CrudService();
const Helper = new HelperService();

const App = (props) =>  {
        return (
            <Layout>
                <div>
                    <HeadroomClass {...props}/>
                </div>
                <div style={{minHeight: 600, backgroundColor: '#f5f5f5'}}>
                    <Content>
                        <AppRouter Auth={Auth} Crud={Crud} Helper={Helper}/>
                    </Content>
                </div>
                <FooterClass/>
            </Layout>
        );

}

export default withRouter(App);
