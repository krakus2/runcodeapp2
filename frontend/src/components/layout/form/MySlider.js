import React from 'react';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import 'rc-slider/assets/index.css';

import { SliderWrapper } from '../../../styles/Form';

const SliderWithTooltip = createSliderWithTooltip(Slider);

function percentFormatter(v) {
   return `${v} %`;
}

const MySlider = ({ handleSliderChange, iloscArg, max, theme }) => {
   return (
      <SliderWrapper>
         <h3>Liczba i typ argumentów funkcji</h3>
         <p>Określ liczbę i typy parametrów wymaganych przez funkcję.</p>
         <SliderWithTooltip
            className="mySlider"
            style={{ margin: '15px 5px' }}
            activeDotStyle={{
               borderColor: theme.primaryColor
            }}
            dotStyle={{
               borderColor: theme.disabled
            }}
            trackStyle={{ backgroundColor: theme.primaryColor }}
            handleStyle={{
               borderColor: theme.primaryColor
            }}
            value={iloscArg}
            onChange={handleSliderChange}
            dots
            step={1}
            defaultValue={1}
            max={max}
         />
      </SliderWrapper>
   );
};

MySlider.propTypes = {
   handleSliderChange: PropTypes.func.isRequired,
   iloscArg: PropTypes.number.isRequired,
   max: PropTypes.number.isRequired
};

export default withTheme(MySlider);
