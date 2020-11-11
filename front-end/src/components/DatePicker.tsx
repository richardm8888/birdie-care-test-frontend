import * as React from 'react';
import { getVisits, getVisitCalendar } from '@App/store/visits/actions';
import { StateType } from '@App/store/reducers';
import { connect } from 'react-redux';
var moment = require('moment');

import 'react-dates/initialize';

import 'react-dates/lib/css/_datepicker.css';
import { DayPickerSingleDateController } from 'react-dates';

type DatePickerProps = {
    getVisits: typeof getVisits;
    getVisitCalendar: typeof getVisitCalendar;
};

type DatePickerState = {
    current_month: moment.Moment;
    date: moment.Moment;
};

class DatePicker extends React.Component<DatePickerProps> {

    state: DatePickerState = {
        current_month: moment('20190401', 'YYYYMMDD'),
        date: moment('20190401', 'YYYYMMDD'),
    };

    componentDidMount() {
        this.reloadCalendar();
    }

    componentDidUpdate(prevProps: DatePickerProps, prevState: DatePickerState) {
        if (this.state.date !== prevState.date) {
            this.reloadVisits();
        }

        if (this.state.current_month !== prevState.current_month) {
            this.reloadCalendar();
        }
    }

    reloadCalendar = () => {
        if (this.state.current_month) {
            this.props.getVisitCalendar(
                this.state.date.startOf('month').format('YYYY-MM-DD'), 
                this.state.date.endOf('month').format('YYYY-MM-DD')
            );
        }
    }

    reloadVisits = () => {
        if (this.state.date) {
            this.props.getVisits(this.state.date.format('YYYY-MM-DD'), this.state.date.format('YYYY-MM-DD'));
        }
    }

    setCurrentMonth = (newMonth: moment.Moment ) => {
        this.setState({
            current_month: newMonth
        });
    }

    render() {
        return (
            <DayPickerSingleDateController
                onPrevMonthClick={this.setCurrentMonth}
                onNextMonthClick={this.setCurrentMonth}
                focused={true}
                date={this.state.date}
                onDateChange={(date) => {
                    this.setState({
                        date: date,
                    });
                }}
                // focusedInput={null} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => {}} // PropTypes.func.isRequired,
                initialVisibleMonth={null} // PropTypes.func or null,
            />
        );
    }
}

const mapStateToProps = (state: StateType) => {
    return {
        visits: state.visits.visits
    };
};

const mapDispatchToProps = { getVisits, getVisitCalendar };

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
