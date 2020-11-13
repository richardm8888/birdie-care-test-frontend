import * as React from 'react';
import { Event } from '@App/store/visits/types';

import Timeline from '@App/components/events/Timeline';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import SentimentVeryDissatisfied from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';

export default function MoodObservationTimeline(event: Event) {
    let icon = <SentimentVerySatisfiedIcon style={{color: 'white'}} />;
    if (event.mood && event.mood === 'okay') {
        icon = <SentimentSatisfiedIcon style={{color: 'white'}} />;
    } else if (event.mood && event.mood === 'sad') {
        icon = <SentimentVeryDissatisfied style={{color: 'white'}} />;
    }
    return Timeline(event.id, event.timestamp, 'Mood', event.mood || '', icon, 'secondary');
}
