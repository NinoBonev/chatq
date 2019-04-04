import React from 'react'
import {Row} from 'antd'

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const AboutSubHeader = () => {
    return (
        <div className='sub-header'>
            <Row style={{height: 70}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '40%'
                        }}>
                            <DemoBox value={60}>
                                <span className='sub-header-name'>About</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '2%'
                }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link'>What is Chatq?</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '1%'
                }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link'>Features</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '1%'
                }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link'>Other</span>
                            </DemoBox>
                        </span>
            </Row>
        </div>
    )
}

export default AboutSubHeader