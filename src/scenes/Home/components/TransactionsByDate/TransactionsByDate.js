import React from 'react';
import './TransactionsByDate.css';
import { CalendarInput, Button } from '@ambrosus/react';
import API from '../../api';
import getCalendarDate from '../../utilities/getCalendarDate'
import calendarImg from '../../assets/icons/calendar.png';

class TransactionsByDate extends React.Component {

    state = { value: getCalendarDate() };

    clear = ({ target }) => {
        if (target.tagName === "INPUT") {
            this.setState({ value: "" });
        }
    }

    setTimeValue = (date) => {
        this.setState({ value: date });
    }

    getCSV = () => {
        // console.log("ddd", this.props)
        // console.log("tt", this.state.value)
        const { address } = this.props;
        if (this.state.value !== "") {
            API.followTheLink(this.state.value, address);
            this.setState({ value: "" });
        }
    }

    render() {
        return (
            <div className="date__form" onClick={this.clear}>
                <CalendarInput onClick={this.clear} onSelect={this.setTimeValue} defaultValue={this.state.value} />
                <Button className={`date__submit ${(this.state.value === "") ? 'download__impossible' : ''}`} onClick={this.getCSV}>Export to CSV</Button>
            </div >
        );
    }
};

export default TransactionsByDate;