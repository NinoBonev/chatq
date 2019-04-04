/**
 * Created by NinoB on 28.2.2019 г.
 */

import React from 'react';

import {Menu, Icon} from 'antd';
import {Link} from 'react-router-dom';
import {Layout} from 'antd';

const {Sider} = Layout;
const {SubMenu} = Menu;

class SiderClass extends React.Component {
    rootSubmenuKeys = ['sub1', 'sub2', 'sub3'];
    state = {
        openKeys: [],
    };

    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(key => this.state.openKeys.indexOf(key) === -1);

        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    }

    render() {
        return (
            <Sider
                theme='light'
                className='ant-layout-sider-has-trigger'
                breakpoint="1g"
                width={180}
                collapsed={this.props.collapsed}>
                <div className="logo">
                    <img src="../../resources/27-1.png" alt=""/>
                </div>
                <Menu
                    style={{height: '100%', borderRight: 0}}
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    theme="light"
                    openKeys={this.state.openKeys}
                    onOpenChange={this.onOpenChange.bind(this)}
                >
                    <Menu.Item key="1">
                        {this.props.Auth.isLoggedIn() ?
                            <Link to='/dashboard'><span><Icon type="user"/><span>Dashboard</span></span></Link> :
                            <Link to='/'><span><Icon type="home"/><span>Home</span></span></Link>}
                    </Menu.Item>
                    <Menu.Item key="2">
                        <Link to='/about'><span><Icon type="read"/><span>About</span></span></Link>
                    </Menu.Item>
                    <SubMenu key="sub1" title={<span><Icon type="global"/><span>Browse</span></span>}>
                        <Menu.Item key="3"><Link to='/groups'>Open Groups</Link></Menu.Item>
                        <Menu.Item key="4"><Link to='/challenges'>Challenges</Link></Menu.Item>
                    </SubMenu>
                    {this.props.Auth.isLoggedIn() ? null : <SubMenu key="sub2" title={<span><Icon type="login"/><span>Get Involved</span></span>}>
                        <Menu.Item key="5"><Link to='/register'>Register</Link></Menu.Item>
                        <Menu.Item key="6"><Link to='/login'>Log In</Link></Menu.Item>
                    </SubMenu>}
                    {this.props.Auth.isAdmin() ? <SubMenu key="sub3" title={<span><Icon type="tool"/><span>Admin Panel</span></span>}>
                        <Menu.Item key="7"><Link to='/admin/challenges/create'>Add Challenge</Link></Menu.Item>
                        <Menu.Item key="8"><Link to='/admin/groups/create'>Add Group</Link></Menu.Item>
                        <Menu.Item key="9"><Link to='/admin/users/all'>All Users Data</Link></Menu.Item>
                        <Menu.Item key="10"><Link to='/admin/groups/all'>All Groups Data</Link></Menu.Item>
                    </SubMenu> : null}
                </Menu>
            </Sider>
        );
    }
};

export default SiderClass;