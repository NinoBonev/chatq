import React from 'react'
import Headroom from 'react-headroom'
import Logo from '../../../resources/27-1.png'
import {Affix, Menu, Row, Input, Dropdown} from 'antd'
import {Link} from 'react-router-dom'

import AboutSubHeader from '../sub_headers/AboutSubHeader'
import WithTextSubHeader from '../sub_headers/WithTextSubHeader'
import AllGroupsSubHeader from "../sub_headers/AllGroupsSubHeader";
import SingleGroupSubHeader from '../sub_headers/SingleGroupSubHeader'

const {Search} = Input
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class AnonymousHeadroom extends React.Component {

    render() {
        const content = {
            home: <WithTextSubHeader showTextContent='welcome' {...this.props}/>,
            about: <AboutSubHeader {...this.props}/>,
            signIn: <WithTextSubHeader showTextContent='signIn' {...this.props} />,
            allGroups: <WithTextSubHeader showTextContent='allGroups' {...this.props} />,
            allChallenges: <WithTextSubHeader showTextContent='allGroups' {...this.props} />,
            singleGroup: <SingleGroupSubHeader {...this.props} />
        }

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
                                <img style={{height: 40}} src={Logo} alt="" onClick={() => {
                                    this.props.history.push('/')
                                }}/>
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
                                      onClick={() => {
                                          this.props.history.push('/about')
                                      }}>About</span>
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
                                <a className='header-menu-item' onClick={() => {
                                    this.props.history.push('/login')
                                }}>Sign in</a>
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