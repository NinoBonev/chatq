/**
 * Created by NinoB on 9.3.2019 г.
 */

import React from 'react';
import {Modal} from 'antd'

const GroupInfo = (props) => {
    return(
        <div>
            <Modal
                title="Group Info"
                visible={props.infoVisible}
                onOk={props.handleOk}
                onCancel={props.handleCancel}
            >
                <p style={{marginLeft: 20}}>This Group is friendly, social and supportive. We hope we can inspire,
                    motivate, and
                    encourage each other to excel in the art of photography and a memorable social experience
                    where you discover amazing, talented like-minded people.
                    Use the avenue of Catchy Colors to gain as much exposure to your work as possible. Highlight your
                    photos in Discussion Topics,
                    invite the followers who inspires you. Enjoy the Group Photos, enrich your favorites and encourage
                    talent via feedback in comments.
                    Be an inspiration - to all aspiring members here with your personal touch.
                    Catchy Colors is a <strong>FREE ZONE of CREATIVITY</strong> with a TWIST. I want all the member to
                    own this group and not feel restricted
                    or bogged down by rules. Enjoy the freedom of creative dialogue as This GROUP is YOURS. Take the
                    initiatives, start new
                    unique topics, and interact with members - for that is how we can connect and grow both as
                    individuals and as a community.
                    Plus, I'm always around to assist and help along with my great team.
                </p>
            </Modal>
        </div>
    )
}


export default GroupInfo;