import * as React from 'react';
import { Event } from '@App/store/visits/types';

import Typography from '@material-ui/core/Typography';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';

export default function MoodObservationTimeline(event: Event) {
    const styles = {
        paper: {
          padding: '6px 16px',
        }
    };

    return (
        <TimelineItem key={event.id}>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    {event.timestamp}
                </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot>
                    <LocalDrinkIcon />
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Paper elevation={3} style={styles.paper}>
                    <Typography variant="h6" component="h1">
                        Drink
                    </Typography>
                    <Typography>{event.fluid}</Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    );
}
