//	function demo2(){
//	alert('inside demo2');
	drawChart();
    google.setOnLoadCallback(drawChart);
	function drawChart() {
          data = google.visualization.arrayToDataTable([
          ['time', 'Force X', 'Force Y'],
          ['-21 sec',  300, 100],
          ['-18 sec',  0, 200],
          ['-15 sec',  100, 150],
          ['-12 sec',  0, 100],
          ['-9 sec',  50, 200],
          ['-6 sec',  175, 125],
          ['-3 sec',  0, 150],
          ['current',  100, 75]
        ]);
         options = {
         title: 'Data from the Intelligent device',
         curveType: 'function',
         legend: { position: 'bottom' }
         };
         chart = new google.visualization.LineChart(document.getElementById('curve_chart'));
         chart.draw(data, options);
      }


//	}
