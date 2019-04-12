import React, { Component, lazy, Suspense } from 'react';
import axios from 'axios';
import Select from 'react-select';
import withContext from '../../context/Context_HOC';
import { withTheme } from 'styled-components';
import { addAlphaChannel } from '../../utils/utils';

import { Wrapper, ChartWrapper, TopBar } from '../../styles/Tasks';
import { PieChart, Pie, Legend } from 'recharts';
const ResponsivePie = lazy(() => import('../layout/charts/Pie'));
const ResponsiveLine = lazy(() => import('../layout/charts/Line'));

function getParams(location) {
   const searchParams = new URLSearchParams(location);
   return {
      task_id: searchParams.get('task_id') || ''
   };
}

function subtractFunc(date) {
   return Math.round((Date.now() - new Date(date)) / (1000 * 3600 * 24));
}

function getSqlYear(d) {
   return `${d.getFullYear()}-${
      d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1
   }-${d.getDate() < 10 ? `0${d.getDate()}` : d.getDate()}`;
}

function getDataFromDB(fromValue, task_id) {
   if (fromValue !== 'all') {
      const d = new Date();
      d.setDate(d.getDate() - fromValue);
      const sqlDate = getSqlYear(d);

      return axios.get(`/api/tasks/tests/task_id=${task_id}&test_date=${sqlDate}`);
   } else {
      return axios.get(`/api/tasks/tests/task_id=${task_id}&test_date=all`);
   }
}

function memoize(f) {
   let store = new Map(JSON.parse(localStorage.getItem('store'))) || new Map();

   return function(...args) {
      //TODO - dodaj maxAge
      const k = JSON.stringify(args);
      if (store.has(k)) {
         console.log('z cachem');
         return store.get(k);
      } else {
         console.log("bez cache'a");
         store.set(k, f(...args));
         localStorage.setItem('store', JSON.stringify(Array.from(store.entries())));
         return store.get(k);
      }
   };
}

const theme = {
   axis: {
      legend: {
         text: {
            fontSize: 18,
            fontFamily: 'Roboto'
         }
      }
   }
};

const options = [
   { value: 7, label: 'z ostatnich 7 dni' },
   { value: 30, label: 'z ostatnich 30 dni' },
   { value: 183, label: 'z ostatniego pół roku' },
   { value: 365, label: 'z ostatniego roku' },
   { value: 'all', label: 'w ogóle' }
];

class Task extends Component {
   state = {
      dataPie: [],
      dataLine: [
         {
            data: []
         }
      ],
      from: options[0],
      fromValue: 7,
      loading: false
   };

   colourStyles = {
      control: styles => ({ ...styles, cursor: 'pointer' }),
      option: styles => ({ ...styles, cursor: 'pointer' }),
      input: (styles, { isDisabled, isFocused, isSelected }) => ({
         ...styles,
         width: this.props.context.isMobile ? 200 : 300,
         minHeight: this.props.context.isMobile ? '14px' : '25px',
         lineHeight: this.props.context.isMobile ? '14px' : '25px',
         color: this.props.theme.color,
         cursor: 'pointer'
      }),
      placeholder: styles => ({
         ...styles,
         color: this.props.theme.placeholderColor,
         cursor: 'pointer',
         fontSize: this.props.context.isMobile && '15px'
      }),
      singleValue: styles => ({
         ...styles,
         color: this.props.theme.color,
         cursor: 'pointer'
      })
   };

   resolveDataToLineChart = (sqlData, fromValue, task_id) => {
      const data = {
         id: task_id,
         color: 'hsl(349, 70%, 50%)',
         data: []
      };

      if (sqlData.length) {
         const subtract = subtractFunc(sqlData[sqlData.length - 1].date_uploaded);
         const d = new Date();
         const howMany =
            fromValue === 'all' ? (subtract > 365 ? subtract : 365) : fromValue;

         for (let i = 0; i < howMany; i++) {
            d.setDate(d.getDate() - 1);
            data.data.push({
               x: getSqlYear(d),
               y: 0
            });
         }

         sqlData.forEach((elem, i) => {
            const index = subtractFunc(elem.date_uploaded);
            data.data[index - 1].y++;
         });
      }
      return data;
   };

   resolveDataToPieChart(sqlData) {
      const data = [
         { id: 'sukces', label: 'sukces', value: 0, color: 'green' },
         { id: 'porażka', label: 'porażka', value: 0, color: 'red' }
      ];

      sqlData.forEach((elem, i) => {
         if (elem.error_count === 0) {
            data[0].value++;
         } else {
            data[1].value++;
         }
      });
      return data;
   }

   async componentDidMount() {
      //console.log(this.props.context.taskTests);
      window.localStorage.setItem('xd', Math.random());
      const params = getParams(window.location.search);
      const res = await getDataFromDB(this.state.fromValue, params.task_id);
      const dataPie = this.resolveDataToPieChart(res.data);
      const dataLine = this.resolveDataToLineChart(
         res.data,
         this.state.fromValue,
         params.task_id
      );
      this.setState({ dataPie, dataLine: [dataLine] });
   }

   componentWillUnmount() {
      window.localStorage.setItem('store', JSON.stringify([]));
   }

   onSelectChange = async e => {
      const params = getParams(window.location.search);
      this.setState({ loading: true });
      const res = await getDataFromDB(e.value, params.task_id);
      /* console.log(res.data); */
      const memoized_resolveDataToPieChart = memoize(this.resolveDataToPieChart);
      const memoized_resolveDataToLineChart = memoize(this.resolveDataToLineChart);
      const dataPie = memoized_resolveDataToPieChart(res.data);
      const dataLine = memoized_resolveDataToLineChart(res.data, e.value, params.task_id);

      this.setState({
         dataPie,
         dataLine: [dataLine],
         from: { label: e.label, value: e.value },
         fromValue: e.value,
         loading: false
      });
   };

   render() {
      const { taskTests } = this.props.context;
      const { dataPie, dataLine } = this.state;
      return (
         <Wrapper>
            {/*{!!this.state.loading && <p>loading...</p>} */}
            <TopBar>
               <h3>Statystyki zadania</h3>
               <Select
                  options={options}
                  styles={this.colourStyles}
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

            {taskTests.map(elem => (
               <div key={elem.date_uploaded}>
                  {new Date(elem.date_uploaded).toString()}
               </div>
            ))}
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
                        max: 10
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
                     theme={theme}
                  />
               </ChartWrapper>
               <ChartWrapper>
                  <ResponsivePie
                     data={dataPie}
                     margin={{
                        top: 0,
                        right: 70,
                        bottom: 0,
                        left: 70
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
            </Suspense>
         </Wrapper>
      );
   }
}

export default withTheme(withContext(Task));
