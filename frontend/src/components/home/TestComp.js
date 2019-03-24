import React from 'react'

class TestComp extends React.Component {

    state = {};

    componentDidMount() {

        setInterval(this.hello, 250);
    }

    hello = () => {
       fetch('/api/hello')
            .then((response) => {
                response.text().then((message) => {
                    this.setState({message: message});
                });
            })
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1 className="App-title">{this.state.message}</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
            </div>
        );
    }
}

export default TestComp;