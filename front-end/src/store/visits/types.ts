export enum Events {
    task_completed = 'task_completed',
    visit_completed = 'visit_completed',
    check_out = 'check_out',
    regular_medication_taken = 'regular_medication_taken',
    alert_raised = 'alert_raised',
    no_medication_observation_received = 'no_medication_observation_received',
    check_in = 'check_in',
    regular_medication_not_taken = 'regular_medication_not_taken',
    task_completion_reverted = 'task_completion_reverted',
    medication_schedule_updated = 'medication_schedule_updated',
    visit_cancelled = 'visit_cancelled',
    fluid_intake_observation = 'fluid_intake_observation',
    physical_health_observation = 'physical_health_observation',
    mood_observation = 'mood_observation',
    incontinence_pad_observation = 'incontinence_pad_observation',
    food_intake_observation = 'food_intake_observation',
    mental_health_observation = 'mental_health_observation',
}

export type Event = {
    id: string;
    visit_id: string;
    timestamp: Date;
    event_type: Events;
    caregiver_id: string;
    care_recipient_id: string;
    fluid?: string;
    consumed_volume_ml?: number;
    note?: string;
    pad_condition?: string;
    meal?: string;
    mood?: string;
    observed?: boolean;
};

export type Visit = {
    visit_id: string;
    start_timestamp: Date;
    end_timestamp: Date;
    n_events: number;
    events: Event[];
};

type Visits = {
     visits: Visit[];
};

type VisitsData = {
    data: Visits;
};

type VisitDate = {
    date: Date;
    n_visits: number;
};

type VisitCalendar = {
    visit_calendar: VisitDate[];
};

type VisitCalendarData = {
    data: VisitCalendar;
};

export type VisitState = {
    visits: Visit[];
    visit_calendar: VisitDate[];
    current_visit: Visit|null;
    current_date: moment.Moment|null;
};

type RequestProperties = {
    method: string;
    url: string;
};

type Request = {
    request: RequestProperties;
};

export enum GET_ACTIONS {
    SET_DATE = 'SET_DATE',
    SET_VISIT = 'SET_VISIT',
    GET_VISITS = 'GET_VISITS',
    GET_VISITS_SUCCESS = 'GET_VISITS_SUCCESS',
    GET_VISITS_FAIL = 'GET_VISITS_FAIL',
    GET_VISIT_CALENDAR = 'GET_VISIT_CALENDAR',
    GET_VISIT_CALENDAR_SUCCESS = 'GET_VISIT_CALENDAR_SUCCESS',
    GET_VISIT_CALENDAR_FAIL = 'GET_VISIT_CALENDAR_FAIL'
}

export type RequestAction = {
    type: GET_ACTIONS;
    payload: Request;
};

export type setDateAction = {
    type: GET_ACTIONS;
    date: moment.Moment|null;
};

export type setVisitAction = {
    type: GET_ACTIONS;
    visit: Visit|null;
};

type GetVisitsSuccessAction = {
    type: GET_ACTIONS;
    payload: VisitsData;
};

type GetVisitCalendarSuccessAction = {
    type: GET_ACTIONS;
    payload: VisitCalendarData;
};

export type ActionTypes = (
    GetVisitsSuccessAction & 
    GetVisitCalendarSuccessAction & 
    setDateAction & 
    setVisitAction
);
