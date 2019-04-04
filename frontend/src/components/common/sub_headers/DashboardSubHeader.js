import React from 'react'
import {Row, Divider } from 'antd'

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const DashboardSubHeader = (props) => {
    return(
        <div className='sub-header'>
            <Row style={{height: 70}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '40%'
                        }}>
                            <DemoBox value={60}>
                                <span  className='sub-header-name'>Dashboard</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '2%'
                }}>
                            <DemoBox value={60}>
                                <span  className='sub-header-link' onClick={() => props.history.push('/dashboard')}>My Flow</span>
                            </DemoBox>
                        </span>
                <Divider type="vertical" />
                <span style={{
                    marginLeft: '1%'
                }}>
                            <DemoBox value={60}>
                                <span  className='sub-header-link' onClick={() => props.history.push('/groups')}>My Stories</span>
                            </DemoBox>
                        </span>
                <Divider type="vertical" />
                <span style={{
                    marginLeft: '1%'
                }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link' onClick={() => props.history.push('/challenges')}>My Challenges</span>
                            </DemoBox>
                        </span>
            </Row>
        </div>
    )
}

export default DashboardSubHeader