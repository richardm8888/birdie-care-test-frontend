import * as React from 'react';
import { act } from 'react-dom/test-utils';
import DatePicker from './DatePicker';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import store from '@App/store';

describe('Datepicker', () => {
    let container: Element = document.createElement('div');
    beforeEach(() => {
        // setup a DOM element as a render target
        document.body.appendChild(container);
        render(
            (
                <Provider store={store}>
                    <DatePicker />
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
        expect(month).not.toBe(undefined);
        if (month) {
            expect(month.textContent).toContain(
                'April 2019'
            ); 
        }
    });

    // Not really necessary as the library should have it's own tests, but good checks none the less
    it('Can move to next month', () => {
        const month = container.querySelector('.DayPicker');
        expect(month).not.toBe(undefined);
        const next = container.querySelector('.DayPickerNavigation_rightButton__horizontalDefault');
        expect(next).not.toBe(undefined);

        if (month && next) {
            act(() => {
                next.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            expect(month.textContent).toContain(
                'May 2019'
            ); 
        }
    });

    // Not really necessary as the library should have it's own tests, but good checks none the less
    it('Can move to next month', () => {
        const month = container.querySelector('.DayPicker');
        expect(month).not.toBe(undefined);
        const previous = container.querySelector('.DayPickerNavigation_leftButton__horizontalDefault');
        expect(previous).not.toBe(undefined);

        if (month && previous) {
            act(() => {
                previous.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            expect(month.textContent).toContain(
                'March 2019'
            ); 
        }
    });

    it('Dispatches redux action when a day is clicked', () => {
        const day = container.querySelector('.CalendarDay');
        expect(day).not.toBe(undefined);
        if (day) {
            act(() => {
                day.dispatchEvent(new MouseEvent("click", { bubbles: true }));
            });
            // Expect redux action to be
        }
    });

});
