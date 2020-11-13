import * as React from 'react';
import { Event } from '@App/store/visits/types';

import Timeline from '@App/components/events/Timeline';
import WcIcon from '@material-ui/icons/Wc';

export default function IncontinencePadObservationTimeline(event: Event) {
    return Timeline(
        event.id, 
        event.timestamp, 
        'Incontinence pad', 
        event.pad_condition || '', 
        <WcIcon style={{color: 'white'}} />
    );
}
