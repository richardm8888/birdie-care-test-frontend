import * as React from 'react';
import 'react-dates/initialize';
import Layout from '@App/components/layout/Layout';

interface AppProps {

}

interface AppState {

}

export default class App extends React.Component<AppProps, AppState> {
    public constructor(props: AppProps) {
        super(props);
    }

    public render() {
        return (
            <Layout />
        );
    }
}
