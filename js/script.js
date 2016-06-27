
window.onload = function(){
    defaultDate();
};

loadJson('project.json',"projectList");
loadJson('activityType.json',"activityList");

//Function to load multiple JSON

function loadJson(url,selectId) {
    var xmlhttpResp = new XMLHttpRequest();
    xmlhttpResp.overrideMimeType("application/json");
    xmlhttpResp.open('GET', url, true);
    xmlhttpResp.onreadystatechange = function () {
              if (xmlhttpResp.readyState == 4 && xmlhttpResp.status == "200") {
              loadSelect(JSON.parse(xmlhttpResp.responseText),selectId);
              }
        };
    xmlhttpResp.send(null);
}

// Function  to populate Select Boxes using JSON

function loadSelect(populateList,divID){
  
    if(divID == "activityList"){
        for (i in populateList) {
          var opt = document.createElement("option");
          opt.text = populateList[i].activityTypeName;
          opt.value = populateList[i].activityTypeName;
          var select =document.getElementById("activityList");
          select.appendChild(opt);
        }
    }

    if(divID == "projectList"){
        for (i in populateList) {
          var opt = document.createElement("option");
          opt.text = populateList[i].projectName;
          opt.value = populateList[i].projectName;
          var select =document.getElementById("projectList");
          select.appendChild(opt);
        }
    }  
  
}

// Function to display last seven dates in Date Select box

function defaultDate(){

    var today = new Date(),
        day = today.getDate(),
        dateArray = [];

    for (i=0 ; i<7 ; i++) {
        var olderDate = new Date(today.setDate(day - i)); //Setting Dates
        dateArray.push(olderDate.getDate() + '/' + (olderDate.getMonth()+1) + '/' + olderDate.getFullYear());
      
    }
    for (j=0 ; j < dateArray.length; j++) {
        var opt = document.createElement("option");
        opt.text = dateArray[j];
        opt.value = dateArray[j];
        var select =document.getElementById("dateList");
        select.appendChild(opt);
    }
    //console.log(dateArray);
}
document.getElementById("submitBtn").addEventListener("click", function(event){
    event.preventDefault();
    submitStatusForm();
});
//Function to submit form
var showEntry = [];
function submitStatusForm() {
    var a = document.getElementById('dateList'),
        b = document.getElementById('projectList'),
        c = document.getElementById('activityList'),
        d = document.getElementById('hours'),
        e = document.getElementById('minutes'),
        f = document.getElementById('message');

    var date = a.options[a.selectedIndex].value,
        project = b.options[b.selectedIndex].value,
        activity = c.options[c.selectedIndex].value,
        timeHrs = d.options[d.selectedIndex].value,
        timeMinutes = e.options[e.selectedIndex].value,
        description = f.value;

    
    showEntry.push({date, project, activity, timeHrs, timeMinutes, description});
    console.log(showEntry);
    for(var i=0;i<showEntry.length;i++) {
      document.getElementById('listDate').innerHTML = showEntry[i].date;
      document.getElementById('listDescription').innerHTML = showEntry[i].description;
      document.getElementById('listTime').innerHTML = showEntry[i].timeHrs;
    }
  
}

