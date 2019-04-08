/**
 * Created by NinoB on 9.3.2019 г.
 */

import React from 'react'
import {Modal} from 'antd'

const GroupRules = (props) => {
    return (
        <div>
            <Modal
                title="Group Rules"
                visible={props.rulesVisible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
            >
                <h1 align="center">Group Rules</h1>
                <p style={{marginLeft: 20}}>- Be polite: Do not fingerpoint, shame, nor attack personally other flickr
                    members.</p>
                <p style={{marginLeft: 20}}>- Please use the search tools (FlickrCentral discussions, group search)
                    before posting a new topic.</p>
                <p style={{marginLeft: 20}}>- Photos added to group discussions must be of "small" size, or smaller.</p>
                <p style={{marginLeft: 20}}>- Photos added to the group pool must be 'Kid Friendly' and 'Safe For
                    Workplaces'.</p>

            </Modal>
        </div>
    )
}

export default GroupRules
