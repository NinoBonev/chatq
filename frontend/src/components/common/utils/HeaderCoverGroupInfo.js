import React from 'react'
import {Row} from 'antd'


const HeaderCoverGroupInfo = (props) => {
        return(
            <div style={{
                marginTop: 120
            }}>
                <Row>
                    <div style={{
                        color: 'white',
                        fontFamily: 'Helvetica',
                        fontSize: 36,
                    }}>{props.name}
                    </div>
                </Row>
                <Row >
                    <div style={{
                        width: 210,
                        backgroundColor: 'black',
                        opacity: '0.6',
                        color: 'white',
                        fontFamily: 'Helvetica',
                        fontSize: 16,
                    }}><span style={{marginLeft: 10}}>{props.stories} stories</span> --
                        <span> {props.followers} followers</span>
                    </div>
                </Row>
            </div>
        )
}

export default HeaderCoverGroupInfo;