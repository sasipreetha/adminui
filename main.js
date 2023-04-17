var apiurl="https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json";
var answer = [];

let pagesize = 10;
let currentpage = 1;

async function renderTable(page = 1){
  await getData()
  if(page == 1){
    previousbutton.style.visibility = "hidden";
  }
else{
  previousbutton.style.visibility = "visible";
}

if(page == numberofpages()){
  nextbutton.style.visibility = "hidden";
}
else{
  nextbutton.style.visibility = "visible";
}
  //create HTML Table Data
  console.log(answer);
  var c="";

  answer.filter((row,index) =>{
    let start = (currentpage-1)*pagesize
    let end = currentpage*pagesize

    if(index >= start && index < end ) return true;
  }).forEach(l =>{
    c += "<tr>"
    c += `<td><input type="checkbox" class="c3"></td>`
    c += `<td>${(l.name)}</td>`
    c += `<td>${(l.email)}</td>`
    c += `<td>${(l.role )}</td>`
    c += `<td><button class="btn btn-danger"  onclick="deleterow(this)">Delete</button></td>`
    "<tr>"
  })

document.getElementById("data").innerHTML=c




}

renderTable()

function checkAll() {
  //var inputs = document.querySelectorAll('.c3');
  
  //for (var i = 0; i < inputs.length; i++) {
     // inputs[i].checked = true;
 // }

 $(document).ready(function() {
  $(document).on('change', ".c4", function() {
    var inputs = document.querySelectorAll('.c3');
    for (var i = 0; i < inputs.length; i++) {
      inputs[i].checked = true;
    }
    $(".c4").not(this).prop('checked', false);  
   });
  $(document).on('change', ".c3", function() {
    $(".c3").not(this).prop('checked', false); 
  });
});

}

window.onload = function() {
  window.addEventListener('load', checkAll, false);
}

//get value from input box
function Search(){
    var searchValue = document.getElementById('ib').value; //get value from inputbox by ID Field onkeyUp function 
    var searchTable = document.getElementById('liststring'); //Search Value In Table search Table by Id 
    var searchColCount; //Column Counetr

    //Loop through table rows
    for (var rowIndex = 0; rowIndex < searchTable.rows.length; rowIndex++)
     {
        var rowData = '';

        //Get column count from header row
        if (rowIndex == 0) {
           searchColCount = searchTable.rows.item(rowIndex).cells.length;
           continue; //do not execute further code for header row.
        }

        //Process data rows. (rowIndex >= 1)
        for (var colIndex = 0; colIndex < searchColCount; colIndex++)
         {
            rowData += searchTable.rows.item(rowIndex).cells.item(colIndex).textContent;
        }

         //If search term is not found in row data
        //then hide the row, else show
        if (rowData.indexOf(searchValue) == -1)
            searchTable.rows.item(rowIndex).style.display = 'none';
        else
            searchTable.rows.item(rowIndex).style.display = 'table-row';
            }

          }

//delete indiviual row
function deleterow(r){
  var d = r.parentNode.parentNode.rowIndex;
  console.log(d);
  document.getElementById("liststring").deleteRow(d);
}


function previouspage(){
if(currentpage>1)
{
  currentpage--;
  renderTable(currentpage)
}
}

function nextpage(){
  if((currentpage*pagesize)<answer.length)
  {
    currentpage++;
    renderTable(currentpage)
  }
  }

  function numberofpages(){
    return Math.ceil(answer.length/pagesize)
  }
document.querySelector('#previousbutton').addEventListener('click',previouspage,false)
document.querySelector('#nextbutton').addEventListener('click',nextpage,false)


//deleteallrows
function deleteall(){
  var t = document.getElementById("data");
  while(t.rows.length) {
    t.deleteRow(0);
  }
}

//Feteh data from API
async function getData(){
  const response = await fetch(apiurl);
  const jsre = await response.json()
  answer = jsre;
  console.log(answer);
}

getData()

