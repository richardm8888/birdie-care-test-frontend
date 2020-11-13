import * as React from 'react';
import 'react-dates/initialize';
import Layout from '@App/components/layout/Layout';
import { ThemeProvider } from '@material-ui/core/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import teal from '@material-ui/core/colors/teal';
import yellow from '@material-ui/core/colors/yellow';

interface AppProps {

}

interface AppState {

}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: teal[300],
    },
    secondary: {
      main: yellow[700],
    },
  },
});

export default class App extends React.Component<AppProps, AppState> {
    public constructor(props: AppProps) {
        super(props);
    }

    public render() {
        return (
            <ThemeProvider theme={theme}>
                <Layout />
            </ThemeProvider>
        );
    }
}
