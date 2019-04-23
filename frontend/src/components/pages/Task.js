import React, { Component, lazy, Suspense } from 'react';
import Select from 'react-select';
import { withTheme } from 'styled-components';
import Slider, { createSliderWithTooltip } from 'rc-slider';
import Switch from '../reusable/Switch';

import withContext from '../../context/Context_HOC';
import {
   addAlphaChannel,
   getDataFromDB,
   getDataFromDB2,
   getParams
} from '../../utils/utils';
import {
   Wrapper,
   ChartWrapper,
   TopBar,
   theme,
   colourStyles,
   TableStyles,
   SwitchWrapper
} from '../../styles/Tasks';
import { SliderWrapper } from '../../styles/Form';

const ResponsivePie = lazy(() => import('../layout/charts/Pie'));
const ResponsiveLine = lazy(() => import('../layout/charts/Line'));
const ResponsiveBar = lazy(() => import('../layout/charts/Bar'));

const options = [
   { value: 7, label: 'z ostatnich 7 dni' },
   { value: 30, label: 'z ostatnich 30 dni' },
   { value: 183, label: 'z ostatniego pół roku' },
   { value: 365, label: 'z ostatniego roku' },
   { value: 'all', label: 'w ogóle' }
];

const SliderWithTooltip = createSliderWithTooltip(Slider);
const Range = createSliderWithTooltip(Slider.Range);

function scrollIt(destination, duration = 200, easing = 'linear', callback) {
   const easings = {
      linear(t) {
         return t;
      },
      easeInQuad(t) {
         return t * t;
      },
      easeOutQuad(t) {
         return t * (2 - t);
      },
      easeInOutQuad(t) {
         return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
      },
      easeInCubic(t) {
         return t * t * t;
      },
      easeOutCubic(t) {
         return --t * t * t + 1;
      },
      easeInOutCubic(t) {
         return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
      },
      easeInQuart(t) {
         return t * t * t * t;
      },
      easeOutQuart(t) {
         return 1 - --t * t * t * t;
      },
      easeInOutQuart(t) {
         return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
      },
      easeInQuint(t) {
         return t * t * t * t * t;
      },
      easeOutQuint(t) {
         return 1 + --t * t * t * t * t;
      },
      easeInOutQuint(t) {
         return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
      }
   };

   const start = window.pageYOffset;
   const startTime =
      'now' in window.performance ? performance.now() : new Date().getTime();

   const documentHeight = Math.max(
      document.body.scrollHeight,
      document.body.offsetHeight,
      document.documentElement.clientHeight,
      document.documentElement.scrollHeight,
      document.documentElement.offsetHeight
   );
   const windowHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.getElementsByTagName('body')[0].clientHeight;

   if ('requestAnimationFrame' in window === false) {
      window.scroll(0, destination);
      if (callback) {
         callback();
      }
      return;
   }

   function scroll() {
      const now = 'now' in window.performance ? performance.now() : new Date().getTime();
      const time = Math.min(1, (now - startTime) / duration);
      const timeFunction = easings[easing](time);
      window.scroll(0, Math.ceil(timeFunction * (destination - start) + start));

      if (window.pageYOffset === destination) {
         if (callback) {
            callback();
         }
         return;
      }

      requestAnimationFrame(scroll);
   }

   scroll();
}

class Task extends Component {
   constructor(props) {
      super(props);
      this.tableRef = React.createRef();
   }

   state = {
      dataPie: [{}],
      dataLine: [
         {
            data: []
         }
      ],
      dataBar: [{}],
      dataBar2: [{}],
      from: options[4],
      fromValue: options[4].value,
      sliderValue: [1, 2],
      loading: false,
      maxMinBar2Value: [5, 5],
      chartColor: addAlphaChannel(this.props.theme.secondaryColor, '0.95'),
      detailsClosed: true
   };

   async componentDidMount() {
      //console.log(this.props.context.taskTests);
      const params = getParams(window.location.search);
      const res = await getDataFromDB(this.state.fromValue, params.task_id);
      const res2 = await getDataFromDB2(
         this.state.fromValue,
         params.task_id,
         this.state.sliderValue[0],
         this.state.sliderValue[1]
      );
      res.data[1][0].color = this.state.chartColor;
      const bar1 = res.data[2].map(elem => ({
         ...elem,
         attemptColor: this.state.chartColor
      }));
      const bar2 = res2.data.map(elem => ({
         ...elem,
         sukcesColor: this.state.chartColor
      }));
      const maxMinBar2Value = bar2.reduce(
         (acc, elem) => {
            if (elem.sukces > acc[0]) {
               acc[0] = elem.sukces;
            }
            if (elem.porazka < acc[1]) {
               acc[1] = elem.porazka;
            }
            return acc;
         },
         [0, 0]
      );
      this.setState({
         dataLine: [
            {
               ...res.data[0],
               color: this.state.chartColor
            }
         ],
         dataPie: res.data[1],
         dataBar: bar1,
         dataBar2: bar2,
         maxMinBar2Value
      });
   }

   onSelectChange = async e => {
      const params = getParams(window.location.search);
      const res = await getDataFromDB(e.value, params.task_id);
      const res2 = await getDataFromDB2(
         e.value,
         params.task_id,
         this.state.sliderValue[0],
         this.state.sliderValue[1]
      );
      res.data[1][0].color = this.state.chartColor;
      const bar1 = res.data[2].map(elem => ({
         ...elem,
         attemptColor: this.state.chartColor
      }));
      const bar2 = res2.data.map(elem => ({
         ...elem,
         sukcesColor: this.state.chartColor
      }));
      const maxMinBar2Value = bar2.reduce(
         (acc, elem) => {
            if (elem.sukces > acc[0]) {
               acc[0] = elem.sukces;
            }
            if (elem.porazka < acc[1]) {
               acc[1] = elem.porazka;
            }
            return acc;
         },
         [0, 0]
      );
      this.setState({
         dataLine: [
            {
               ...res.data[0],
               color: this.state.chartColor
            }
         ],
         dataPie: res.data[1],
         dataBar: bar1,
         dataBar2: bar2,
         from: { label: e.label, value: e.value },
         fromValue: e.value,
         loading: false,
         maxMinBar2Value
      });
   };

   onSliderValueChange = value => {
      this.setState({ sliderValue: [...value] });
   };

   onSliderAfterChange = async value => {
      this.setState({ loading: true });
      const params = getParams(window.location.search);
      const res = await getDataFromDB2(
         this.state.fromValue,
         params.task_id,
         value[0],
         value[1]
      );

      const dataBar2 = res.data.map(elem => ({
         ...elem,
         sukcesColor: this.state.chartColor
      }));

      const maxMinBar2Value = dataBar2.reduce(
         (acc, elem) => {
            if (elem.sukces > acc[0]) {
               acc[0] = elem.sukces;
            }
            if (elem.porazka < acc[1]) {
               acc[1] = elem.porazka;
            }
            return acc;
         },
         [0, 0]
      );
      this.setState({ dataBar2, loading: false, maxMinBar2Value });
   };

   handleSwitchChange = name => event => {
      event.persist();
      if (event.target.checked) {
         this.setState({ [name]: !event.target.checked }, () => {
            if (this.props.context.isMobile) {
               const height = this.tableRef.current.offsetHeight;
               window.scrollTo({
                  left: 0,
                  top: document.body.clientHeight - height - 85,
                  behavior: 'smooth'
               });
            } else {
               window.scrollTo({
                  left: 0,
                  top: document.body.clientHeight,
                  behavior: 'smooth'
               });
            }
         });
      } else {
         setTimeout(() => {
            this.setState({ [name]: true });
         }, 600);
         const height = this.tableRef.current.offsetHeight;
         window.scrollTo({
            left: 0,
            top: document.body.clientHeight - height - window.innerHeight,
            behavior: 'smooth'
         });
      }
   };

   render() {
      /* const { taskTests } = this.props.context; */
      const {
         dataPie,
         dataLine,
         dataBar,
         dataBar2,
         sliderValue,
         maxMinBar2Value
      } = this.state;
      return (
         <Wrapper>
            <TopBar>
               <h3>Statystyki zadania</h3>
               <Select
                  options={options}
                  styles={colourStyles.call(this)}
                  theme={theme => ({
                     ...theme,
                     colors: {
                        ...theme.colors,
                        primary25: addAlphaChannel(this.props.theme.primaryColor, '0.2'),
                        primary50: addAlphaChannel(this.props.theme.primaryColor, '0.5'),
                        primary: this.props.theme.primaryColor,
                        neutral20: this.props.theme.inputBorderColor,
                        neutral30: this.props.theme.inputBorderColorHover
                     }
                  })}
                  onChange={this.onSelectChange}
                  value={this.state.from}
               />
            </TopBar>
            <Suspense
               fallback={
                  <div
                     style={{
                        textAlign: 'center',
                        fontSize: '24px',
                        fontWeight: '700',
                        marginTop: '40px'
                     }}
                  >
                     Wykresy się ładują...
                  </div>
               }
            >
               <ChartWrapper width={900}>
                  <h3>Liczba testów w wybranym okresie</h3>
                  <ResponsiveLine
                     data={dataLine}
                     margin={{
                        top: 50,
                        right: 60,
                        bottom: 40,
                        left: 60
                     }}
                     xScale={{
                        type: 'point'
                     }}
                     yScale={{
                        type: 'linear',
                        stacked: true,
                        min: 0,
                        max: dataLine[0].max < 10 ? 10 : dataLine[0].max
                     }}
                     curve="linear"
                     axisTop={null}
                     axisRight={null}
                     axisBottom={null}
                     axisLeft={{
                        orient: 'left',
                        tickSize: 0,
                        tickPadding: 20,
                        tickRotation: 0,
                        legend: 'liczba testów',
                        legendOffset: -54,
                        legendPosition: 'middle',
                        itemSize: 20
                     }}
                     enableGridX={false}
                     colorBy={function(e) {
                        return e.color;
                     }}
                     enableDots={false}
                     dotSize={10}
                     dotColor="inherit:darker(0.3)"
                     dotBorderWidth={2}
                     dotBorderColor="#ffffff"
                     dotLabel="y"
                     dotLabelYOffset={-12}
                     animate={true}
                     motionStiffness={90}
                     motionDamping={15}
                     isInteractive={false}
                     enableStackTooltip={false}
                     legends={[]}
                     theme={theme(18)}
                  />
               </ChartWrapper>
               <ChartWrapper>
                  <h3>Statystyki poszczególnych podejść</h3>
                  <ResponsiveBar
                     data={dataBar}
                     keys={['value']}
                     indexBy="attempt"
                     labelFormat={v => `${v}%`}
                     margin={{
                        top: 50,
                        right: 70,
                        bottom: 60,
                        left: 70
                     }}
                     padding={0.3}
                     colorBy={({ data }) => data.attemptColor}
                     borderColor="inherit:darker(1.6)"
                     axisTop={null}
                     axisRight={null}
                     axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'podejście',
                        legendPosition: 'middle',
                        legendOffset: 45
                     }}
                     axisLeft={{
                        tickSize: 5,
                        tickPadding: 15,
                        tickRotation: 0,
                        legend: 'procent sukcesów',
                        legendPosition: 'middle',
                        legendOffset: -60,
                        format: v => `${v}%`
                     }}
                     tooltipFormat={v => `${v}%`}
                     labelSkipWidth={12}
                     labelSkipHeight={12}
                     labelTextColor="inherit:darker(1.6)"
                     animate={true}
                     motionStiffness={90}
                     motionDamping={15}
                     theme={theme(14)}
                  />
               </ChartWrapper>
               <ChartWrapper>
                  <h3>Liczba poprawnych i błędnych rozwiązań zadania</h3>
                  <ResponsivePie
                     data={dataPie}
                     margin={{
                        top: -40,
                        right: 80,
                        bottom: 0,
                        left: 80
                     }}
                     innerRadius={0.5}
                     padAngle={0.7}
                     cornerRadius={3}
                     colors="paired"
                     colorBy={e => e.color}
                     borderWidth={1}
                     borderColor="inherit:darker(0)"
                     radialLabelsSkipAngle={10}
                     radialLabelsTextXOffset={6}
                     radialLabelsTextColor="#333333"
                     radialLabelsLinkOffset={0}
                     radialLabelsLinkDiagonalLength={16}
                     radialLabelsLinkHorizontalLength={16}
                     radialLabelsLinkStrokeWidth={1}
                     radialLabelsLinkColor="#000000"
                     slicesLabelsSkipAngle={10}
                     slicesLabelsTextColor="#333333"
                     animate={true}
                     motionStiffness={90}
                     motionDamping={15}
                     legends={[
                        {
                           anchor: 'bottom',
                           direction: 'row',
                           translateY: 56,
                           translateX: 30,
                           itemWidth: 100,
                           itemHeight: 18,
                           itemTextColor: '#999',
                           symbolSize: 18,
                           symbolShape: 'circle',
                           effects: [
                              {
                                 on: 'hover',
                                 style: {
                                    itemTextColor: '#000'
                                 }
                              }
                           ]
                        }
                     ]}
                  />
               </ChartWrapper>
               <ChartWrapper
                  height={'auto'}
                  marginBottom={'0px'}
                  mobileHeight={'auto'}
                  isMobile={this.props.context.isMobile}
               >
                  <h3>Kolejny wykres</h3>
                  <SliderWrapper disabled={this.state.loading}>
                     <Range
                        disabled={this.state.loading}
                        min={1}
                        max={5}
                        dots
                        step={1}
                        className="mySlider"
                        style={{ margin: '20px 5px' }}
                        activeDotStyle={{
                           borderColor: this.props.theme.primaryColor
                        }}
                        dotStyle={{
                           borderColor: this.props.theme.disabled
                        }}
                        trackStyle={[{ backgroundColor: this.props.theme.primaryColor }]}
                        handleStyle={{
                           borderColor: this.props.theme.primaryColor
                        }}
                        value={sliderValue}
                        onChange={this.onSliderValueChange}
                        onAfterChange={this.onSliderAfterChange}
                     />
                  </SliderWrapper>
                  <p style={{ textAlign: 'left' }}>Opis kolejnego wykresu.</p>
               </ChartWrapper>
               <ChartWrapper
                  height={420}
                  mobileHeight={425}
                  isMobile={this.props.context.isMobile}
                  marginBottom={'10px'}
               >
                  <ResponsiveBar
                     data={dataBar2}
                     keys={['porazka', 'sukces']}
                     indexBy="ID"
                     height={420}
                     colorBy={function(e) {
                        const t = e.id;
                        return e.data[''.concat(t, 'Color')];
                     }}
                     minValue={-maxMinBar2Value[1] < 5 ? -5 : maxMinBar2Value[1]}
                     maxValue={maxMinBar2Value[0] < 5 ? 5 : maxMinBar2Value[0]}
                     margin={{
                        top: 50,
                        right: 70,
                        bottom: 20,
                        left: 70
                     }}
                     labelFormat={v => (v < 0 ? -v : v)}
                     padding={0.3}
                     borderColor="inherit:darker(1.6)"
                     axisBottom={{
                        tickSize: 5,
                        tickPadding: 5,
                        tickRotation: 0,
                        legend: 'ID testu',
                        legendPosition: 'middle',
                        legendOffset: 45
                     }}
                     axisLeft={{
                        tickSize: 5,
                        tickPadding: 15,
                        tickRotation: 0,
                        legend: 'ilosc sukcesów i porażek ',
                        legendPosition: 'middle',
                        legendOffset: -60,
                        format: v => (v < 0 ? -v : v)
                     }}
                     /* tooltipFormat={v => (v < 0 ? -v : v)} */
                     tooltip={data => (
                        <div>
                           <p>
                              ID testu: <strong>{data.data.ID}</strong>
                           </p>
                           <p style={{ color: data.color }}>
                              Wartość:{' '}
                              <strong>{data.value < 0 ? -data.value : data.value}</strong>
                           </p>
                        </div>
                     )}
                     labelSkipWidth={12}
                     labelSkipHeight={12}
                     labelTextColor="inherit:darker(1.6)"
                     animate={true}
                     motionStiffness={90}
                     motionDamping={15}
                     theme={theme(14)}
                  />
               </ChartWrapper>
               <SwitchWrapper marginBottom={this.state.detailsClosed}>
                  <Switch
                     style={{ marginTop: '100px' }}
                     onChange={this.handleSwitchChange('detailsClosed')}
                     value={!this.state.detailsClosed}
                  />
                  <span>
                     Kliknij, aby rozwinąć <strong>szczegóły</strong> poszczególnych
                     testów
                  </span>
               </SwitchWrapper>
               {!this.state.detailsClosed && (
                  <TableStyles ref={this.tableRef}>
                     <ul className="responsive-table">
                        <li className="table-header">
                           <div className="col col-1">ID Zadania</div>
                           <div className="col col-2">Nazwa Funkcji</div>
                           <div className="col col-3">Parametry</div>
                        </li>

                        {dataBar2.map(elem => (
                           <li className="table-row" key={elem.ID} ref={this.tableRef}>
                              <div className="col col-1" data-label="ID Zadania">
                                 <span>{elem.ID}</span>
                              </div>
                              <div className="col col-2" data-label="Nazwa Funkcji">
                                 <span>{elem.nazwaFunkcji}</span>
                              </div>
                              <div className="col col-3" data-label="Parametry">
                                 <span>{elem.parametry}</span>
                              </div>
                           </li>
                        ))}
                     </ul>
                  </TableStyles>
               )}
            </Suspense>
         </Wrapper>
      );
   }
}

export default withTheme(withContext(Task));
