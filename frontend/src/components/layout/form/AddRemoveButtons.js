import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { RowWrapper } from '../../../styles/layout/Landing';
import Tooltip from '../../utils/Tooltip';
import { Button } from 'react-md';
const FontIcon = lazy(() => import('./FontIconIntermediate'));

const AddRemoveButtons = ({ zmienIloscWynikow, iloscWynikow }) => (
   <RowWrapper>
      <Tooltip title={'Dodaj wiersz'}>
         <Button
            floating
            primary
            mini
            onClick={zmienIloscWynikow('+')}
            style={{ margin: '8px' }}
         >
            <Suspense fallback={<span>+</span>}>
               <FontIcon style={{ color: 'white' }}>add</FontIcon>
            </Suspense>
         </Button>
      </Tooltip>
      <Tooltip title="Usuń wiersz">
         <Button
            className="addRemoveButton"
            floating
            primary
            mini
            onClick={zmienIloscWynikow('-')}
            style={{ margin: '8px' }}
            disabled={iloscWynikow === 1}
         >
            <Suspense fallback={<span>-</span>}>
               <FontIcon style={{ color: 'white' }}>remove</FontIcon>
            </Suspense>
         </Button>
      </Tooltip>
      {/* {iloscWynikow !== 1 && (
         <Tooltip title="Usuń wiersz">
            <Button
               floating
               primary
               mini
               onClick={zmienIloscWynikow('-')}
               style={{ margin: '8px' }}
            >
               <FontIcon style={{ color: 'white' }}>remove</FontIcon>
            </Button>
         </Tooltip>
      )} */}
   </RowWrapper>
);

AddRemoveButtons.propTypes = {
   zmienIloscWynikow: PropTypes.func.isRequired
};

export default AddRemoveButtons;
