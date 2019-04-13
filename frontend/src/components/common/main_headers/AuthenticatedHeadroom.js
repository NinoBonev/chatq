import React from 'react'
import Headroom from 'react-headroom'
import Logo from '../../../resources/logo_imatag-10.1039d119047f.png'
import {Affix, Col, Row, Input, Avatar, Popover} from 'antd'

import DashboardSubHeader from '../sub_headers/DashboardSubHeader'
import AboutSubHeader from '../sub_headers/AboutSubHeader'
import WithTextSubHeader from '../sub_headers/WithTextSubHeader'
import UserSubHeader from '../sub_headers/UserSubHeader'
import SingleGroupSubHeader from '../sub_headers/SingleGroupSubHeader'
import AllChallengesSubHeader from "../sub_headers/AllChallengesSubHeader";

const {Search} = Input
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class AuthenticatedHeadroom extends React.Component {
    componentDidMount(){
        console.log(this.props);
    }
    render() {
        const user = this.props.Auth.getProfile();

        const content = {
            home: <WithTextSubHeader showTextContent='welcome' {...this.props}/>,
            about: <AboutSubHeader {...this.props}/>,
            dashboard: <DashboardSubHeader {...this.props} />,
            user: <UserSubHeader {...this.props}/>,

            allGroups: <WithTextSubHeader showTextContent='allGroups' {...this.props} />,
            allChallenges: <AllChallengesSubHeader {...this.props} />,
            allUsers: <WithTextSubHeader showTextContent='allUsers' {...this.props} />,
            singleGroup: <SingleGroupSubHeader {...this.props} />,
            singleChallenge: <WithTextSubHeader showTextContent='singleChallenge' {...this.props} />,

            createChallenge:  <WithTextSubHeader showTextContent='createChallenge' {...this.props} />,
            loading: <WithTextSubHeader showTextContent='loading' {...this.props}/>
        };

        const browseMenu = (
            <div>
                <p className='header-popover-menu-item'
                   onClick={() => {this.props.history.push('/groups')}}>Groups</p>
                <p className='header-popover-menu-item'
                   onClick={() => {this.props.history.push('/challenges')}}>Challenges</p>
            </div>)

        const adminMenu = (
            <div>
                <p className='header-popover-menu-item'
                   onClick={() => {
                       this.props.history.push('/admin/challenges/create')
                   }}>Add Challenge</p>
                <p className='header-popover-menu-item' onClick={() => {
                    this.props.history.push('/admin/groups/create')
                }}>Add Group</p>
                <p className='header-popover-menu-item' onClick={() => {
                    this.props.history.push('/admin/groups/all')
                }}>All Groups</p>
                <p className='header-popover-menu-item' onClick={() => {
                    this.props.history.push('/admin/users/all')
                }}>All Users</p>
            </div>
        )

        return (
            <div>
                <Headroom className='headroom'>
                    <Row style={{height: 50}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '10%'
                        }}>
                            <DemoBox value={50}>
                                <img style={{height: 40}} src={Logo} alt="" onClick={() => {
                                    this.props.history.push('/dashboard')
                                }}/>
                            </DemoBox>
                        </span>
                        <span style={{
                            marginLeft: '5%'
                        }}>
                            <DemoBox value={50}>
                                <Search
                                    className='input-search'
                                    placeholder="People, groups, stories"
                                    onSearch={value => console.log(value)}
                                />
                            </DemoBox>
                        </span>
                        <span style={{
                            marginLeft: '2%'
                        }}>
                            <DemoBox value={50}>
                                <span className='header-menu-item'
                                      onClick={() => this.props.history.push('/dashboard')}>Dashboard</span>
                            </DemoBox>
                        </span>
                        <span style={{
                            marginLeft: '2%'
                        }}>
                            <DemoBox value={50}>
                                <Popover
                                    placement="bottom"
                                    content={browseMenu}
                                    trigger="hover">
                                    <span style={{height: 7}} className='header-menu-item'>
                                        Browse
                                    </span>
                                </Popover>
                            </DemoBox>
                        </span>
                        {this.props.isAdmin && <span style={{
                            marginLeft: '2%'
                        }}>
                            <DemoBox value={30}>
                                <Popover placement="bottom"
                                         content={adminMenu}
                                         trigger="hover">
                                    <span style={{height: 10}} className='header-menu-item'>
                                        Admin
                                    </span>
                            </Popover>
                            </DemoBox>
                        </span>}
                        <span style={{
                            position: 'absolute',
                            right: '21%',
                            marginTop: 5
                        }}>
                            <DemoBox  value={50}>
                                <span className='header-menu-item'>
                                <Avatar size={40} src={user.avatar} alt=""/>
                                </span>
                            </DemoBox>
                        </span>
                        <span style={{
                            position: 'absolute',
                            right: '17%',
                            marginTop: 5
                        }}>
                            <DemoBox value={50}>
                                <span className='header-menu-item'
                                      style={{marginLeft: 10}}
                                      onClick={() => {
                                          this.props.Auth.logout()
                                          this.props.history.push('/logout')
                                      }}>Log Out
                        </span>
                            </DemoBox>
                        </span>
                    </Row>
                </Headroom>
                {this.props.withHeaderCover === true ? <div
                >
                    <Row style={{
                        height: 240,
                        width: '100%',
                        objectFit: 'cover',
                        backgroundImage: `url(${this.props.headerCoverSource})`,
                        backgroundPositionY: 520
                    }}
                    >
                        {this.props.headerCoverAvatar &&
                            <div>
                                <Col span={4} offset={2}>
                                    <Avatar style={{
                                        marginTop: 60,
                                        border: 'white solid 2px'
                                    }} size={160} src={this.props.headerCoverAvatar}/>
                                </Col>
                                <Col span={6}>
                                    {this.props.headerCoverUserInfo && this.props.headerCoverUserInfo}
                                    {this.props.headerCoverGroupInfo && this.props.headerCoverGroupInfo}
                                </Col>
                            </div>
                        }
                    </Row>
                    <Affix>
                        {content[this.props.subHeaderKey]}
                    </Affix>
                </div> : <Affix>
                    {content[this.props.subHeaderKey]}
                </Affix>}
            </div>

        )
    }
}