import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { RowWrapper } from '../../../styles/Form';
import Tooltip from '../../reusable/Tooltip';
import RoundedButton from '../../reusable/RoundedButton';

const AddRemoveButtons = ({ zmienIloscWynikow, iloscWynikow }) => (
   <RowWrapper style={{ transform: 'translateX(-10px)', margin: '15px 0' }}>
      <Tooltip title={'Dodaj wiersz'} style={{ marginRight: '150px' }}>
         <RoundedButton onClick={zmienIloscWynikow('+')}>+</RoundedButton>
      </Tooltip>
      <Tooltip title="Usuń wiersz">
         <RoundedButton onClick={zmienIloscWynikow('-')} disabled={iloscWynikow === 1}>
            -
         </RoundedButton>
      </Tooltip>
   </RowWrapper>
);

AddRemoveButtons.propTypes = {
   zmienIloscWynikow: PropTypes.func.isRequired
};

export default AddRemoveButtons;
