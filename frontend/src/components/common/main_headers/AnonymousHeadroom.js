import React from 'react'
import Headroom from 'react-headroom'
import Logo from '../../../resources/logo_imatag-10.1039d119047f.png'
import {Affix, Menu, Row, Input, Popover, Col, Avatar} from 'antd'

import AboutSubHeader from '../sub_headers/AboutSubHeader'
import WithTextSubHeader from '../sub_headers/WithTextSubHeader'
import SingleGroupSubHeader from '../sub_headers/SingleGroupSubHeader'
import UserSubHeader from '../sub_headers/UserSubHeader'
import AllChallengesSubHeader from "../sub_headers/AllChallengesSubHeader";

const {Search} = Input
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class AnonymousHeadroom extends React.Component {

    render() {
        const content = {
            home: <WithTextSubHeader showTextContent='welcome' {...this.props}/>,
            about: <AboutSubHeader {...this.props}/>,
            user: <UserSubHeader {...this.props}/>,
            signIn: <WithTextSubHeader showTextContent='signIn' {...this.props} />,

            allGroups: <WithTextSubHeader showTextContent='allGroups' {...this.props} />,
            allChallenges: <AllChallengesSubHeader {...this.props} />,
            singleGroup: <SingleGroupSubHeader {...this.props} />,
            singleChallenge: <WithTextSubHeader showTextContent='allGroups' {...this.props} />,

            loading: <WithTextSubHeader {...this.props}/>
        }

        const browseMenu = (<div>
            <p className='header-popover-menu-item'
               onClick={() => {this.props.history.push('/groups')}}>Groups</p>
            <p style={{marginTop: 5}} className='header-popover-menu-item'
               onClick={() => {this.props.history.push('/challenges')}}>Challenges</p>
        </div>)

        return (
            <div>
                <Headroom className='headroom'>
                    <Row style={{height: 50}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '10%'
                        }}>
                            <DemoBox value={50}>
                                <img style={{height: 40}} src={Logo} alt="" onClick={() => {
                                    this.props.history.push('/')
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
                                      onClick={() => {
                                          this.props.history.push('/about')
                                      }}>About</span>
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
                        <span style={{
                            position: 'fixed',
                            right: '21%',
                            marginTop: 5
                        }}>
                            <DemoBox value={50}>
                                <span className='header-menu-item' onClick={() => {
                                    this.props.history.push('/login')
                                }}>Sign in</span>
                            </DemoBox>
                        </span>
                    </Row>
                </Headroom>
                {this.props.withHeaderCover === true ? <div
                >
                    <div style={{
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
                            <Col span={5}>
                                {this.props.headerCoverUserInfo && this.props.headerCoverUserInfo}
                                {this.props.headerCoverGroupInfo && this.props.headerCoverGroupInfo}
                            </Col>
                        </div>
                        }
                    </div>
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