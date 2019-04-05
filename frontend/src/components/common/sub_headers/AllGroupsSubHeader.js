import React from 'react'
import {Row, Select} from 'antd'

const DemoBox = props => <p className={`height-${props.value}`}>{props.children}</p>;

function handleChange(value) {
    console.log(`selected ${value}`);
}

const AllGroupsSubHeader = (props) => {
    return (
        <div className='sub-header'>
            <Row style={{height: 70}} type="flex" align="middle">
                        <span style={{
                            marginLeft: '40%'
                        }}>
                            <DemoBox value={60}>
                                <span className='sub-header-name'>Groups</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '2%'
                }}>
                            <DemoBox value={60}>
                                <span className='sub-header-link'>Sort by:</span>
                            </DemoBox>
                        </span>
                <span style={{
                    marginLeft: '1%'
                }}>
                            <DemoBox value={60}>
                                <Select defaultValue='popular' className='groupSelect' id='groupsSelect'
                                        style={{ width: 120, color: 'paleturquoise' }}
                                        showArrow={false}
                                        onChange={handleChange}>
                                    <Select.Option value='popular'>Most popular</Select.Option>
                                    <Select.Option value='alphabetically'>Alphabetically</Select.Option>
                                </Select>
                            </DemoBox>
                        </span>
            </Row>
        </div>
    )
}

export default AllGroupsSubHeader