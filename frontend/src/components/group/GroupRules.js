/**
 * Created by NinoB on 9.3.2019 г.
 */

import React from 'react'

const GroupRules = (props) => {
        if (props.collapsedRules){
            return(
                <div style={{marginTop: 20}}>
                    <h1 align="center">Group Rules</h1>
                    <div style={{height: 80}}>
                        <p style={{marginLeft: 20}}>- Be polite: Do not fingerpoint, shame, nor attack personally other flickr members.</p>
                        <p style={{marginLeft: 20}}>- Please use the search tools (FlickrCentral discussions, group search) before posting a new topic.</p>
                    </div>
                    <div style={{marginTop: 5}} align="right">
                        <a href="#" onClick={() => props.toggleCollapsed()}>see more info</a>
                    </div>
                </div>
            )
        }

        return(
            <div style={{ marginTop: 20}}>
                <h1 align="center">Group Rules</h1>
                <p style={{marginLeft: 20}}>- Be polite: Do not fingerpoint, shame, nor attack personally other flickr members.</p>
                <p style={{marginLeft: 20}}>- Please use the search tools (FlickrCentral discussions, group search) before posting a new topic.</p>
                <p style={{marginLeft: 20}}>- Photos added to group discussions must be of "small" size, or smaller.</p>
                <p style={{marginLeft: 20}}>- Photos added to the group pool must be 'Kid Friendly' and 'Safe For Workplaces'.</p>
                <div align="right">
                    <a href="#" onClick={() => props.toggleCollapsed()}>hide info</a>
                </div>
            </div>
        )
}

export default GroupRules
