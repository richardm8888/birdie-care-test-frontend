import * as React from 'react';
import { StateType } from '@App/store/reducers';
import { Visit, Event } from '@App/store/visits/types';
import { connect } from 'react-redux';

import Timeline from '@material-ui/lab/Timeline';
import Typography from '@material-ui/core/Typography';
import FluidObservationTimeline from '@App/components/events/FluidObservationTimeline';
import FoodObservationTimeline from '@App/components/events/FoodObservationTimeline';
import MoodObservationTimeline from '@App/components/events/MoodObservationTimeline';
import PhysicalHealthObservationTimeline from '@App/components/events/PhysicalHealthObservationTimeline';
import MentalHealthObservationTimeline from '@App/components/events/MentalHealthObservationTimeline';
import IncontinencePadObservationTimeline from '@App/components/events/IncontinencePadObservationTimeline';
import StartTimeline from './events/StartTimeline';
import EndTimeline from './events/EndTimeline';
const moment = require('moment');

type VisitTimelineProps = {
    current_visit: Visit
};

class VisitTimeline extends React.Component<VisitTimelineProps> {

    getObservationEvents = () => {
        if (!this.props.current_visit) {
            return [];
        }

        return this.props.current_visit.events.filter( 
            event => (
                event.event_type.endsWith('_observation') || 
                event.event_type === 'check_in' ||
                event.event_type === 'check_out'
            )
        ).sort((a: Event, b: Event) => {
            if (a.timestamp < b.timestamp) {
                return -1;
            }
            if (a.timestamp > b.timestamp) {
                return 1;
            }

            return 0;
        });
    }

    mapObservationEventToDetails = (event: Event) => {
        switch (event.event_type) {
            case 'fluid_intake_observation':
                return FluidObservationTimeline(event);
            case 'food_intake_observation':
                return FoodObservationTimeline(event);
            case 'mental_health_observation':
                return MentalHealthObservationTimeline(event);
            case 'physical_health_observation':
                return PhysicalHealthObservationTimeline(event);
            case 'mood_observation':
                return MoodObservationTimeline(event);
            case 'incontinence_pad_observation':
                return IncontinencePadObservationTimeline(event);
            case 'check_in':
                return StartTimeline(event);
            case 'check_out':
                return EndTimeline(event);
            default:
                return null;
        }
    }

    render() {
        if (!this.props.current_visit) {
            return null;
        }

        const visitDate = moment(
            this.props.current_visit.start_timestamp
        ).format('Do MMMM YYYY, h:mma');

        return (
            <>
                <Typography variant="h5" component="h1">
                    Details of visit at {visitDate}:
                </Typography>
                <Timeline align="alternate">
                    {this.getObservationEvents().map(this.mapObservationEventToDetails)}
                </Timeline>
            </>
        );
    }
}

const mapStateToProps = ( state: StateType ) => ({
    current_visit: state.visits.current_visit
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(VisitTimeline);
