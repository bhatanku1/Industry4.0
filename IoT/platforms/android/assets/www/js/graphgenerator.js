    graphUpdate(currentForceX, currentForceY, currentForceZ);

    function graphUpdate(currentForceX, currentForceY, currentForceZ) {
        //alert("in graph"+ currentForceX + currentForceY + currentForceZ);
        data = google.visualization.arrayToDataTable([
            ['time', 'Force X', 'Force Y', 'Force Z'],
            ['-21 sec', i1, i2, i3],
      		['-18 sec', j1, j2, j3],
            ['-15 sec', k1, k1, k3],
            ['-12 sec', l1, l2, l3],
            ['-9 sec', m1, m2, m3],
            ['-6 sec', n1, n2, n3],
            ['-3 sec', o1, o2, o3],
            ['Current', currentForceX, currentForceY, currentForceZ ]
        ]);
        try {
            chart.draw(data, options);
        }
        catch(err) {
            alert(err.message);
        }

        i1 = j1;
        j1 = k1;
      	k1 = l1;
      	l1 = m1;
      	m1 = n1;
      	n1 = o1;
      	o1 = currentForceX;

        i2 = j2;
        j2 = k2;
      	k2 = l2;
      	l2 = m2;
      	m2 = n2;
      	n2 = o2;
      	o2 = currentForceY;

        i3 = j3;
        j3 = k3;
      	k3 = l3;
      	l3 = m3;
      	m3 = n3;
      	n3 = o3;
      	o3 = currentForceZ;
    }


//	}
