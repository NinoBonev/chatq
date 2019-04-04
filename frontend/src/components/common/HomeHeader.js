/**
 * Created by NinoB on 7.3.2019 г.
 */

import React from 'react'
import {Icon, Layout, Col, Row, Menu, Input} from 'antd';
import {Link} from 'react-router-dom';

const {SubMenu} = Menu
const {Header} = Layout;
const Search = Input.Search;

export default class HomeHeader extends React.Component {
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
            <div className='header'>
                <Row gutter={16}>
                    <Col span={4}>
                        <div className='logo'>

                        </div>
                    </Col>
                    <Col span={4}>
                        <Search
                            placeholder="Story, people, group"
                            onSearch={value => console.log(value)}
                            style={{ width: 200 }}
                        />
                    </Col>
                    <Col span={16}>
                        <div className='logo' style={{backgroundColor: 'transparent'}}>
                            <span style={{color: 'white'}}>
                                Home
                            </span>
                            <span style={{color: 'white', marginLeft: 10}}>
                                About
                            </span>
                            <span style={{color: 'white', marginLeft: 10}}>
                                Get involved
                            </span>
                        </div>
                        {/*<Menu*/}
                            {/*style={{height: '100%', borderRight: 0, marginTop: 10}}*/}
                            {/*onClick={this.handleClick}*/}
                            {/*selectedKeys={[this.state.current]}*/}
                            {/*mode="horizontal"*/}
                        {/*>*/}
                            {/*<Menu.Item key="1">*/}
                                {/*<Link to='/'><span><span>Home</span></span></Link>*/}
                            {/*</Menu.Item>*/}
                            {/*<Menu.Item key="2">*/}
                                {/*<Link to='/about'><span><span>About</span></span></Link>*/}
                            {/*</Menu.Item>*/}
                            {/*<SubMenu key="sub1" title={<span>Browse</span>}>*/}
                                {/*<Menu.Item key="3"><Link to='/groups'>Open Groups</Link></Menu.Item>*/}
                                {/*<Menu.Item key="4"><Link to='/challenges'>Challenges</Link></Menu.Item>*/}
                            {/*</SubMenu>*/}
                            {/*<SubMenu key="sub2" title={<span><Icon type="login"/><span>Get Involved</span></span>}>*/}
                                {/*<Menu.Item key="5"><Link to='/register'>Register</Link></Menu.Item>*/}
                                {/*<Menu.Item key="6"><Link to='/login'>Log In</Link></Menu.Item>*/}
                            {/*</SubMenu>*/}
                        {/*</Menu>*/}
                    </Col>
                </Row>
            </div>

        )
    }
}