import React from 'react';
import { Grid, makeStyles } from '@material-ui/core';
import logoCompany from '../assets/Group20399.svg';
import logoHRC from '../assets/logo.svg';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  companyImg: {
    display: 'block',
    maxWidth: '65%',
    maxHeight: '65%',
  },
  hrcImg: {
    display: 'block',
    maxWidth: '56%',
    maxHeight: '56%',
  },
}));


function Logo(){
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Grid container justify="flex-start" style={{height: '70px'}}>
                <Grid 
                item
                xs={3}
                sm={3}
                lg={3}
                justify="flex-start"
                alignItems="center"
                style={{
                    display: 'flex',
                    marginLeft: '1.563vw',
                }}>
                    <img src={logoCompany} alt="companyLogo" className={classes.companyImg}/>
                </Grid>
                <Grid 
                    item
                    xs={3}
                    sm={3}
                    lg={3}
                    direction="row"
                    justify="center"
                    alignItems="center"
                    style={{
                        display: 'flex', 
                        marginLeft: '10.4vw'
                    }}>
                    <img src={logoHRC} alt="HighRadius Logo" className={classes.hrcImg}/>
                </Grid>
            </Grid>
        </div>
    );
}

export default Logo;