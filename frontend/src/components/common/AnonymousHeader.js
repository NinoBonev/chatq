/**
 * Created by NinoB on 7.3.2019 г.
 */

import React from 'react'
import {Icon, Layout} from 'antd';


const { Header } = Layout;

export default class HeaderClass extends React.Component{
    render() {
        const user = this.props.Auth.getProfile() || '';
        return(
            <Header style={{height: '50px', background: '#000000', padding: 0}}>
                <Icon
                    style={{color: 'white'}}
                    className='trigger'
                    onClick={() => this.props.toggleCollapsed()}
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}/>
            </Header>
        )
    }
}