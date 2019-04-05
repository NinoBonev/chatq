import React from 'react'
import Headroom from 'react-headroom'
import Logo from '../../../resources/27-1.png'
import {Affix, Col, Row, Input, Avatar, Menu, Dropdown} from 'antd'

import DashboardSubHeader from '../sub_headers/DashboardSubHeader'
import AboutSubHeader from '../sub_headers/AboutSubHeader'
import WithTextSubHeader from '../sub_headers/WithTextSubHeader'
import AllGroupsSubHeader from "../sub_headers/AllGroupsSubHeader";
import SingleGroupSubHeader from '../sub_headers/SingleGroupSubHeader'

const {Search} = Input
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class AuthenticatedHeadroom extends React.Component {
    render() {
        const user= this.props.Auth.getProfile();

        const content = {
            home: <WithTextSubHeader showTextContent='welcome' {...this.props}/>,
            about: <AboutSubHeader {...this.props}/>,
            dashboard: <DashboardSubHeader {...this.props} />,

            allGroups: <WithTextSubHeader showTextContent='allGroups' {...this.props} />,
            allChallenges: <WithTextSubHeader showTextContent='allGroups' {...this.props} />,
            singleGroup: <SingleGroupSubHeader {...this.props} />
        };

        const browseMenu = (<Menu>
            <Menu.Item key="1"><span onClick={() => {
                this.props.history.push('/groups')
            }}>Groups</span></Menu.Item>
            <Menu.Item key="2"><span onClick={() => {
                this.props.history.push('/challenges')
            }}>Challenges</span></Menu.Item>
        </Menu>)

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
                                      onClick={() => this.props.history.push('/dashboard')}>Dashboard</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '2%'
                    }}>
                            <DemoBox value={60}>
                                <Dropdown overlay={browseMenu} trigger={['hover']}>
                                    <span className='header-menu-item'
                                          style={{userSelect: 'none'}}>Browse</span>
                                </Dropdown>

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
                            </DemoBox>
                        </span>
                </Row>
                <Affix offsetTop={60}>
                    {content[this.props.subHeaderKey]}
                </Affix>
            </Headroom>
        )
    }
}