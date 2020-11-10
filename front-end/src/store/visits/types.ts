enum EventType {
    fluid_intake_observation = "fluid_intake_observation",
    task_completed = "task_completed",
    physical_health_observation = "physical_health_observation",
    visit_completed = "visit_completed",
    check_out = "check_out",
    mood_observation = "mood_observation",
    regular_medication_taken = "regular_medication_taken",
    alert_raised = "alert_raised",
    no_medication_observation_received = "no_medication_observation_received",
    incontinence_pad_observation = "incontinence_pad_observation",
    check_in = "check_in",
    general_observation = "general_observation",
    regular_medication_not_taken = "regular_medication_not_taken",
    food_intake_observation = "food_intake_observation",
    task_completion_reverted = "task_completion_reverted",
    mental_health_observation = "mental_health_observation",
    medication_schedule_updated = "medication_schedule_updated",
    visit_cancelled = "visit_cancelled",
}

export interface Event {
    id: string,
    visit_id: string,
    timestamp: Date,
    event_type: EventType,
    caregiver_id: string,
    care_recipient_id: string,
    fluid?: string,
    consumed_volume_ml?: number,
    note?: string,
    pad_condition?: string,
    meal?: string,
    mood?: string,
    observed?: boolean,
}

export interface Visit {
    visit_id: string,
    start_timestamp: Date,
    end_timestamp: Date,
    n_events: number,
    events: Event[]
}

export interface VisitState {
    visits: Visit[],
}

interface Request {
    method: string,
    url: string,
}

interface GetVisitsRequest {
    request: Request,
}

export enum GET_ACTIONS {
    GET_VISITS = "GET_VISITS",
    GET_VISITS_SUCCESS = "GET_VISITS_SUCCESS",
    GET_VISITS_FAIL = "GET_VISITS_FAIL"
}

export interface GetVisitsAction {
    type: GET_ACTIONS,
    payload: GetVisitsRequest
}
