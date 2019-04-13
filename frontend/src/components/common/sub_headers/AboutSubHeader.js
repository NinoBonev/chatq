import React from 'react'
import {Row, Breadcrumb} from 'antd'

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const AboutSubHeader = (props) => {
    return (
        <div className='sub-header'>
            <Row style={{height: 50}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '40%'
                        }}>
                            <DemoBox value={50}>
                                <span className='sub-header-name' style={{
                                    color: '#45b4bf'
                                }}>About</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '2%'
                }}>
                            <DemoBox value={50}>
                                <span className='sub-header-link'>What is Chatq?</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '1%'
                }}>
                            <DemoBox value={50}>
                                <span className='sub-header-link'>Features</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '1%'
                }}>
                            <DemoBox value={50}>
                                <span className='sub-header-link'>Other</span>
                            </DemoBox>
                        </span>
            </Row>
        </div>
    )
}

export default AboutSubHeader