import * as React from 'react';
import Logo from '@App/components/Logo';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Hidden from '@material-ui/core/Hidden';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import DatePicker from '@App/components/datepicker/DatePicker';
import VisitList from '@App/components/VisitList';
import VisitTimeline from '@App/components/VisitTimeline';
import TodayIcon from '@material-ui/icons/Today';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import { StateType } from '@App/store/reducers';
import { setDate, setVisit } from '@App/store/visits/actions';
import { Visit } from '@App/store/visits/types';
import { connect } from 'react-redux';

const drawerWidth = 320;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    color: '#cccccc',
    backgroundColor: '#ffffff',
    padding: theme.spacing(3),
  },
  drawerPaper: {
    width: drawerWidth,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    paddingTop: '60px',
  },
}));

type LayoutProps = {
    setDate: typeof setDate,
    setVisit: typeof setVisit,
    current_visit: Visit
};

function Layout(props: LayoutProps) {
    const classes = useStyles();
    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        if (!isDesktop) {
            setMobileOpen(!mobileOpen);
        }
    };

    const drawer = (
        <>
            <DatePicker />
            <VisitList onSelect={handleDrawerToggle} />
        </>
    );

    const LogoUrl = require('../../assets/images/logo-birdie.svg');

    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar position="fixed" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        color="primary"
                        aria-label="open calendar"
                        edge="start"
                        onClick={handleDrawerToggle}
                        className={classes.menuButton}
                    >
                        <TodayIcon />
                    </IconButton>
                    <Logo 
                        src={LogoUrl} 
                        onClick={() => {
                            props.setDate(null);
                            props.setVisit(null);
                        }}
                    />
                </Toolbar>
            </AppBar>
            <nav className={classes.drawer} aria-label="mailbox folders">
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Hidden smUp={true} implementation="css">
                    <Drawer
                        variant="temporary"
                        anchor={theme.direction === 'rtl' ? 'right' : 'left'}
                        open={mobileOpen}
                        onClose={handleDrawerToggle}
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        ModalProps={{
                            keepMounted: true, // Better open performance on mobile.
                        }}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
                <Hidden xsDown={true} implementation="css">
                    <Drawer
                        classes={{
                            paper: classes.drawerPaper,
                        }}
                        variant="permanent"
                        open={true}
                    >
                        {drawer}
                    </Drawer>
                </Hidden>
            </nav>
            <main className={classes.content}>
                <div className={classes.toolbar} />
                {!props.current_visit && (
                    <>
                        <Hidden xsDown={true} implementation="css">
                            <Typography variant="h6">
                                Please select a date from the calendar on the left to view details of caregiver visits
                            </Typography>
                        </Hidden>
                        <Hidden smUp={true} implementation="css">
                            <Typography variant="h6">
                                Please select a date from the calendar to view details of caregiver visits.
                            </Typography>
                            Open the calendar by clicking the calendar icon at the top of the screen.
                        </Hidden>
                    </>
                )}
                {props.current_visit && <VisitTimeline />}
            </main>
        </div>
    );
}

const mapStateToProps = ( state: StateType ) => ({
    current_visit: state.visits.current_visit,
});

const mapDispatchToProps = { setVisit, setDate };

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
