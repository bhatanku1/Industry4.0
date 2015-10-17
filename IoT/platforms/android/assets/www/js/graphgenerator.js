//	function demo2(){
//	alert('inside demo2');
    graphUpdate(currentForceX);

    function graphUpdate(currentForceX) {

               data = google.visualization.arrayToDataTable([
                ['Year', 'Sales'],
                ['-21 sec',  i],
      		  ['-18 sec',  j],
                ['-15 sec',  k],
                ['-12 sec',  l],
                ['-9 sec',  m],
                ['-6 sec',  n],
                ['-3 sec',  o],
                ['Current', currentForceX ]
               ]);
              try{
              	chart.draw(data, options);
              }
              catch(err)
             {
             	alert(err.message);
             }
              i = j;
      		j = k;
      		k = l;
      		l = m;
      		m = n;
      		n = o;
      		o = currentForceX;
    }


//	}
