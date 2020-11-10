import * as React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import 'react-dates/lib/css/_datepicker.css';
import { DayPickerRangeController } from 'react-dates';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerContainer: {
    overflow: 'auto',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function Layout() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Typography variant="h6" noWrap={true}>
            Clipped drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="permanent"
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <Toolbar />
        <div className={classes.drawerContainer}>
            <DayPickerRangeController
                startDate={null} // momentPropTypes.momentObj or null,
                endDate={null} // momentPropTypes.momentObj or null,
                onDatesChange={({ startDate, endDate }) => {}} // PropTypes.func.isRequired,
                focusedInput={null} // PropTypes.oneOf([START_DATE, END_DATE]) or null,
                onFocusChange={focusedInput => {}} // PropTypes.func.isRequired,
                initialVisibleMonth={null} // PropTypes.func or null,
            />
        </div>
      </Drawer>
      <main className={classes.content}>
        <Toolbar />
      </main>
    </div>
  );
}
