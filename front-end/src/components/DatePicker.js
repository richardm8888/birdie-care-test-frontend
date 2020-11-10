import * as React from 'react';
import { getVisits } from '@App/store/visits/actions';
import { connect } from 'react-redux';

import 'react-dates/initialize';

import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController } from 'react-dates';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  body {
    height: 100vh;
    background-color: #F9F9F9;
    > div {
      height: 100%;
    }
  }
`;


class DatePicker extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        this.props.getVisits();
    }

    render() {
        console.log(this.props.visits);
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

const mapStateToProps = state => ({
    visits: state.visits,
});

const mapDispatchToProps = {
    getVisits
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
