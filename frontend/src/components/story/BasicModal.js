/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react'
import {Modal} from 'antd'
import StoryPage from './StoryPage'

const BasicModal = (props) => {
    return(
        <Modal
            title={props.storyName}
            style={{top: 20}}
            visible={props.visible}
            width='78%'
            destroyOnClose={true}
            onOk={() => props.handleOk()}
            onCancel={() => props.handleCancel()}
        >
            <StoryPage {...props}/>
        </Modal>
        )
}

export default BasicModal