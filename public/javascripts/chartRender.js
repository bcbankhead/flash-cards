var totalScore = Number(document.getElementById('totalScore').value);
var questionsAnswered = Number(document.getElementById('questionsAnswered').value);

var pieData = [
	{
		value: totalScore,
		color:"#7FC6A4"
	},
	{
		value : questionsAnswered - totalScore,
		color : "#773344"
	}
];

Chart.types.Doughnut.extend({
   name: "DoughnutAlt",
   draw: function () {
       Chart.types.Doughnut.prototype.draw.apply(this, arguments);

       this.chart.ctx.textBaseline = "middle";
       this.chart.ctx.fillStyle = 'black'
       this.chart.ctx.font = "40px Roboto, san serif";
       this.chart.ctx.textAlign = "center";
       this.chart.ctx.fillText("Score", 115, 100);
       this.chart.ctx.font = "30px Roboto, san serif";
       this.chart.ctx.fillText(totalScore+" / "+questionsAnswered, 115, 130);
   }
});

var scoreChart = document.getElementById("scoreChart").getContext("2d");
new Chart(scoreChart).DoughnutAlt(pieData, {
   percentageInnerCutout: 80, animationEasing: "easeOutQuart"
});
