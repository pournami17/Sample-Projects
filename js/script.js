
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
        opt.value = j;
        var select =document.getElementById("dateList");
        select.appendChild(opt);
    }
    
}
document.getElementById("submitBtn").addEventListener("click", function(event){
    event.preventDefault();
    submitStatusForm();
});

//Function to submit form

var showEntry = [];
function submitStatusForm() {
  
    var dateList = document.getElementById('dateList'),
        projectList= document.getElementById('projectList'),
        activityList = document.getElementById('activityList'),
        hrs = document.getElementById('hours'),
        mins = document.getElementById('minutes'),
        msg = document.getElementById('message');

    var date = dateList.options[dateList.selectedIndex].text,
        dateVal = dateList.options[dateList.selectedIndex].value,
        project = projectList.options[projectList.selectedIndex].value,
        activity = activityList.options[activityList.selectedIndex].value,
        timeHrs = hrs.options[hrs.selectedIndex].text,
        timeHrsVal = hrs.options[hrs.selectedIndex].value,
        timeMinutes = mins.options[mins.selectedIndex].value,
        description = msg.value;
    
    showEntry.push({date, project, activity, timeHrs, timeMinutes, description});

    console.log(showEntry);
  
    var setContent = '';
    for ( var j=0; j<showEntry.length; j++){
      setContent += "<div class='displayList'><div class='listDateCnt'><span class = 'listDate' id = 'listDate'>"+showEntry[j].date+"</span>"
              +"</div><div class= 'listDescriptionCnt'> <span class= 'listDescription' id = 'listDescription'>"+showEntry[j].description+"</span></div>"
      +"<div class= 'listTimeCnt'><p><span class= 'listTime' id ='listTime'>"+showEntry[j].timeHrs+"</span><span class= 'listTime' id ='listTime'>"+":"+showEntry[j].timeMinutes+"</span>"
      +"</p><p>"+showEntry[j].activity+"</p><p>"+showEntry[j].project+"</p></div></div>";
      
    }
    
    document.getElementById('displayLog').innerHTML = setContent;
    
}
 