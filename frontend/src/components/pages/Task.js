import React, { Component } from 'react';
import axios from 'axios';
import withContext from '../../context/Context_HOC';

import { Wrapper } from '../../styles/Form';

class Task extends Component {
   state = {};

   componentDidMount() {
      console.log(this.props.context.task);
   }

   render() {
      return <Wrapper>xd</Wrapper>;
   }
}

export default withContext(Task);
