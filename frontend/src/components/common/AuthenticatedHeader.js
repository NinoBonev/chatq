/**
 * Created by NinoB on 28.2.2019 г.
 */

import React from 'react';
import {Link} from 'react-router-dom';
import {Icon, Layout, Avatar, Menu, Row, Col} from 'antd';

const {Header} = Layout;
const {SubMenu} = Menu;

class AuthenticatedHeader extends React.Component {
    state = {
        current: '1',
    }

    handleClick = (e) => {
        console.log('click ', e);
        this.setState({
            current: e.key,
        });
    }

    render() {

        const user = this.props.Auth.getProfile() || '';

        return (
            <Header>
                <Row gutter={16}>
                    <Col span={3} offset={1}>
                        <span style={{backgroundColor: 'red'}} />
                    </Col>
                    <Col span={14}>
                        <Menu
                            style={{height: '100%', borderRight: 0, marginTop: 10}}
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="1">

                                    <Link to='/dashboard'><span><Icon type="user"/><span>Dashboard</span></span></Link>

                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/about'><span><Icon type="read"/><span>About</span></span></Link>
                            </Menu.Item>
                            <SubMenu key="sub1" title={<span><Icon type="global"/><span>Browse</span></span>}>
                                <Menu.Item key="3"><Link to='/groups'>Open Groups</Link></Menu.Item>
                                <Menu.Item key="4"><Link to='/challenges'>Challenges</Link></Menu.Item>
                            </SubMenu>
                            {this.props.Auth.isAdmin() ? <SubMenu key="sub3" title={<span><Icon type="tool"/><span>Admin Panel</span></span>}>
                                <Menu.Item key="7"><Link to='/admin/challenges/create'>Add Challenge</Link></Menu.Item>
                                <Menu.Item key="8"><Link to='/admin/groups/create'>Add Group</Link></Menu.Item>
                                <Menu.Item key="9"><Link to='/admin/users/all'>All Users Data</Link></Menu.Item>
                                <Menu.Item key="10"><Link to='/admin/groups/all'>All Groups Data</Link></Menu.Item>
                            </SubMenu> : null}
                        </Menu>
                    </Col>
                    <Col span={3} offset={1}>
                        <div>
                            <Link to='/logout' onClick={this.props.Auth.logout}>Log Out</Link>
                            <Avatar size={50} src={user.avatar} alt=""/>
                        </div>
                    </Col>
                </Row>
            </Header>
        );
    }
}

export default AuthenticatedHeader;

