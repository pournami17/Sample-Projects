
window.onload = function(){
    defaultDate()
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
    console.log(dateArray);
}

