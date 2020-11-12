import { Event } from '@App/store/visits/types';

import Timeline from '@App/components/events/Timeline';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';

export default function StartTimeline(event: Event) {
    return Timeline(event.id, event.timestamp, 'Arrived', '', MeetingRoomIcon);
}
