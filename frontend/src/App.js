import React from 'react';
import {Layout} from 'antd';
import {withRouter, Link} from "react-router-dom";
import AppRouter from './AppRouter'
import 'antd/dist/antd.css'

import FooterClass from './components/common/Footer'
import Header from "./components/common/Header";
import withAppStateHandler from './withAppStateHandler'

const {Content} = Layout;

class AppClass extends React.Component {
    componentDidMount(){
        console.log(this.props);
    }
    render() {
        return (
            <Layout>
                <Content>
                    <Header
                        {...this.props}
                    />
                    <div className='main-container'>
                        <AppRouter
                            {...this.props}
                        />
                    </div>
                    <FooterClass/>
                </Content>
            </Layout>
        );
    }
}

let App = withRouter(AppClass)
App = withAppStateHandler(App);

export default App;
