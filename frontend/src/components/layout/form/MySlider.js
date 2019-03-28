import React from 'react';
import PropTypes from 'prop-types';
import { SliderWrapper } from '../../../styles/layout/Landing';
import { Slider } from 'react-md';

const MySlider = ({ handleSliderChange, iloscArg, max }) => {
   return (
      <SliderWrapper>
         <h2>Liczba i typ argumentów funkcji</h2>
         <p>Określ liczbę i typy parametrów wymaganych przez funkcję.</p>
         <Slider
            id="disctete-ticks-slider"
            discrete
            max={max}
            discreteTicks={1}
            tickWidth={3}
            valuePrecision={1}
            value={iloscArg}
            onChange={handleSliderChange}
            style={{ marginTop: '5px' }}
         />
      </SliderWrapper>
   );
};

MySlider.propTypes = {
   handleSliderChange: PropTypes.func.isRequired,
   iloscArg: PropTypes.number.isRequired,
   max: PropTypes.number.isRequired
};

export default MySlider;
