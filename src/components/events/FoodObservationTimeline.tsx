import * as React from 'react';
import { Event } from '@App/store/visits/types';

import Timeline from '@App/components/events/Timeline';
import LocalPizzaIcon from '@material-ui/icons/LocalPizza';

export default function FluidObservationTimeline(event: Event) {
    return Timeline(event.id, event.timestamp, 'Food', event.meal || '', <LocalPizzaIcon style={{color: 'white'}} />);
}
