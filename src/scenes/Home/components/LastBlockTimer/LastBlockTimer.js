import React, { Component } from 'react';

class LastBlockTimer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            lastBlock: {},
            time: 0
        };
        this.setTimer();
    }

    componentDidUpdate(previousProps, previousState) {
        if (previousProps.lastBlock && previousProps.lastBlock !== previousState.lastBlock) {
            !this.isCancelled && this.setState({
                lastBlock: previousProps.lastBlock,
                time: 0//((+new Date()) / 1000 - previousProps.lastBlock.timestamp)
            });
        }
    }

    componentWillUnmount(){
        this.isCancelled = true;
    }

    setTimer() {
        setInterval(() => {
            !this.isCancelled && this.setState({
                time: (+this.state.time + 0.1)
            });
        }, 100);
    }

    render() {
        return (
            <React.Fragment>{this.state.time < 0 ? 0 : this.state.time.toFixed(1)}</React.Fragment>
        );
    }
}

export default LastBlockTimer;
