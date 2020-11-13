import * as React from 'react';
import { StateType } from '@App/store/reducers';
import { Visit, Event } from '@App/store/visits/types';
import { setVisit } from '@App/store/visits/actions';
import { connect } from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';

const moment = require('moment');

type VisitListProps = {
    visits: Visit[],
    current_date: moment.Moment|null,
    setVisit: typeof setVisit,
    onSelect: Function
};

class VisitList extends React.Component<VisitListProps> {

    countObservationEvents(events: Event[]) {
        return events.filter( event => event.event_type.endsWith('_observation') ).length;
    }

    render() {
        const styles = {
            notice: {
              align: 'center',
              padding: '10px'
            },
        };

        return (
            <List>
                {!this.props.current_date && (
                    <span style={styles.notice}>Select a date from the calendar above</span>
                )}
                {this.props.current_date && this.props.visits.length === 0 && (
                    <span style={styles.notice}>No visits on this day.</span>
                )}
                {this.props.visits.length > 0 && this.props.visits.map((visit: Visit) => {
                    return (
                        <ListItem
                            key={visit.visit_id} 
                            button={true} 
                            onClick={() => {
                                this.props.setVisit(visit);
                                this.props.onSelect();
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
    visits: state.visits.visits,
    current_date: state.visits.current_date,
});

const mapDispatchToProps = { setVisit };

export default connect(mapStateToProps, mapDispatchToProps)(VisitList);
