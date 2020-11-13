import * as React from 'react';
import Layout from './Layout';
import { Provider } from 'react-redux';
import { render, unmountComponentAtNode } from 'react-dom';
import store from '@App/store';

describe('Layout', () => {
    let container: Element = document.createElement('div');
    beforeEach(() => {
        // setup a DOM element as a render target
        document.body.appendChild(container);
        render(
            (
                <Provider store={store}>
                    <Layout />
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

    it('Has header', () => {
        const header = container.querySelector('header');
        expect(header).not.toBe(undefined);
    });

    it('Has main section', () => {
        const main = container.querySelector('main');
        expect(main).not.toBe(undefined);
        if (main) {
            expect(main.textContent).toContain(
                'Please select a date from the calendar on the left to view details of caregiver visits'
            ); 
        }
    });

    it('Has calendar sidebar', () => {
        const nav = container.querySelector('nav');
        expect(nav).not.toBe(undefined);
        if (nav) {
            expect(nav.textContent).toContain('Select a date from the calendar above'); 
        }
    });

});
