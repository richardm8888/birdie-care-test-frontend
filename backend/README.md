# Task

Create a small api to return details of care giver visits which can be consumed by a front-end application.

# Approach taken

The API is very simple, it has two end points:
- `/visits?from_date={date}&to_date={date}`
 - Return a list of visits (including all events for each visit) between the requested dates
 - This is used to power the visit lists and visit timelines
- `/visit-calendar?from_date={date}&to_date={date}`
 - Return a list of dates which had a visit between the requested dates
 - This is used to power an indicator on the calendar as to which dates have visits

# Limitations / possible extensions

The current implementation is very limited, it would have been nice to expand it to include:

- Dynamic selection of care recipient based on a value in the API request - at present it is hard-coded for simplicity
- DB models using some form of ORM

# Environment variables needed 

See `.env.example`
