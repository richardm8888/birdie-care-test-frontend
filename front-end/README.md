# Task

Create a small web application to visualize care giver observations, so that looking at it is valuable to a family member of this care recipient.

# Approach taken

The web application has a very simple UI/UX with all journeys beginning by selecting a date from a calendar.
The user journey is as below:
- Open calendar side nav (mobile only - it's open at all time's on desktop)
- Select date from calendar to reveal a list of visits for that day
- Select a visit from the list to reveal a timeline of the events during that visit
- Scroll down the timeline to view all events

# UI / UX

The application uses Material UI, it could definitely do with a designers eye though :-)

# Limitations / possible extensions

The current implementation is very limited, it would have been nice to expand it to include:

- Tests, tests, tests - I've added a few, but needs way more coverage
- A simple dashboard on the home page (landing screen) showing latest observations (mood, etc.)
- Some graphs showing the change in observations over time (fluid intake, etc.)

# Environment variables needed 

- BASE_URL - This is injected as part of the `npm start` command for development, but needs to be added for other environments
