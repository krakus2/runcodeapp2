import React, { Component, lazy, Suspense } from 'react';
import Select from 'react-select';
import { withTheme } from 'styled-components';

import withContext from '../../context/Context_HOC';
import { addAlphaChannel, getDataFromDB, getParams } from '../../utils/utils';
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
      dataPie: [{}],
      dataLine: [
         {
            data: []
         }
      ],
      dataBar: [{}],
      from: options[0],
      fromValue: 7,
      loading: false
   };

   async componentDidMount() {
      //console.log(this.props.context.taskTests);
      const params = getParams(window.location.search);
      const res = await getDataFromDB(this.state.fromValue, params.task_id);
      this.setState({
         dataLine: [res.data[0]],
         dataPie: res.data[1],
         dataBar: res.data[2]
      });
   }

   onSelectChange = async e => {
      const params = getParams(window.location.search);
      this.setState({ loading: true });
      const res = await getDataFromDB(e.value, params.task_id);

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
      /* const { taskTests } = this.props.context; */
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

            {/* taskTests.map(elem => (
               <div key={elem.id}>{new Date(elem.date_uploaded).toString()}</div>
            )) */}
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
            </Suspense>
         </Wrapper>
      );
   }
}

export default withTheme(withContext(Task));
