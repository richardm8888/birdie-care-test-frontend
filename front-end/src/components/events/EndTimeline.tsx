import { Event } from '@App/store/visits/types';

import Timeline from '@App/components/events/Timeline';
import NoMeetingRoomIcon from '@material-ui/icons/NoMeetingRoom';

export default function EndTimeline(event: Event) {
    return Timeline(event.id, event.timestamp, 'Left', '', NoMeetingRoomIcon);
}
