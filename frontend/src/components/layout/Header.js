import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import withContext from '../../context/Context_HOC';
import { validateEmail } from '../../utils/utils.js';
import Input from '../reusable/Input';
import { HeaderWrapper, FormWrapper, MyAppBar, Links } from '../../styles/Header';
import InlineMessage from '../reusable/InlineMessage';
import Button from '../reusable/Button';

class Header extends Component {
   state = {
      /* isMobile: false, */
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

   /* componentDidMount() {
      if (window.innerWidth < 1000) {
         this.setState({ isMobile: true });
      }
      this.updateWindowDimensions(true)();
      window.addEventListener('resize', this.updateWindowDimensions(false));
   }

   shouldComponentUpdate(nextProps, nextState) {
      if (
         nextState.isMobile === this.state.isMobile &&
         nextState.email === this.state.email &&
         nextState.password === this.state.password &&
         nextState.emailErr === this.state.emailErr &&
         nextState.passwordErr === this.state.passwordErr &&
         nextState.loginErr === this.state.loginErr
      ) {
         return false;
      }
      return true;
   }

   updateWindowDimensions = first => deets => {
      if (!first) {
         if (
            /iPhone|Android/i.test(navigator.userAgent) ||
            deets.currentTarget.innerWidth < 1000
         ) {
            this.setState({ isMobile: true });
         } else {
            this.setState({ isMobile: false });
         }
      } else {
         if (/iPhone|Android/i.test(navigator.userAgent)) {
            this.setState({ isMobile: true });
         }
      }
   };

   componentWillUnmount() {
      window.removeEventListener('resize', this.updateWindowDimensions);
   } */

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
      const {
         context: { isMobile }
      } = this.props;
      const { email, emailErr, loginErr, password, passwordErr } = this.state;
      return (
         <MyAppBar>
            <HeaderWrapper>
               <Links>
                  <NavLink
                     to="/"
                     exact
                     className="links links__runcode"
                     activeClassName="active"
                  >
                     RUNCODE
                  </NavLink>
                  <NavLink
                     to="/tasks"
                     exact
                     className="links links__tasks"
                     activeClassName="active"
                  >
                     TASKS
                  </NavLink>
               </Links>
               <FormWrapper
                  error={emailErr || passwordErr || loginErr}
                  onSubmit={this.onSubmit}
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
                     width={isMobile ? '200px' : '250px'}
                     margin={isMobile ? '0 0 10px 0' : '0 10px 0 0'}
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
                     margin={isMobile ? '25px 0 25px 0' : '0 0 0 20px'}
                     disabled
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
