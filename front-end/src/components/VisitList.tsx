import * as React from 'react';
import { StateType } from '@App/store/reducers';
import { Visit, Event } from '@App/store/visits/types';
import { setVisit } from '@App/store/visits/actions';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
// import IconButton from '@material-ui/core/IconButton';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const moment = require('moment');

type VisitListProps = {
    visits: Visit[],
    setVisit: typeof setVisit,
};

class VisitList extends React.Component<VisitListProps> {

    countObservationEvents(events: Event[]) {
        return events.filter( event => event.event_type.endsWith('_observation') ).length;
    }

    render() {
        return (
            <List>
                {this.props.visits.length === 0 && (
                    <span>No visits on this day.</span>
                )}
                {this.props.visits.length > 0 && this.props.visits.map((visit: Visit) => {
                    return (
                        <ListItem
                            key={visit.visit_id} 
                            button={true} 
                            onClick={() => {
                                this.props.setVisit(visit);
                            }}
                        >
                            <ListItemText
                                primary={moment(visit.start_timestamp).format('Do MMMM YYYY, h:mma')}
                                secondary={`${this.countObservationEvents(visit.events)} observation(s)`}
                            />
                            <ListItemSecondaryAction>
                                <KeyboardArrowRightIcon />
                            </ListItemSecondaryAction>
                        </ListItem>
                    );
                })}
            </List>
        );
    }

}

const mapStateToProps = ( state: StateType ) => ({
    visits: state.visits.visits
});

const mapDispatchToProps = { setVisit };

export default connect(mapStateToProps, mapDispatchToProps)(VisitList);
