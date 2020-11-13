import * as React from 'react';
import { Event } from '@App/store/visits/types';

import Timeline from '@App/components/events/Timeline';
import AccessibilityNewIcon from '@material-ui/icons/AccessibilityNew';

export default function MoodObservationTimeline(event: Event) {
    return Timeline(
        event.id, 
        event.timestamp, 
        'Physical health', 
        event.note || '', 
        <AccessibilityNewIcon style={{color: 'white'}} />
    );
}
