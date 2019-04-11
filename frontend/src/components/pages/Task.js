import React, { Component } from 'react';
import axios from 'axios';
import withContext from '../../context/Context_HOC';

import { Wrapper } from '../../styles/Tasks';

class Task extends Component {
   state = {};

   componentDidMount() {
      console.log(this.props.context.task);
   }

   render() {
      return (
         <Wrapper>
            <h3>Statystyki zadania</h3>
         </Wrapper>
      );
   }
}

export default withContext(Task);
