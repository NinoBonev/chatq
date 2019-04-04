import React from 'react'
import Headroom from 'react-headroom'
import Logo from '../../../resources/27-1.png'
import {Affix, Col, Row, Input, Avatar} from 'antd'

import DashboardSubHeader from '../sub_headers/DashboardSubHeader'
import BrowseSubHeader from '../sub_headers/BrowseSubHeader'

const {Search} = Input
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class AuthenticatedHeadroom extends React.Component {
    render() {
        const user= this.props.Auth.getProfile();

        const content = {
            browse: <BrowseSubHeader {...this.props}/>,
            dashboard: <DashboardSubHeader {...this.props} />
        };

        return (
            <Headroom className='headroom'>
                <Row style={{height: 60}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '10%'
                        }}>
                            <DemoBox value={60}>
                                <img style={{height: 40}} src={Logo} alt=""/>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '5%'
                    }}>
                            <DemoBox value={60}>
                                <Search
                                    placeholder="People, groups, stories"
                                    onSearch={value => console.log(value)}
                                    style={{width: 400}}
                                />
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '2%'
                    }}>
                            <DemoBox value={60}>
                                <span className='header-menu-item'
                                      onClick={() => this.props.setActiveKey('dashboard')}>Dashboard</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '2%'
                    }}>
                            <DemoBox value={60}>
                                <span className='header-menu-item'
                                      onClick={() => this.props.setActiveKey('browse')}>Browse</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        position: 'absolute',
                        right: '21%'
                    }}>
                            <DemoBox value={60}>
                                <Avatar size={50} src={user.avatar} alt=""/>
                                 <span className='header-menu-item'
                                       style={{marginLeft: 10}}
                                       onClick={() => {
                                     this.props.Auth.logout()
                                     this.props.history.push('/logout')
                                 }} >Log Out
                        </span>
                                {/*<span className='header-menu-item' onClick={() => this.props.history.push('/login')}>Sign in</span>*/}
                            </DemoBox>
                        </span>
                </Row>
                <Affix offsetTop={60}>
                    {content[this.props.activeKey]}
                </Affix>
            </Headroom>
        )
    }
}