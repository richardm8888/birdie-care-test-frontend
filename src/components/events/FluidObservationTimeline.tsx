import * as React from 'react';
import { Event } from '@App/store/visits/types';

import Timeline from '@App/components/events/Timeline';
import LocalDrinkIcon from '@material-ui/icons/LocalDrink';

export default function FluidObservationTimeline(event: Event) {
    return Timeline(event.id, event.timestamp, 'Drink', event.fluid || '', <LocalDrinkIcon style={{color: 'white'}} />);
}
