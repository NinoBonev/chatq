import React from 'react'
import Headroom from 'react-headroom'
import Logo from '../../../resources/27-1.png'
import {Affix, Col, Row, Input, Divider} from 'antd'

import AboutSubHeader from '../sub_headers/AboutSubHeader'
import BrowseSubHeader from '../sub_headers/BrowseSubHeader'
import WithTextSubHeader from '../sub_headers/WithTextSubHeader'

const {Search} = Input
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class AnonymousHeadroom extends React.Component {

    render() {
        const content = {
            welcome: <WithTextSubHeader showText='welcome' {...this.props}/>,
            about: <AboutSubHeader {...this.props}/>,
            browse: <BrowseSubHeader {...this.props}/>,
            signIn: <WithTextSubHeader showText='signIn' {...this.props} />
        }

        return (
            <Headroom className='headroom'>
                <Row style={{height: 60}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '10%'
                        }}>
                            <DemoBox value={60}>
                                <img style={{height: 40}} src={Logo} alt="" onClick={() => {
                                    this.props.setActiveKey('welcome')
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
                                <span className='header-menu-item' onClick={() => this.props.setActiveKey('about')}>About</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '2%'
                    }}>
                            <DemoBox value={60}>
                                <span className='header-menu-item' onClick={() => this.props.setActiveKey('browse')}>Browse</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        position: 'absolute',
                        right: '21%'
                    }}>
                            <DemoBox value={60}>
                                <span className='header-menu-item' onClick={() => {
                                    this.props.setActiveKey('signIn')
                                    this.props.history.push('/login')
                                }}>Sign in</span>
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