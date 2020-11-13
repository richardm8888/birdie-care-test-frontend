import * as React from 'react';

import Typography from '@material-ui/core/Typography';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineOppositeContent from '@material-ui/lab/TimelineOppositeContent';
import TimelineDot, { TimelineDotProps } from '@material-ui/lab/TimelineDot';
import Paper from '@material-ui/core/Paper';

const moment = require('moment');

export default function Timeline(
    id: string, 
    date: Date, 
    name: string, 
    secondary: string, 
    icon: JSX.Element,
    dotColor: TimelineDotProps['color'] = 'primary', 
) {
    const styles = {
        paper: {
          padding: '6px 16px',
        },
    };

    return (
        <TimelineItem key={id}>
            <TimelineOppositeContent>
                <Typography variant="body2" color="textSecondary">
                    {moment(date).format('Do MMMM YYYY, h:mma')}
                </Typography>
            </TimelineOppositeContent>
            <TimelineSeparator>
                <TimelineDot color={dotColor}>
                    {icon}
                </TimelineDot>
                <TimelineConnector />
            </TimelineSeparator>
            <TimelineContent>
                <Paper elevation={3} style={styles.paper}>
                    <Typography variant="body1">
                        {name}
                    </Typography>
                    <Typography>{secondary}</Typography>
                </Paper>
            </TimelineContent>
        </TimelineItem>
    );
}
