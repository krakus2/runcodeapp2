import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withContext from '../../context/Context_HOC';
import { validateEmail } from '../../utils/utils.js';
import { TextField } from 'react-md';
import { HeaderWrapper, FormWrapper, MyAppBar, Title } from '../../styles/layout/Header';
import InlineMessage from '../utils/InlineMessage';
import { Button } from 'react-md';

class Header extends Component {
   state = {
      email: '',
      password: '',
      emailErr: false,
      passwordErr: false,
      loginErr: false
   };

   handleChange = name => value => {
      this.setState({
         [name]: value
      });
   };

   onSubmit = e => {
      e.preventDefault();
      console.log('submit');
      let { email, password } = this.state;
      if (!validateEmail(email)) {
         this.setState({ emailErr: true });
      } else {
         this.setState({ emailErr: false });
      }
      if (password.length === 0) {
         this.setState({ passwordErr: true });
      } else {
         this.setState({ passwordErr: false });
      }
   };

   render() {
      const { context } = this.props;
      const { email, emailErr, loginErr, password, passwordErr } = this.state;
      return (
         <MyAppBar /*position="static" color="secondary"*/>
            <HeaderWrapper isMobile={context.isMobile}>
               <Title isMobile={context.isMobile}>RUNCODE</Title>
               <FormWrapper
                  error={emailErr || passwordErr || loginErr}
                  onSubmit={this.onSubmit}
                  isMobile={context.isMobile}
               >
                  <TextField
                     id="email"
                     className="text-field--header"
                     label="Adres email"
                     type="text"
                     placeholder="example@example.com"
                     error={emailErr ? true : false}
                     helpText={emailErr ? 'To nie wygląda na email' : ''}
                     value={email}
                     onChange={this.handleChange('email')}
                  />
                  <TextField
                     id="haslo"
                     className="text-field--header"
                     label="Hasło"
                     type="password"
                     error={passwordErr}
                     helpText={passwordErr ? 'Wprowadź hasło' : ''}
                     value={password}
                     onChange={this.handleChange('password')}
                  />
                  <Button raised primary type="submit" className="button--header">
                     Zaloguj
                  </Button>
                  {loginErr && (
                     <InlineMessage
                        isError={true}
                        text={'Nie udało się zalogować. Spróbuj ponownie'}
                        bigMargin={false}
                        small={true}
                     />
                  )}
               </FormWrapper>
            </HeaderWrapper>
         </MyAppBar>
      );
   }
}

Header.propTypes = {};

export default withContext(Header);
