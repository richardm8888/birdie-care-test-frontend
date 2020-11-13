export const mockVisitData = {
    'visits': [
        {
            'visit_id': '2ddc3653-521f-11e9-b63f-06a80bfbb33e',
            'start_timestamp': '2019-04-25T06:22:38.922Z',
            'end_timestamp': '2019-04-25T08:10:36+01:00',
            'n_events': 37,
            'events': [
                {
                    'id': '18f65575-ec84-44cc-90ab-5d646d844410',
                    'fluid': 'regular',
                    'observed': false,
                    'visit_id': '2ddc3653-521f-11e9-b63f-06a80bfbb33e',
                    'timestamp': '2019-04-25T07:06:06.421Z',
                    'event_type': 'fluid_intake_observation',
                    'caregiver_id': 'f7a00df5-bbc4-4ad7-9918-c07e16e709f6',
                    'care_recipient_id': 'df50cac5-293c-490d-a06c-ee26796f850d',
                    'consumed_volume_ml': 230
                },
                {
                    'id': '080ed552-2375-4788-92a9-463399d9311f',
                    'visit_id': '2ddc3653-521f-11e9-b63f-06a80bfbb33e',
                    'timestamp': '2019-04-25T06:23:42.240Z',
                    'event_type': 'check_in',
                    'caregiver_id': 'f7a00df5-bbc4-4ad7-9918-c07e16e709f6',
                    'care_recipient_id': 'df50cac5-293c-490d-a06c-ee26796f850d'
                },
            ]
        }
    ]
};

export const mockVisitCalendarData = {
    'visit_calendar': [
        {
            'date': '2019-04-22T23:00:00.000Z',
            'n_visits': 5
        },
        {
            'date': '2019-04-23T23:00:00.000Z',
            'n_visits': 4
        },
        {
            'date': '2019-04-24T23:00:00.000Z',
            'n_visits': 4
        },
        {
            'date': '2019-04-25T23:00:00.000Z',
            'n_visits': 4
        },
        {
            'date': '2019-04-26T23:00:00.000Z',
            'n_visits': 4
        },
        {
            'date': '2019-04-27T23:00:00.000Z',
            'n_visits': 4
        },
        {
            'date': '2019-04-28T23:00:00.000Z',
            'n_visits': 4
        },
        {
            'date': '2019-04-29T23:00:00.000Z',
            'n_visits': 4
        }
    ]
};
