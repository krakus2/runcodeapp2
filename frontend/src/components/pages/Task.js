import React, { Component, lazy, Suspense } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { withTheme } from 'styled-components';

import withContext from '../../context/Context_HOC';
import {
   addAlphaChannel,
   memoize,
   getDataFromDB,
   getParams,
   subtractFunc,
   getSqlYear
} from '../../utils/utils';
import { Wrapper, ChartWrapper, TopBar, theme, colourStyles } from '../../styles/Tasks';

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

class Task extends Component {
   state = {
      dataPie: [],
      dataLine: [
         {
            data: []
         }
      ],
      dataBar: [
         {
            country: 'AD',
            'hot dog': 185,
            'hot dogColor': 'hsl(221, 70%, 50%)',
            burger: 68,
            burgerColor: 'hsl(39, 70%, 50%)',
            sandwich: 58,
            sandwichColor: 'hsl(115, 70%, 50%)',
            kebab: 199,
            kebabColor: 'hsl(287, 70%, 50%)',
            fries: 129,
            friesColor: 'hsl(218, 70%, 50%)',
            donut: 154,
            donutColor: 'hsl(104, 70%, 50%)'
         }
      ],
      from: options[0],
      fromValue: 7,
      loading: false
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

   resolveDataToBarChart(sqlData) {
      const data = sqlData.reduce((acc, elem, i, array) => {
         if (i === 0) {
            acc.push([{ ...elem }]);
         } else {
            if (array[i].id_user !== array[i - 1].id_user) {
               acc.push([{ ...elem }]);
            } else {
               acc[acc.length - 1].push({ ...elem });
            }
         }
         return acc;
      }, []);

      const statsObj = {
         success1: 0,
         defeat1: 0,
         success2: 0,
         defeat2: 0,
         success3: 0,
         defeat3: 0
      };

      data.forEach((elem, i) => {
         if (elem[0] !== undefined) {
            if (elem[0].error_count === 0) {
               statsObj.success1++;
            } else {
               statsObj.defeat1++;
            }
         }
         if (elem[1] !== undefined) {
            if (elem[1].error_count === 0) {
               statsObj.success2++;
            } else {
               statsObj.defeat2++;
            }
         }
         if (elem[2] !== undefined) {
            if (elem[2].error_count === 0) {
               statsObj.success3++;
            } else {
               statsObj.defeat3++;
            }
         }
      });
      const returnData = [];
      for (let i = 0; i < 3; i++) {
         returnData.push({
            attempt: `${i + 1} próba`,
            /* sukcesColor: "hsl(39, 70%, 50%)", */
            value: Math.round(
               (statsObj[`success${i + 1}`] /
                  (statsObj.success1 + statsObj[`defeat${i + 1}`])) *
                  100
            )
         });
      }
      return returnData;
   }

   async componentDidMount() {
      //console.log(this.props.context.taskTests);
      const params = getParams(window.location.search);
      const res = await getDataFromDB(this.state.fromValue, params.task_id, axios);
      this.setState({
         dataLine: [res.data[0]],
         dataPie: res.data[1],
         dataBar: res.data[2]
      });

      /* const memoized_resolveDataToPieChart = memoize(this.resolveDataToPieChart);
      const memoized_resolveDataToLineChart = memoize(this.resolveDataToLineChart);
      const memoized_resolveDataToBarChart = memoize(this.resolveDataToBarChart);
      const dataPie = memoized_resolveDataToPieChart(res.data, 'dataPie');
      const dataLine = memoized_resolveDataToLineChart(
         res.data,
         this.state.fromValue,
         params.task_id
      );
      const dataBar = memoized_resolveDataToBarChart(res.data, 'dataBar');
      this.setState({ dataPie, dataLine: [dataLine], dataBar }); */
   }

   componentWillUnmount() {
      localStorage.removeItem('store');
   }

   onSelectChange = async e => {
      const params = getParams(window.location.search);
      this.setState({ loading: true });
      const res = await getDataFromDB(e.value, params.task_id, axios);

      /* const memoized_resolveDataToPieChart = memoize(this.resolveDataToPieChart);
      const memoized_resolveDataToLineChart = memoize(this.resolveDataToLineChart);
      const memoized_resolveDataToBarChart = memoize(this.resolveDataToBarChart);
      const dataBar = memoized_resolveDataToBarChart(res.data, 'dataBar');
      const dataPie = memoized_resolveDataToPieChart(res.data, 'dataPie');
      const dataLine = memoized_resolveDataToLineChart(res.data, e.value, params.task_id); */
      this.setState({
         dataLine: [res.data[0]],
         dataPie: res.data[1],
         dataBar: res.data[2],
         from: { label: e.label, value: e.value },
         fromValue: e.value,
         loading: false
      });
   };

   render() {
      const { taskTests } = this.props.context;
      const { dataPie, dataLine, dataBar } = this.state;
      return (
         <Wrapper>
            {/*{!!this.state.loading && <p>loading...</p>} */}
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
                     theme={theme(18)}
                  />
               </ChartWrapper>
               <ChartWrapper>
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
                     colors="nivo"
                     colorBy="id"
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
