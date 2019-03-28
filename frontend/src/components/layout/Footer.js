import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import { FooterWrapper } from '../../styles/layout/Footer';

const styles = {
   root: {
      flexGrow: 1
   }
};

function Footer(props) {
   const { classes } = props;

   return (
      <FooterWrapper>
         <div className={classes.root}>
            <AppBar position="static" color="default">
               <Toolbar>
                  <h2 variant="h6" color="inherit">
                     Footer
                  </h2>
               </Toolbar>
            </AppBar>
         </div>
      </FooterWrapper>
   );
}

Footer.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
