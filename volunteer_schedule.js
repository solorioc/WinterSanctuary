// JavaScript for Phone Application Demo Program
// Jim Skon, Kenyon College, 2017
var operation;  // operation
var editid;
var tablebuilt=false;
var infobuilt=false;
//var socket = io.connect('http://cslab.kenyon.edu:9007');
var rows;


$(document).ready(function able() {

    operation = "SearchAll";


	  $('#SearchOptions li a').click(function(){
	console.log("pick!"+$(this).text());
	//$(this).parents(".btn-group").find('.selection').text($(this).text());
	operation=$(this).text();
	//changeOperation(operation);
	  });
});
	/* $("#editEntry").click(function(){
		 $('#VolInfo').show();
		$('#VolInfoTitle').show();
		});
		*/




/* var response = prompt("Enter Password:");

while (response != "123")
{
	response = prompt("Wrong Password, please re-enter:");
}
alert("Hello, Molly" );
*/

//changeOperation(operation);
  function changeOperation(operation){
      $('#VolunteerList').empty();
      if(operation=="SearchAll"){
	  console.log(operation);
      $.ajax({
        type: "get",
    url: '/message/',
    data:
    {
      operation:"SearchAll"
    },
	  success:  processResults,
    error: function(){alert("Ajax isn't working");}
      });
    }
     else if (operation=="SearchFirst") {
	  //console.log($('#FirstNameSearch').val());
	  $.ajax({
	      type: "get",
	      url: '/message/',
	      data:
	      {
		  operation:"SearchFirst",
		  searchword:$('#NametoSearch').val()
	      },
	      success:  processResults,
	      error: function(){alert("Ajax isn't working");}
	  });
     }
	 else if (operation=="SearchLast") {
	     console.log($('#SearchFirstLast').val());
	     $.ajax({
		 type: "get",
		 url: '/message/',
		 data:
		 {
		     operation:"SearchLast",
		     searchword:$('#NametoSearch').val()
		 },
		 success:  processResults,
		 error: function(){alert("Ajax isn't working");}
	     });
	     
	 }
      else if (operation=="SearchCustom") {
	  console.log($('#SidesList option:selected').text());
	  $.ajax({
	      type: "get",
	      url: '/message/',
	      data:
	      {
		  operation:"SearchCustom",
		  side: $('#SidesList option:selected').text(),
	      day: $('#DaysList option:Selected').text(),
	      shift: $('#ShiftsList option:Selected').text()
	      },
	      success:  processResults,
	      error: function(){alert("Ajax isn't working");}
	  });
      }
     
      
	  
  }


$("#VolunteerList tr").click(function() {
        $("#test1").html("clicked smth"); //testoutput
        var href = $(this).find("a").attr("href");
        if(href) {
            $("#test2").html("clicked with" + href); //testoutput
            window.location = href;
        }
    });

function buildInfo(id) {
    console.log("buildinfo");
    $.ajax({
	type: "get",
	url: '/message/',
	data:
	{
	    operation:"DisplayInfo",
	    Num: id
	},
	success:  showInfo,
	error: function(){alert("Ajax isn't working");}
    });
/*	infobuilt=true;
	 var result ='<table class="table table-borderless" style="font-size:14px">';
                            result +='<tbody>';
                               result += '<tr>';
                                   result += '<td class="table-left"> <b>Name:</b> John </td>';
                                   result += '<td class="table-left"><b>Email 1: </b> jjcoolboy@hotmail.com</td>';
                              result += ' </tr>';
                               result += '<tr>';
                                   result += '<td class="table-left"><b>Address: </b> 106 Gaskin Ave</td>';
                                  result +=  '<td class="table-left"><b>Email 2: </b> surfbro217@gmail.com</td>';
                               result += '</tr>';
                               result += '<tr>';
                                   result += '<td class="table-left"><b>City: </b> Gambier</td>';
                                   result += '<td class="table-left"><b>Phone 1: </b> (740) 406-0959</td>';
                               result += '</tr>';
                               result += '<tr>';
                                   result += '<td class="table-left"><b>Zipcode: </b> 43022</td>';
                                 result +=   '<td class="table-left"><b>Phone 2: </b> (740) 406-0959</td>';
                             result +=   '</tr>';

                           result += '</tbody>';
                       result += '</table>';
		return result;
*/
}
// Build output table from comma delimited list
function buildTable(rows,op) {
    if (op=="volun"){
	if (rows.length < 1) {
		return "<h3>Nothing Found</h3>";
	} else {
	   // tablebuilt=true;
	var result = '<table class="table table-hover borderless" style="font-size:12px" ><thead class="thead-dark tablehead-center">';
		result += '<tr>';
    result += '<th scope="col" style="border-radius:5px 0 0 0">First</th>';
    result += '<th scope="col">Last</th>';
    result += '<th scope="col">Side</th>';
    result += '<th scope="col" style="border-radius:0 5px 0 0">Option</th>';
	    
	    for (var i=0;i<rows.length;i++) {
		console.log("row:"+JSON.stringify(rows[i]));
		result += "<tr onclick='buildInfo("+rows[i].Volunteer_ID+")';><td class='table-center'>"+rows[i].First_Name+"</td><td class='table-center'>"+rows[i].Last_Name+"<td class='table-center'>"+rows[i].Side+"</td>";
		result += '<td class="table-center" ><button type="button" id='+rows[i].Volunteer_ID+'class="btn btn-dark btn-sm">Edit</button> </td>';
	}
	result += "</table>";
//	    $('#VolunteerList').append(result));
	    
	return result;
	}
    }
    else
    {
	var result='<table class="table table-borderless" style="font-size:14px">';
	result+=' <tbody>';
	result+=' <tr>';
	result+=' <td class="table-left"> <b>Name:</b> "'+rows[0].First_Name+'" </td>';
	result+=' <td class="table-left"><b>Email 1: </b> "'+rows[0].Email_1+'"</td>';
	result+='  </tr>';
	result+=' <tr>';
	result+=' <td class="table-left"><b>Address: </b> "'+rows[0].Address+'"</td>';
	result+=' <td class="table-left"><b>Email 2: </b> "'+rows[0].Email_2+'"</td>';
	result+=' </tr>';
	result+=' <tr>';
	result+='  <td class="table-left"><b>City: </b> "'+rows[0].Town_City+'"</td>';
	result+='  <td class="table-left"><b>Phone 1: </b> "'+rows[0].Phone_Number_1+'"</td>';
	result+=' </tr>';
	result+='  <tr>';
	result+='  <td class="table-left"><b>Zipcode: </b> "'+rows[0].Zip_Code+'"</td>';
	result+='  <td class="table-left"><b>Phone 2: </b> "'+rows[0].Phone_Number_2+'"</td>';
	result+=' </tr>';

	result+='</tbody>';
	result+=' </table>';
//	$('#VolInfo').append(result));
	return result;
    }
}


	/*='  <div class="containerAddNew" style="width: 100%">';
	result+='   <div class="form-group">';
	result+=' <div class="input-group pb-1">';
	for (var i=0;i<rows.length;i++) {
	    result+=' <div type="text"  class="form-control" text="'+rows[i].First_Name+'"></div>';
	   result+=' <div type="text"  class="form-control" text="'+rows[i].Last_Name+'"></div>';
	    result+='  </div>';

	   result+=' <div class="input-group pb-1">';
	    result+=' <div style="width:50%">';
	result+=' <div class="form-control" text="'+rows[i].Gender+'"></div>';
	    result+=' </div>';
	   result+=' </div>';

	result+=' <div style="width:50%">';
	result+=' <div class="form-control" text="'+rows[i].Side+'"></div>';
            result+='   </div>';
                   result+=' </div>';
            

               result+=' <div class="input-group pb-1">';
            result+=' <div type="text" text="'+rows[i].Address+'">';
              result+='  </div>';
                 result+=' <div type="text"  class="form-control"text="'+rows[i].Town_City+'" "></div>';
            result+=' <div type="text" text="'+rows[i].Zip_Code+'"></div>';
result+=' </div>';
	result+=' </div>';
	    result+=' </div>';
	}
	return result;
	
    }*/
/*var result = '<table class="table table-hover borderless" style="font-size:12px" ><thead class="thead-dark tablehead-center">';
	result += '<tr>';
	result += '<th scope="col" style="border-radius:5px 0 0 0">First</th>';
	result += '<th scope="col">Last</th>';
	result += '<th scope="col">Side</th>';
	result += '<th scope="col" style="border-radius:0 5px 0 0">Option</th>';

	for (var i=0;i<rows.length;i++) {
	    console.log("row:"+JSON.stringify(rows[i]));
	    result += "<tr onclick='showInfo("+rows[i].Volunteer_ID+")';><td class='table-center'>"+rows[i].First_Name+"</td><td class='table-center'>"+rows[i].Las\
	    t_Name+"<td class='table-center'>"+rows[i].Side+"</td>";
	    result += '<td class="table-center" ><button type="button" id='+rows[i].Volunteer_ID+'class="btn btn-dark btn-sm edit">Edit</button> </td>';
	}
	result += "</table>";

	return result;
	*/


/*
	tablebuilt=true;
	var result = '<table class="table table-hover borderless" style="font-size:12px" >';
    result += '<thead class="thead-dark tablehead-center">';

    result += '<tr>';
    result += '<th scope="col" style="border-radius:5px 0 0 0">First</th>';
    result += '<th scope="col">Last</th>';
    result += '<th scope="col">Side</th>';
    result += '<th scope="col" style="border-radius:0 5px 0 0">Option</th>';

    result += '</tr>';
    result += '</thead>';
    result += '<tbody>';
    result += ' <tr onclick="showInfo()";>';
    result += '<td class="table-center">Mary</td>';
    result += ' <td class="table-center">Otto</td>';
    result += '<td class="table-center">F or M</td>';

    result += '<td class="table-center"><button type="button" id="one2" class="btn btn-dark btn-sm edit">Edit</button> </td>';
    result += '</tr>';
    result += '<tr>';
    result += ' <td class="table-center">Jacob</td>';
    result += '<td class="table-center">Thornton</td>';
    result += '<td class="table-center">M</td>';

    result += '<td class="table-center" ><button type="button"  id="two2" class="btn btn-dark btn-sm edit">Edit</button> </td>';
    result += '</tr>';
    result += '<tr>';
    result += ' <td class="table-center">Laney</td>';
    result += '<td class="table-center">the Bird</td>';
    result += ' <td class="table-center">F</td>';

    result += '<td class="table-center"><button type="button"  id="three2" class="btn btn-dark btn-sm edit">Edit</button> </td>';
    result += '</tr>';
    result += '<tr>';
    result += ' <td class="table-center">Mark</td>';
    result += '<td class="table-center">Otto</td>';
    result += '<td class="table-center">M</td>';

    result += '<td class="table-center"><button type="button"  id="four2" class="btn btn-dark btn-sm edit">Edit</button> </td>';
    result += '</tr>';
    result += '<tr>';
    result += ' <td class="table-center">Jacob</td>';
    result += '<td class="table-center">Thornton</td>';
    result += '<td class="table-center">M</td>';

    result += '<td class="table-center"><button type="button"  id="five2" class="btn btn-dark btn-sm edit">Edit</button> </td>';
    result += '  </tr>';
    result += ' <tr>';
    result += '  <td class="table-center">Lake</td>';
    result += '<td class="table-center">the Bird</td>';
    result += '<td class="table-center">F</td>';

    result += '<td class="table-center"><button type="button"  id="six2" class="btn btn-dark btn-sm edit">Edit</button> </td>';
    result += '</tr>';
    result += '<tr>';
    result += ' <td class="table-center">Larry</td>';
    result += '<td class="table-center">the Bird</td>';
    result += '<td class="table-center">F</td>';

    result += '<td class="table-center"><button type="button"  id="seven2" class="btn btn-dark btn-sm edit">Edit</button> </td>';
    result += '</tr>';
    result += '<tr>';
    result += ' <td class="table-center">Larry</td>';
    result += '<td class="table-center">the Bird</td>';
    result += '<td class="table-center">F</td>';

    result += '<td class="table-center"><button type="button"  id="eight2" class="btn btn-dark btn-sm edit">Edit</button> </td>';
    result += '</tr>';
    result += '<tr>';
    result += ' <td class="table-center">Larry</td>';
    result += '<td class="table-center">the Bird</td>';
    result += '<td class="table-center">M</td>';
$('#VolInfo').append(result));
    result += '<td class="table-center"><button type="button"  id="nine2" class="btn btn-dark btn-sm edit">Edit</button> </td>';
    result += '</tr>';
    result += '</tbody>';
    result += '</table>';

	return result;
    */



function showInfo(results){
	// $('#searchinfo').show();
	//$('#VolInfoTitle').show();
    $('#VolInfo').empty();
    $('#VolInfo').append(buildTable(results.rows,'info'));
	console.log("executed");
 /*   $('#searchresults').empty();
    $('.editdata').show();
    $("#edit-btn").click(editEntry);
    console.log("Edit Record: " + $(this).attr('ID'));
    var row=$(this).parents("tr");
    console.log("First name of record: "+ $(row).find('.first').text());
    editid=$(this).attr('ID');

    $('#editfirst').val( $(row).find('.first').text());
    $('#editlast').val( $(row).find('.last').text());
    $('#editphone').val( $(row).find('.phone').text());
    $('#edittype').val( $(row).find('.type').text());
    */
}
/*
function editDone() {
    $('#editmessage').text($('#editfirst').val()+" "+$('#editlast').val()+ " SAVED");
}
*/
function editEntry(){
    console.log("Attempting to edit an entry");
    console.log("Firstname:" + $('#editfirst').val() + "ID:" + editid);
    $('#searchresults').empty();
    $.ajax({
	url: '/cgi-bin/bakboukg_phoneAppComplete.cgi?editid='+editid +'&editfname='+$('#editfirst').val()+'&editlname='+$('#editlast').val()+'&editphone='+$('#editphone').val()+'&edittype='+$('#edittype').val()+'&operation=edit',
	dataType: 'text',
	success: editDone(),
	error: function(){alert("Error: Something went wrong");}
    });
}


function processDelete(){
    console.log("Attempting to delete an entry");
    $('#searchresults').empty();
    var id=$(this).attr('ID');
    $.ajax({
	url: '/cgi-bin/bakboukg_phoneAppComplete.cgi?deleteid='+$(this).attr('ID')+'&operation=delete',
	dataType: 'text',
	success: function(){alert("Deleted Record: " +id );},
	error: function(){alert("Error: Something went wrong");}
    });
}

function processResults(results) {

  //  $('#editmessage').empty();
    //$('#addmessage').empty();
   // console.log("Results:"+JSON.stringify(results.rows));
    $('#VolunteerList').append(buildTable(results.rows,'volun'));

	//$(".edit").click();
    //$(".delete").click(processDelete);
   // $('#addmessage').text($('#addfirst').val()+" "+$('#addlast').val()+ " ADDED");

}

/*function clearResults() {
    $('#searchresults').empty();
}
*/
/*function getMatches(){
	var search = $('#Search').val();
	//$('#searchresults').empty();
  	socket.emit('message', {
    	operation: operation,
    	searchText: search
  	});
}
*/
function addEntry(){
    console.log("Attempting to add an entry");
    console.log("Firstname:" + $('#addfirst').val());
    $('#searchresults').empty();
    $.ajax({
	url: '/cgi-bin/bakboukg_phoneAppComplete.cgi?afname='+$('#addfirst').val()+'&alname='+$('#addlast').val()+'&aphone='+$('#addphone').val()+'&atype='+$('#addtype').val()+'&operation='+operation,
	dataType: 'text',
	success: processResults,
	error: function(){alert("Error: Something went wrong");}
    });
}
    function changeNameSearchButtonText(nameType) {
	$("#searchByName").html(nameType + " Name");
    }

    function changeSearchButtonText(searchType) {
	$("#searchByShift").html("Search " + searchType);
    }

    function changeMobileButtonText(phoneType) {
	$("#phone1Type").html(phoneType);
    }

    function changeGenderButtonText(genderType) {
	$("#genderType").html(genderType);
    }

    function changeSideButtonText(sideType) {
	$("#sideType").html(sideType);
    }

    function buttonValue(buttonId) {
	var buttonValue;
	buttonValue = $("#"+buttonId).html();
	//alert(buttonValue);
    }


    function hideTest(id) {
	$("#"+id).hide();
    }
