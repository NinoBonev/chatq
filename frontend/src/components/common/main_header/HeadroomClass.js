import React from 'react'
import Headroom from 'react-headroom'
import Logo from '../../../resources/27-1.png'
import {Affix, Col, Row, Input, Divider} from 'antd'

import AboutSubHeader from '../sub_headers/AboutSubHeader'
import BrowseSubHeader from '../sub_headers/BrowseSubHeader'

const {Search} = Input
const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

export default class HeadroomClass extends React.Component {
    state = {
        activeKey: '0'
    };

    setActiveKey(key) {
        this.setState({
            activeKey: key
        })
    }

    render() {
        const content = [<AboutSubHeader {...this.props}/>, <BrowseSubHeader {...this.props}/>]

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
                                <span className='header-menu-item' onClick={() => this.setActiveKey('0')}>About</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        marginLeft: '2%'
                    }}>
                            <DemoBox value={60}>
                                <span className='header-menu-item' onClick={() => this.setActiveKey('1')}>Browse</span>
                            </DemoBox>
                        </span>
                    <span style={{
                        position: 'absolute',
                        right: '21%'
                    }}>
                            <DemoBox value={60}>
                                <span className='header-menu-item' onClick={() => this.props.history.push('/login')}>Sign in</span>
                            </DemoBox>
                        </span>
                </Row>
                <Affix offsetTop={60}>
                    {content[this.state.activeKey]}
                </Affix>
            </Headroom>
        )
    }
}