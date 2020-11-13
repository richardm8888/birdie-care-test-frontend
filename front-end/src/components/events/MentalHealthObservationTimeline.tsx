import * as React from 'react';
import { Event } from '@App/store/visits/types';

import Timeline from '@App/components/events/Timeline';
import FeedbackIcon from '@material-ui/icons/Feedback';

export default function MentalHealthObservationTimeline(event: Event) {
    return Timeline(
        event.id, 
        event.timestamp, 
        'Mental health', 
        event.note || '', 
        <FeedbackIcon style={{color: 'white'}} />
    );
}
