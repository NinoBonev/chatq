/**
 * Created by NinoB on 9.3.2019 г.
 */

import React from 'react';

const GroupInfo = (props) => {
    if (props.collapsedInfo) {
        return (
            <div style={{marginLeft: 30, marginTop: 20}}>
                <h1 align="center">Group Description</h1>
                <div style={{height: 80}}>
                    <p style={{marginLeft: 20}}>This Group is friendly, social and supportive. We hope we can inspire,
                        motivate, and
                        encourage each other to excel in the art of photography and a memorable social experience
                        where you discover amazing, talented like-minded people...
                    </p>
                </div>
                <div style={{marginTop: 5}} align="right">
                    <a href="#" onClick={() => props.toggleCollapsed()}>see more info</a>
                </div>
            </div>
        );
    }

    return (
        <div style={{marginLeft: 30, marginTop: 20}}>
            <h1 align="center">Group Description</h1>
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
            <div align="right">
                <a href="#" onClick={() => props.toggleCollapsed()}>hide info</a>
            </div>
        </div>
    );

}

export default GroupInfo;