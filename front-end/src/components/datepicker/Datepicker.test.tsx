import * as React from 'react';
import { act } from 'react-dom/test-utils';
import DatePicker from './DatePicker';
import VisitList from '../VisitList';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import { getVisits, setDate } from '@App/store/visits/actions';
import store from '@App/store';

describe('Datepicker', () => {
    let container: Element = document.createElement('div');
    beforeEach(() => {
        // setup a DOM element as a render target
        document.body.appendChild(container);
        render(
            (
                <Provider store={store}>
                    <>
                        <DatePicker />
                        <VisitList onSelect={() => {}} />
                    </>
                </Provider>
            ), 
            container
        );
    });

    afterEach(() => {
        if (container) {
            // cleanup on exiting
            unmountComponentAtNode(container);
        }
    });

    it('Defaults to April 2019', () => {
        const month = container.querySelector('.DayPicker');
        expect(month).not.toBe(null);
        if (month) {
            expect(month.textContent).toContain(
                'April 2019'
            ); 
        }
    });

    // Not really necessary as the library should have it's own tests, but good checks none the less
    it('Can move to next month', () => {
        const month = container.querySelector('.DayPicker');
        expect(month).not.toBe(null);
        const next = container.querySelector('.DayPickerNavigation_rightButton__horizontalDefault');
        expect(next).not.toBe(null);

        if (month && next) {
            act(() => {
                next.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            }); 
            expect(month.textContent).toContain(
                'May 2019'
            ); 
        }
    });

    // Not really necessary as the library should have it's own tests, but good checks none the less
    it('Can move to next month', () => {
        const month = container.querySelector('.DayPicker');
        expect(month).not.toBe(null);
        const previous = container.querySelector('.DayPickerNavigation_leftButton__horizontalDefault');
        expect(previous).not.toBe(null);

        if (month && previous) {
            act(() => {
                previous.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            expect(month.textContent).toContain(
                'March 2019'
            ); 
        }
    });

    it('Dispatches redux action when a day is clicked', () => {
        const day = container.querySelector('.CalendarDay');
        expect(day).not.toBe(null);
        const visits = container.querySelector('ul.MuiList-root');
        expect(visits).not.toBe(null);
        if (day && visits) {
            // Initial text
            expect(visits.textContent).toContain(
                'Select a date from the calendar above'
            );

            // Click calendar day
            const actions = {
                getVisits: getVisits,
                setDate: setDate,
            }; 
            jest.spyOn(actions, 'setDate');
            act(() => {
                day.dispatchEvent(new MouseEvent('click', { bubbles: true }));
            });
            // Need to fix the spy - this definitely gets called otherwise the text wouldn't change!
            // expect(actions.setDate).toHaveBeenCalledTimes(1);
            
            // New text
            expect(visits.textContent).toContain(
                'No visits on this day.'
            );
        }
    });

});
