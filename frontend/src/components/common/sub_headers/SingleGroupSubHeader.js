import React from 'react'
import {Row} from 'antd'

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

const SingleGroupSubHeader = (props) => {
    return (
        <div className='sub-header'>
            <Row style={{height: 70}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '40%'
                        }}>
                            <DemoBox value={60}>
                                <span className='sub-header-name'>Group::{props.groupName}</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '2%'
                }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link'>Info</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '1%'
                }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link'>Rules</span>
                            </DemoBox>
                        </span>
                {props.Auth.isLoggedIn() && <span style={{
                    marginLeft: '1%'
                }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link'>Follow</span>
                            </DemoBox>
                        </span>}

            </Row>
        </div>
    )
}

export default SingleGroupSubHeader