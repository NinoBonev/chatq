/**
 * Created by NinoB on 28.2.2019 г.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {Icon, Layout, Avatar} from 'antd';
import AuthService from '../../utilities/AuthService';
import AnonymousHeader from './AnonymousHeader';
import {compose} from 'recompose';
import withEither from '../hoc/withEither';

const Auth = new AuthService();

const {Header} = Layout;

class HeaderBase extends React.Component {
    render() {

        const user = Auth.getProfile()|| '';

        return (
            <Header style={{height: '50px', background: '#000000', padding: 0}}>
                <Icon
                    style={{color: 'white', margin: '0', padding: '0'}}
                    className='trigger'
                    onClick={() => this.props.toggleCollapsed()}
                    type={this.props.collapsed ? 'menu-unfold' : 'menu-fold'}/>
                <span className='header-item-right'>
                    <Link to='/logout' onClick={Auth.logout}>Log Out</Link>
                </span>
                <span className='header-item-right'><Avatar style={{marginBottom: 20}} size={40} src={user.avatar} alt=""/></span>
                <span className='header-user-welcome'>{'Welocome back, ' + user.username}</span>
            </Header>
        );
    }
}

const isAuthConditionFn = () => Auth.isLoggedIn();
const withConditionalRenderings = compose(
    withEither(isAuthConditionFn, AnonymousHeader)
);
const HeaderClass = withConditionalRenderings(HeaderBase);

export default HeaderClass;

