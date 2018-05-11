
const util = require('util')
var mysql = require('mysql');
var http = require('http');
var fs = require('fs');
var urlp = require('url');

var con = mysql.createConnection({
    host: "localhost",
    user: "solorioc",
    password: "S214420",
    database: "WinterSanctuary"
});
con.connect(function(err) {
    	if (err) throw err;
    	else {
    	console.log("Connected to SQL");
    	}
});

// Set up the Web server
var server = http.createServer(function(req, res) {
    var url = req.url;

    if (url.startsWith("/message/")) {
      console.log("this happened");
	     ajaxHandle(req,res);
	      return;
    }

  // If no path, get the index.html
  if (url == "/") url = "/volunteer_schedule.html";
  console.log("no path");
  // get the file extension (needed for Content-Type)
  var ext = url.split('.').pop();
    console.log(url + "  :  " + ext);
  // convert file type to correct Content-Type
  var memeType = 'text/html'; // default
  switch (ext) {
    case 'css':
      memeType = 'text/css';
      break;
    case 'png':
      memeType = 'text/png';
      break;
    case 'jpg':
      memeType = 'text/jpeg';
      break;
    case 'js':
      memeType = 'application/javascript';
      break;
  }
  // Send the requested file
  fs.readFile('.' + url, 'utf-8', function(error, content) {
  res.setHeader("Content-Type", memeType);
  res.end(content);
  });
  console.log("Connected to HTML");
});


//alert("connected");


function ajaxHandle(req, res) {
    var data= urlp.parse(req.url,true);
    // route to ajax handler
    console.log('Client Command:'+data.query.operation);
    
 // }
  
    if (data.query.operation == 'SearchFirst' || data.query.operation == 'SearchLast' ) {
      query = "SELECT * FROM Volunteers  WHERE First_Name like '%"+data.query.searchword+"%' OR Last_Name like '%"+data.query.searchword+"%'";
      sendQueryResults(query, res);
    }
    else if (data.query.operation == 'SearchAll') {
      query = "SELECT * FROM Volunteers";
	sendQueryResults(query, res);

    } else if (data.query.operation == 'SearchCustom') {
	var dayin;
	if (data.query.day=="Day") dayin='Day';
	if (data.query.day=="Monday") dayin='M';
	if (data.query.day=="Tuesday") dayin='T';
	if (data.query.day=="Wednesday") dayin='W';
	if (data.query.day=="Thursday") dayin='R';
	if (data.query.day=="Friday") dayin='F';
	if (data.query.day=="Saturday") dayin='S';
	if (data.query.day=="Sunday") dayin='U';
	if (data.query.day=="Fill in/Back up") dayin='Fill in/Backup';

	var shiftin;
	if (data.query.shift="Shift") shiftin="Shift";
	if (data.query.shift="6:00AM - 9:00AM") shiftin="M";
	if (data.query.shift="6:00PM - 10:00PM") shiftin="E";
	if (data.query.shift="10:00PM - 6:00AM") shiftin="O";

	var sidein;
	if (data.query.side="Men") sidein="Men";
	if (data.query.side="Women") sidein="Women";
	if (data.query.side="Either") sidein="Either";
	if (data.query.side="Side") sidein="Side";
	

	console.log("DAY: "+ dayin + "SHIFT:" +shiftin);
	if ( dayin=="Day" && shiftin=="Shift" && sidein!="Side")
	    console.log("worked!");	
	{
	    query = "SELECT * FROM Volunteers WHERE Side= '" +data.query.side+"' OR Side='Either'";
	    sendQueryResults(query, res);
	    
	}
    
	 if ( dayin=="Day" && shiftin!="Shift" && sidein!="Side")
	{    
	    query = "SELECT *  FROM Volunteers JOIN `Volunteer Shifts` USING (Volunteer_ID) WHERE  (Side='" +data.query.side+"' OR Side='Either') AND (Day_Slot='M/"+shiftin+"' OR Day_Slot='T/"+shiftin+"' OR Day_Slot='W/"+shiftin+"' OR Day_Slot='R/"+shiftin+"' OR Day_Slot='F/"+shiftin+"' OR Day_Slot='S/"+shiftin+"' OR Day_Slot='U/"+shiftin+"' OR Day_Slot='Fill in/Back up')";
	    
	sendQueryResults(query, res);
	}
    
	if ( dayin!="Day" && shiftin=="Shift" && sidein!="Side")
	{
	    query = "SELECT *  FROM Volunteers JOIN `Volunteer Shifts` USING (Volunteer_ID) WHERE  (Side='" +data.query.side+"' OR Side='Either') AND (Day_Slot='"+dayin+"/M' OR Day_Slot='"+dayin+"/E' OR Day_Slot='"+dayin+"/O' OR Day_Slot='Fill in/Back up')";
	    sendQueryResults(query, res);
	    
	}
	  if ( data.query.day!="Day" && shiftin!="Shift" && sidein=="Side")
	{
	    query = "SELECT *  FROM Volunteers JOIN `Volunteer Shifts` USING (Volunteer_ID) WHERE (Day_Slot='"+dayin+"/" +shiftin +"' OR Day_Slot='Fill in/Back up')";
	    sendQueryResults(query, res);

	}
	
	  if ( dayin!="Day" && shiftin!=="Shift" && sidein!="Side")
	{
	    query = "SELECT *  FROM Volunteers JOIN `Volunteer Shifts`  USING (Volunteer_ID) WHERE  (Side='" +data.query.side+" 'OR Side='Either') AND (Day_Slot='"+dayin+"/" +shiftin +"' OR Day_Slot='Fill in/Back up')";
	    sendQueryResults(query, res);

	}
	/*else
	{
	    query = "SELECT * FROM Volunteers";
	    sendQueryResults(query, res);
	    
	}*/
    }
	    
    else if (data.query.operation == 'DisplayInfo') {
	//if ( data.query.day=="Day" && data.query.shift=="Shift" && data.query.side!="Side")
	    console.log("worked!");
	query = "SELECT * FROM Volunteers WHERE Volunteer_ID= '" +data.query.Num+"'";
	sendQueryResults(query, res);
    }
    
}
   /* } else if (data.query.operation == 'SearchShift') {
      query = "INSERT INTO PhoneBook(First, Last, Phone, Type) VALUES ('"+data.query.First+"','"+data.query.Last+"','"+data.query.Phone+"','"+data.query.Type+"')";
      AddRow(query, res);
    } else if (data.query.operation == 'Update') {
      query = "UPDATE PhoneBook SET First='"+data.query.First+"', Last='"+data.query.Last+"', Phone='"+data.query.Phone+"', Type='"+data.query.Type+"' WHERE RecNum='"+data.query.RecNum+"'";
      UpdateRow(query, res);
    } else if (data.query.operation == 'Delete') {
      query = "DELETE FROM PhoneBook WHERE RecNum='"+data.query.RecNum+"'";
      DeleteRow(query, res);
    }
}


*/// Perform search, send results to caller
function sendQueryResults(query,res) {
    console.log(query);
    con.query(query, function (err, result, fields) {
		if (err) throw err;
		var results = [];
		Object.keys(result).forEach(function(key) {
			var row = result[key];
			results.push(row);
			console.log(row.First_Name+" "+row.Last_Name+", Phone:"+row.Gender+"  ["+row.Side+"]");
		});
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({
    		operation: 'rows',
    		rows: results
    	}));
    });
}
/*
// Add record
function AddRow(query,res) {
	console.log(query);
    con.query(query, function (err, result, fields) {
		if (err) throw err;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({
    		operation: 'Add',
    		Status: "Row Added"
    	}));
	});
}
// Delete record
function DeleteRow(query,res) {
	console.log(query);
    con.query(query, function (err, result, fields) {
		if (err) throw err;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({
    		operation: 'delete',
    		Status: "Row Deleted"
    	}));
    });
}

// update record
function UpdateRow(query,res) {
	console.log(query);
    con.query(query, function (err, result, fields) {
		if (err) throw err;
	res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({
    		operation: 'update',
    		Status: "Record Updated"
    	}));
    });
}
*/
//Everyone must use own port > 8000
server.listen(9008);
