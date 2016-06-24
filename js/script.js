
window.onload = function(){
    defaultDate()
};

function defaultDate()
{
    var d = new Date(),
        day = '' + d.getDate(),
        month = '' + (d.getMonth()+1),
        year = d.getFullYear();
        
        if(month.length < 2)
        {
          month = '0'+ month;
        }
        if(day.length < 2) 
        {
          day = '0' + day;
        }
        console.log(d);
    // var displayDate = today.getFullYear();
    // var localTime = today.toLocaleString();
    document.getElementById("demo").innerHTML = [ day, month, year].join('-');


}


// function selLoc(s) {
//   return s.options[s.selectedIndex].value
// }