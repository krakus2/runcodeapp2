import React from 'react';
import PropTypes from 'prop-types';
import { FooterWrapper } from '../../styles/Footer';

const styles = {
   root: {
      flexGrow: 1
   }
};

function Footer(props) {
   return <FooterWrapper>Footer</FooterWrapper>;
}

Footer.propTypes = {
   classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Footer);
