import * as React from 'react';
import { getVisits } from '@App/store/visits/actions';
import { StateType } from '@App/store/reducers';
import { connect } from 'react-redux';

import 'react-dates/initialize';

import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController } from 'react-dates';

interface DatePickerProps {
    getVisits: typeof getVisits;
}

class DatePicker extends React.Component<DatePickerProps> {

    componentDidMount() {
        this.props.getVisits(new Date('2019-04-25'), new Date('2019-04-25'));
    }

    render() {
        return (
            <DayPickerRangeController
                startDate={null} // momentPropTypes.momentObj or null,
                endDate={null} // momentPropTypes.momentObj or null,
                onDatesChange={({ startDate, endDate }) => {}} // PropTypes.func.isRequired,
                focusedInput={null} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
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

const mapDispatchToProps = { getVisits };

export default connect(mapStateToProps, mapDispatchToProps)(DatePicker);
