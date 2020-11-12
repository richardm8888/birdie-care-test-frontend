import * as React from 'react';
import { StateType } from '@App/store/reducers';
import { Visit, Event, ObservationEvents } from '@App/store/visits/types';
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

// var moment = require('moment');

type VisitTimelineProps = {
    current_visit: Visit
};

const useStyles = makeStyles((theme) => ({
    paper: {
      padding: '6px 16px',
    },
    secondaryTail: {
      backgroundColor: theme.palette.secondary.main,
    },
}));

class VisitTimeline extends React.Component<VisitTimelineProps> {

    getObservationEvents = () => {
        if (!this.props.current_visit) return [];
        return this.props.current_visit.events.filter( 
            event => ObservationEvents instanceof event.event_type 
        );
    }

    render() {
        if (!this.props.current_visit) {
            return null;
        }

        return (
            <Timeline align="alternate">
                <TimelineItem>
                    <TimelineOppositeContent>
                    <Typography variant="body2" color="textSecondary">
                        9:30 am
                    </Typography>
                    </TimelineOppositeContent>
                    <TimelineSeparator>
                    <TimelineDot>
                        { /* <FastfoodIcon /> */ }
                    </TimelineDot>
                    <TimelineConnector />
                    </TimelineSeparator>
                    <TimelineContent>
                    <Paper elevation={3} className={classes.paper}>
                        <Typography variant="h6" component="h1">
                        Eat
                        </Typography>
                        <Typography>Because you need strength</Typography>
                    </Paper>
                    </TimelineContent>
                </TimelineItem>
            {
                this.getObservationEvents().map((event: Event) => {
                    <span>{event.timestamp}</span>
                })
            }
            </Timeline>
        )

        return null;
    }

}

const mapStateToProps = ( state: StateType ) => ({
    current_visit: state.visits.current_visit
});

const mapDispatchToProps = { };

export default connect(mapStateToProps, mapDispatchToProps)(VisitTimeline);
