import * as React from 'react';
import { getVisits, getVisitCalendar, setDate } from '@App/store/visits/actions';
import { StateType } from '@App/store/reducers';
import { connect } from 'react-redux';
var moment = require('moment');

import 'react-dates/initialize';

import 'react-dates/lib/css/_datepicker.css';
import { DayPickerSingleDateController } from 'react-dates';

type DatePickerProps = {
    getVisits: typeof getVisits;
    getVisitCalendar: typeof getVisitCalendar;
    setDate: typeof setDate;
    current_date: moment.Moment;
};

type DatePickerState = {
    current_month: moment.Moment;
};

class DatePicker extends React.Component<DatePickerProps> {

    state: DatePickerState = {
        current_month: moment('20190401', 'YYYYMMDD'),
    };

    componentDidMount() {
        this.reloadCalendar();
    }

    componentDidUpdate(prevProps: DatePickerProps, prevState: DatePickerState) {
        if (this.props.current_date !== prevProps.current_date) {
            this.reloadVisits();
        }
    }

    reloadCalendar = () => {
        if (this.state.current_month) {
            this.props.getVisitCalendar(
                this.state.current_month.startOf('month').format('YYYY-MM-DD'), 
                this.state.current_month.endOf('month').format('YYYY-MM-DD')
            );
        }
    }

    reloadVisits = () => {
        if (this.props.current_date) {
            this.props.getVisits(
                this.props.current_date.format('YYYY-MM-DD'), 
                this.props.current_date.format('YYYY-MM-DD')
            );
        }
    }

    setCurrentMonth = (newMonth: moment.Moment ) => {
        this.setState(
            {
                current_month: newMonth
            }, 
            this.reloadCalendar
        );
    }

    render() {
        return (
            <DayPickerSingleDateController
                onPrevMonthClick={this.setCurrentMonth}
                onNextMonthClick={this.setCurrentMonth}
                focused={true}
                date={this.props.current_date}
                onDateChange={this.props.setDate}
                onFocusChange={focusedInput => {}}
                initialVisibleMonth={() => this.state.current_month}
            />
        );
    }
}

const mapStateToProps = ( state: StateType ) => ({
    current_date: state.visits.current_date
});

const mapDispatchToProps = { getVisits, getVisitCalendar, setDate };

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
