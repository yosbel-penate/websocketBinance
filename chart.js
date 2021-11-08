
var chart = LightweightCharts.createChart(document.getElementById('chart'),  {
	width: 600,
  height: 300,
	layout: {
		backgroundColor: '#ffffff',
		textColor: 'rgba(33, 56, 77, 1)',
	},
  localization: {
        locale: 'cn-CN',
    },
	grid: {
		vertLines: {
			color: 'rgba(197, 203, 206, 0.7)',
		},
		horzLines: {
			color: 'rgba(197, 203, 206, 0.7)',
		},
	},
	timeScale: {
		timeVisible: true,
    secondsVisible: false,
	},
});

var candleSeries = chart.addCandlestickSeries();

var currentBusinessDay = { day: 29, month: 5, year: 2019 };
var entry = {
    open: null,
    high: null,
    low: null,
    close: null,
    time: currentBusinessDay,
};
var socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@kline_1m');

socket.onmessage = function (event) {
    var message = JSON.parse(event.data)
    var candlestick = message.k;
    
    entry.time = humanDateFormat(candlestick.t);
    entry.open =  candlestick.o;
    entry.high = candlestick.h;
    entry.low = candlestick.l;
    entry.close = candlestick.c;
    candleSeries.update(entry);
}

function humanDateFormat(unixTimestamp)
{
    return dateToChartTimeMinute(new Date(unixTimestamp*1000));
}
function dateToChartTimeMinute(date) {
	return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate(), date.getHours(), date.getMinutes(), 0, 0) / 1000;
};