import * as React from 'react';
import { StateType } from '@App/store/reducers';
import { Visit, Event, Events } from '@App/store/visits/types';
import { connect } from 'react-redux';

import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
// import FastfoodIcon from '@material-ui/icons/Fastfood';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';
import FeedbackIcon from '@material-ui/icons/Feedback';
// LocalHospital
// LocalPharmacy
// LocalHotel
// LocalPizza
// Bathtub
// Wc
// SentimentVerySatisfied
// SentimentVeryDissatisfied
// SentimentSatisfied
// SentimentDissatisfied
// AccessibilityNew
// DirectionsRun
// Feedback

// var moment = require('moment');

type VisitTimelineProps = {
    current_visit: Visit
};

const styles = {
    paper: {
      padding: '6px 16px',
    }
};

class VisitTimeline extends React.Component<VisitTimelineProps> {

    getObservationEvents = () => {
        if (!this.props.current_visit) {
            return [];
        }

        return this.props.current_visit.events.filter( 
            event => event.event_type.endsWith('_observation') 
        );
    }

    mapObservationEventTypeToNameAndIcon = (eventType: Events) => {
        switch(eventType) {
            case 'fluid_intake_observation':
                return {
                    icon: <LocalDrinkIcon />,
                    name: 'Drink',
                };
            default:
                return {
                    icon: <FeedbackIcon />,
                    name: 'Unknown',
                };
        }
    }

    render() {
        if (!this.props.current_visit) {
            return null;
        }

        return (
            <Timeline align="alternate">
            {
                this.getObservationEvents().map((event: Event) => {
                    const eventDetails = this.mapObservationEventTypeToNameAndIcon(event.event_type);
                    return (
                        <TimelineItem key={event.id}>
                            <TimelineOppositeContent>
                                <Typography variant="body2" color="textSecondary">
                                    {event.timestamp}
                                </Typography>
                            </TimelineOppositeContent>
                            <TimelineSeparator>
                                <TimelineDot>
                                    {eventDetails.icon}
                                </TimelineDot>
                                <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                                <Paper elevation={3} style={styles.paper}>
                                    <Typography variant="h6" component="h1">
                                        {eventDetails.name}
                                    </Typography>
                                    <Typography>Because you need strength</Typography>
                                </Paper>
                            </TimelineContent>
                        </TimelineItem>
                    );
                })
            }
            </Timeline>
        );
    }
}

const mapStateToProps = ( state: StateType ) => ({
    current_visit: state.visits.current_visit
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(VisitTimeline);
