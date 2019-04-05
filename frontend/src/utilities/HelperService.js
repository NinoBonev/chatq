/**
 * Created by NinoB on 23.2.2019 г.
 */

class HelperService {

    groupFormInitialState(res){
        if (res === undefined) {
            res = {
                body: {
                    info: '',
                    cover: '',
                    name: '',
                }
            }
        }

        return ({
            info: res.body.info,
            cover: res.body.cover,
            name: res.body.name,
            loading: false,
            sliderValue: false
        })
    }

    dashboardInitialState() {
        return (
            {
                subHeaderKey: '1',
                followGroup: [],
                followPeople: [],
                storiesFromGroups: [],
                storiesFromPeople: [],
                myStories: [],
                myChallenges: [],
                visible: false,
                id: ''
            }
        )
    }

    allUserStoriesInitialState() {
        return (
            {
                avatar: '',
                user: '',
                stories: [],
                challenges: [],
                visible: false,
                id: ''
            }
        )
    }

    storyFormInitialState(res) {
        if (res === undefined) {
            res = {
                body: {
                    cover: '',
                    name: '',
                    info: '',
                    group: '',
                    challenge: '',
                }
            }
        }

        return (
            {
                currentStep: 0,
                loading: false,
                fields: {
                    cover: {
                        value: res.cover
                    },
                    name: {
                        value: res.name
                    },
                    info: {
                        value: res.info
                    },
                    groups: [],
                    group: {
                        value: res.groupId,
                        label: res.group_name
                    },
                    challenge: {
                        value: res.challengeId,
                        label: res.challenge_name
                    },
                    storyline: {
                        value: ""
                    },
                    croppedImageUrl: {
                        value: ''
                    },
                    file: {
                        value: ''
                    },
                    src: {
                        value: ''
                    },
                    crop: {
                        value: {
                            aspect: 1.6,
                        }
                    },
                    sliderValue: {
                        value: false
                    },
                }
            })
    }
}

export default HelperService