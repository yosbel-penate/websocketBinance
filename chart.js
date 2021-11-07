
var chart = LightweightCharts.createChart(document.getElementById('chart'), {
	width: 600,
    height: 300,
	crosshair: {
		mode: LightweightCharts.CrosshairMode.Normal,
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

    entry.time=  candlestick.t;
    entry.open =  candlestick.o;
    entry.high = candlestick.h;
    entry.low = candlestick.l;
    entry.close = candlestick.c;

    candleSeries.update(entry);
}
