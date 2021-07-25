const data = [
    {name:'Simon',score:88},
    {name:'Mary',score:90},
    {name:'Simon',score:60}
];

const width=800;
const height=400;
const margin={top:50,bottom:50,left:50,right:50};

const svg=d3.select("#d3-container")
.append('svg')
.attr('height',height-margin.top-margin.bottom)
.attr('width',width-margin.left-margin.right)
.attr('viewBox',[0,0,width,height]);

const x=d3.scaleBand()
.domain(d3.range(data.length))
.range([margin.left,width-margin.right])
.padding(0,1);

const y=d3.scaleLinear()
.domain([0,100])
.range([height-margin.bottom,margin.top]);

svg
    .append('g')
    .attr('fill','royalblue')
    .selectAll('rect')
    .data(data.sort((a,b)=>d3.descending(a.score,b.score)))
    .join('rect')
        .attr('x',(d,i)=>x(i))
        .attr('y',(d)=>y(d.score))
        .attr('height',d=>y(0)-y(d.score))
        .attr('width',x.bandwidth())
        .attr('class','rectangle')

function xAxis(g){
    g.attr('transform','translate(0,${height-margin.bottom})')
    .call(d3.axisBottom(x),tickFormat(i=>data[i].name))
    .attr('font-size','20px')
}
svg.append('g').call(xAxis);
svg.node();

// using d3 for convenience, and storing a selected elements
var $container = d3.select('#scroll');
var $graphic = container.select('.scroll__graphic');
var $chart = graphic.select('.chart');
var $text = container.select('.scroll__text');
var $step = text.selectAll('.step');

// initialize the scrollama
var scroller = scrollama();

// resize function to set dimensions on load and on page resize
function handleResize() { ... }

// scrollama event handlers
function handleStepEnter(response) { ... }

function handleContainerEnter(response) { ... }

function handleContainerExit(response) { ... }

// kick-off code to run once on load
function init() {...}

// start it up
init();

function init() {
	// 1. call a resize on load to update width/height/position of elements
	handleResize();

	// 2. setup the scrollama instance
	// 3. bind scrollama event handlers (this can be chained like below)
	scroller
		.setup({
			container: '#scroll', // our outermost scrollytelling element
			graphic: '.scroll__graphic', // the graphic
			text: '.scroll__text', // the step container
			step: '.scroll__text .step', // the step elements
			offset: 0.5, // set the trigger to be 1/2 way down screen
			debug: true, // display the trigger offset for testing
		})
		.onStepEnter(handleStepEnter)
		.onContainerEnter(handleContainerEnter)
		.onContainerExit(handleContainerExit);

	// setup resize event
	window.addEventListener('resize', handleResize);
}
function handleResize() {
	// 1. update height of step elements for breathing room between steps
	var stepHeight = Math.floor(window.innerHeight * 0.75);
	$step.style('height', stepHeight + 'px');

	// 2. update height of graphic element
	var bodyWidth = d3.select('body').node().offsetWidth;

	$graphic
		.style('height', window.innerHeight + 'px');

	// 3. update width of chart by subtracting from text width
	var chartMargin = 32;
	var textWidth = $text.node().offsetWidth;
	var chartWidth = $graphic.node().offsetWidth - textWidth - chartMargin;
	// make the height 1/2 of viewport
	var chartHeight = Math.floor(window.innerHeight / 2);

	$chart
		.style('width', chartWidth + 'px')
		.style('height', chartHeight + 'px');

	// 4. tell scrollama to update new element dimensions
	scroller.resize();
}
function handleStepEnter(response) {
	// response = { element, direction, index }

	// fade in current step
	$step.classed('is-active', function (d, i) {
		return i === response.index;
	})

	// update graphic based on step here
	var stepData = $step.attr('data-step')
	...
}

function handleContainerEnter(response) {
	// response = { direction }

	// sticky the graphic
	$graphic.classed('is-fixed', true);
	$graphic.classed('is-bottom', false);
}

function handleContainerExit(response) {
	// response = { direction }

	// un-sticky the graphic, and pin to top/bottom of container
	$graphic.classed('is-fixed', false);
	$graphic.classed('is-bottom', response.direction === 'down');
}