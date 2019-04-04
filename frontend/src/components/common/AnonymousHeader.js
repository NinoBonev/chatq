/**
 * Created by NinoB on 7.3.2019 г.
 */

import React from 'react'
import {Icon, Layout, Col, Row, Menu} from 'antd';
import {Link} from 'react-router-dom';

const {SubMenu} = Menu
const {Header} = Layout;

export default class HeaderClass extends React.Component {
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
        return (
            <div style={{backgroundColor: 'black', height: '70px'}}>
                <Row gutter={16}>
                    <Col span={4}>
                        <div style={{height:40, width: 80, backgroundColor : 'red'}}>Logo</div>
                    </Col>
                    <Col span={14}>
                        <Menu
                            style={{height: '100%', borderRight: 0, marginTop: 10, backgroundColor: 'black'}}
                            onClick={this.handleClick}
                            selectedKeys={[this.state.current]}
                            mode="horizontal"
                        >
                            <Menu.Item key="1">
                                    <Link to='/'><span><span>Home</span></span></Link>
                            </Menu.Item>
                            <Menu.Item key="2">
                                <Link to='/about'><span><span>About</span></span></Link>
                            </Menu.Item>
                            <SubMenu key="sub1" title={<span>Browse</span>}>
                                <Menu.Item key="3"><Link to='/groups'>Open Groups</Link></Menu.Item>
                                <Menu.Item key="4"><Link to='/challenges'>Challenges</Link></Menu.Item>
                            </SubMenu>
                            <SubMenu key="sub2" title={<span><Icon type="login"/><span>Get Involved</span></span>}>
                                <Menu.Item key="5"><Link to='/register'>Register</Link></Menu.Item>
                                <Menu.Item key="6"><Link to='/login'>Log In</Link></Menu.Item>
                            </SubMenu>
                        </Menu>
                    </Col>
                    <Col span={6}>
                        <div style={{height: 40, width: 90, backgroundColor: 'red'}}>Hello</div>
                    </Col>
                </Row>
            </div>

        )
    }
}