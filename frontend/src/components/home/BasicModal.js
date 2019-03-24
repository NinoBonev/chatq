/**
 * Created by NinoB on 15.3.2019 г.
 */

import React from 'react'
import {Modal} from 'antd'
import StoryPage from '../story/StoryPage'

const BasicModal = (props) => {
    return(
        <Modal
            title="Storyline"
            style={{top: 20}}
            visible={props.visible}
            width='85%'
            destroyOnClose={true}
            onOk={() => props.handleOk()}
            onCancel={() => props.handleCancel()}
        >
            <StoryPage Crud={props.Crud} id={props.id}/>
        </Modal>
        )
}

export default BasicModal