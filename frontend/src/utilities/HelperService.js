/**
 * Created by NinoB on 23.2.2019 г.
 */

class HelperService {

    dashboardInitialState() {
        return (
            {
                activeKey: '1',
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

    storyFormInitialState(res, groupName, challengeName) {
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
                        value: res.body.cover
                    },
                    name: {
                        value: res.body.name
                    },
                    info: {
                        value: res.body.info
                    },
                    groups: [],
                    group: {
                        value: res.body.group,
                        label: groupName
                    },
                    challenge: {
                        value: res.body.challenge,
                        label: challengeName
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
                            aspect: 1,
                            width: 50,
                            x: 0,
                            y: 0,
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