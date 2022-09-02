//this is what i tried using for the current date for the webpage
let dateToday = document.getElementsByClassName

("date-Today");

let today = new Date();

let day = '${today.getDate() < 10 ? "0" : ""}$ {today.getDate()}';

let month = '${today.getMonth() < 10 ? "0" : ""}$ {today.getMonth()}';

let year = today.getFullYear();

dateToday.textContent = '${day}/${month}/${year}';

//the variables of the js 
var idcollection = ["#9", "#10", "#11", "#12", "#1", "#2", "#3", "#4",  "#5"];

var timeslotcollection = ["09:00:00", "10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00"];

var changetimeslotcollection = ["10:00:00", "11:00:00", "12:00:00", "13:00:00",  "14:00:00",  "15:00:00",  "16:00:00",  "17:00:00",  "18:00:00"];

var  pcontent = [];

var getLocalStorageData = JSON.parse(localStorage.getItem("planner-items"));

if (getLocalStorageData !== null) {
 pcontent = getLocalStorageData;
}

//
for (var i=0;i<idcollection.length; i++) {

    var descriptionEl = $(idcollection[i]);

    var buttonEl = descriptionEl.parent().parent().find("button");

//if current time is ealier then future time then timeslot is green

if ((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + timeslotcollection[i])) { 

    descriptionEl.attr("class", "future");

    pcontent.forEach(function(item) {

        if (idcollection[i] === ("#" + (item["input-id"]))) {

            descriptionEl.val(item["input-value"]);
                }
    });
    //if current hour is present then timeslot will turn red red
}
  
else if (((moment().format('MMMM Do YYYY, HH:mm:ss')) >= (moment().format('MMMM Do YYYY') +  ", " + timeslotcollection[i])) &&  

((moment().format('MMMM Do YYYY, HH:mm:ss')) < (moment().format('MMMM Do YYYY') +  ", " + changetimeslotcollection[i])))

{
    descriptionEl.attr("class", "present");

    $(".present").attr("disabled", "disabled");

    buttonEl.attr("disabled", true);

    pcontent.forEach(function(item) {

        if (idcollection[i] === ("#" + item["input-id"])) {

            descriptionEl.val(item["input-value"]);
      }
      //if current time is passed past it turns grey
    });
  }
  else if ((moment().format('MMMM Do YYYY, HH:mm:ss')) > (moment().format('MMMM Do YYYY') +  ", " + timeslotcollection[i])) {

    descriptionEl.attr("class", "past");

    $(".past").attr("disabled", "disabled");

    buttonEl.attr("disabled", true);
  }
}

$("button").on("click", function() {

    event.preventDefault();

    var container = $(this).parent().parent();  

    var inputValue = container.find("input").val();

    var inputId = container.find("input").attr("id");

    var textObj = {

        "input-id": inputId,

        "input-value": inputValue };


  if (textObj["input-value"] !== "") {
  
    pcontent.push(textObj);
  
    localStorage.setItem("planner-items", JSON.stringify(pcontent));
  }
});
