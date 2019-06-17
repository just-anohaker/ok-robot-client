import { Chart, Tooltip, Legend, Axis, Plugin, Slider, View, Candle, Bar } from 'viser-react';
import React, { PureComponent } from 'react';
import { parseTime } from '../../util/utils';
import isEqual from 'lodash/isEqual';
const DataSet = require('@antv/data-set');

const scale1 = [
  {
    dataKey: 'time',
    type: 'time',
    nice: false,
    mask: 'MM-DD HH:mm',
    range: [0, 1]
  }, {
    dataKey: 'trend',
    values: ['上涨', '下跌'],
  }, {
    dataKey: 'volumn',
    alias: '成交量'
  }, {
    dataKey: 'open',
    alias: '开盘价'
  }, {
    dataKey: 'close',
    alias: '收盘价'
  }, {
    dataKey: 'max',
    alias: '最高价'
  }, {
    dataKey: 'min',
    alias: '最低价'
  }, {
    dataKey: 'mean',
    alias: 'MA：'
  }, {
    dataKey: 'price',
    alias: '股票价格'
  }];

const scale2 = [
  {
    dataKey: 'volumn',
    tickCount: 2
  }];

const tooltipOpts = {
  showTitle: false,
  itemTpl: `<li data-index={index}>
            <span style="background-color:{color};" class="g2-tooltip-marker"></span>
            {name}{value}
        </li>`,
};

let indexStart = -1;//开始下标
let indexEnd = -1;//结束下标
const _generateStartEnd = (data) => {
  let start = 0, end = 0, l = 0;
  if ((data instanceof Array)) {
    l = data.length;
    // console.log("_generateStartEnd=>", l, indexStart, indexEnd);
    if (l < 1) {
      return { start, end };
    }
    else if (indexStart === -1 || indexEnd === -1 || l < indexEnd) {
      start = data[l - 1].time;
      end = data[0].time;
    }
    else if (l > indexStart) {
      start = data[indexStart].time;
      end = data[indexEnd].time
    }
    else if (l > indexStart - indexEnd) {
      start = data[l - 1 - indexEnd].time;
      end = data[indexEnd].time
    }
    else {
      start = data[l - 1].time;
      end = data[0].time;
    }
  }

  return { start, end };
}

export default class CandleChart extends PureComponent {
  constructor(props) {
    super(props);

    let { start, end } = _generateStartEnd(props.data);
    this.state = {
      start,
      end,
      data: props.data,
      value: props.data,
    }
  }

  static getDerivedStateFromProps(nextProps, preState) {
    // console.log("getDerivedStateFromProps=>", nextProps, preState)
    if (isEqual(nextProps.data, preState.value)) {
      return null;
    }

    let { start, end } = _generateStartEnd(nextProps.data);
    return {
      start,
      end,
      data: nextProps.data,
      value: nextProps.data,
    };
  }

  slideChange = (opts) => {
    // console.log("slideChange=>", opts)
    let { data } = this.state;
    data.forEach((v, i) => {
      if (v.time === opts.startValue) {
        indexStart = i;
      }
      if (v.time === opts.endValue) {
        indexEnd = i;
      }
    });

    this.setState({
      start: opts.startValue, end: opts.endValue,
    });
  }

  getData = () => {
    const { start, end, data } = this.state;

    const ds = new DataSet({ state: { start, end } });
    const dv = ds.createView();
    dv.source(data)
      .transform({
        type: 'filter',
        callback: obj => {
          const date = obj.time;
          return date <= end && date >= start;
        }
      })
      .transform({
        type: 'map',
        callback: obj => {
          obj.trend = (obj.open <= obj.close) ? '上涨' : '下跌';
          obj.price = [obj.open, obj.close, obj.max, obj.min];
          return obj;
        }
      });
    return dv;
  }

  getColor = () => {
    return [
      'trend',
      val => {
        if (val === '上涨') {
          return '#2fc25b';
        }
        if (val === '下跌') {
          return '#f04864';
        }
      }
    ];
  }

  render() {
    const { start, end, data } = this.state;
    const dv = this.getData();

    if (!data.length) {
      return (<div></div>);
    }

    const sliderOpts = {
      container: 'viser-slider-1',
      width: 'auto',
      height: 26,
      padding: [15, 80, 20, 80],
      start, // 和状态量对应
      end,
      data, // 源数据
      xAxis: 'time', // 背景图的横轴对应字段，同时为数据筛选的字段
      yAxis: 'volumn', // 背景图的纵轴对应字段，同时为数据筛选的字段
      scales: {
        time: {
          type: 'timeCat',
          nice: false,
          mask: 'MM-DD HH:mm',
        }
      },
      onChange: this.slideChange.bind(this)
    };
    return (
      <div >
        <Chart forceFit={true} height={400} animate={false} padding={[20, 30, 40, 45]} data={dv} scale={scale1} >
          <Tooltip {...tooltipOpts} />
          <Axis />
          <Legend offset={1} />
          <View data={dv} end={{ x: 1, y: 0.5 }}>
            <Candle position='time*price' color={this.getColor()} tooltip={['time*open*close*max*min', (time, open, close, max, min) => {
              return {
                name: parseTime(time, '{y}-{m}-{d} {h}:{i}'),
                value: `<br>
                          <span style="padding-left: 16px">开盘价：${open} </span><br/>
                          <span style="padding-left: 16px">收盘价：${close} </span><br/>
                          <span style="padding-left: 16px">最高价：${max} </span><br/>
                          <span style="padding-left: 16px">最低价：${min} </span>`
              };
            }]} />
            {/* <Line position="time*mean" color="#FACC14" /> */}
          </View>
          <View data={dv} scale={scale2} start={{ x: 0, y: 0.65 }}>
            <Axis dataKey='time' tickLine={null} label={null} />
            <Axis dataKey='volumn' label={{
              formatter: function (val) {
                return parseInt(String(val / 1000), 10) + 'k';
              }
            }} />
            <Bar position='time*volumn' color={this.getColor()} tooltip={['time*volumn', (time, volumn) => {
              return {
                name: parseTime(time, '{y}-{m}-{d} {h}:{i}'),
                value: `<br/><span style="padding-left: 16px">成交量：${volumn} </span><br/>`
              };
            }]} />
            {/* <Line position="time*volumn" color="#FACC14" /> */}
          </View>
        </Chart>
        <Plugin>
          <Slider {...sliderOpts} />
        </Plugin>
      </div>
    );
  }
}
