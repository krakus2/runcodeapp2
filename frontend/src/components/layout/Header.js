import React, { Component } from 'react';
import PropTypes from 'prop-types';
import withContext from '../../context/Context_HOC';
import { validateEmail } from '../../utils/utils.js';
import Input from './form/Input';
import { HeaderWrapper, FormWrapper, MyAppBar, Title } from '../../styles/layout/Header';
import InlineMessage from '../utils/InlineMessage';
import Button, { ButtonStyles } from './form/Button';

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
                  <Input
                     name={'email'}
                     label="Adres email"
                     placeholder="example@example.com"
                     error={emailErr ? true : false}
                     message={emailErr ? 'To nie wygląda na email' : ''}
                     value={email}
                     onChange={this.handleChange('email')}
                     small
                     width={context.isMobile ? '200px' : '250px'}
                     margin={context.isMobile ? '0 0 10px 0' : '0 10px 0 0'}
                     disabled
                  />
                  <Input
                     name={'haslo'}
                     label="Hasło"
                     type="password"
                     error={passwordErr}
                     message={passwordErr ? 'Wprowadź hasło' : ''}
                     value={password}
                     onChange={this.handleChange('password')}
                     small
                     width="200px"
                     disabled
                  />
                  <Button
                     type="submit"
                     height="36px"
                     fontSize="14px"
                     top="7px"
                     margin={context.isMobile ? '25px 0 25px 0' : '0 0 0 20px'}
                     disabled
                     isMobile={context.isMobile}
                  >
                     Zaloguj
                  </Button>
                  {loginErr && (
                     <InlineMessage
                        isError={true}
                        text={'Nie udało się zalogować. Spróbuj ponownie'}
                        fontSize={12}
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
