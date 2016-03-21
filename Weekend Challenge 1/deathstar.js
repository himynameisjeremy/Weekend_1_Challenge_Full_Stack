var hk47 = {};
var kirKanosArray = [];
var monthlyCreds = 0;
var employeeCount = 0;
var kyleKatarn;

$(document).ready(function(){
  $('#darthRevan').on('submit', function(event){
    event.preventDefault();

    $.each($('#darthRevan').serializeArray(), function(i,field){
      hk47[field.name] = field.value;
    });
    $('#darthRevan').find('input[type=text]').val("");
    kirKanosArray.push(hk47);
    monlthlyCreditsSpent();
  });
  $('.rakataPrime').on('click', '.delete', fireDeathStar);
});


function monlthlyCreditsSpent(){

  for(var i = 0; i < kirKanosArray.length; i++){
    kyleKatarn = kirKanosArray[i];
    $('.tieFighter').text("Name: " + kyleKatarn.empName);
    $('.tieBomber').text("ID Number: " + kyleKatarn.empIDnum);
    $('.tieInterceptor').text("Job Title: " + kyleKatarn.jobTitle);
    $('.tieAdvanced').text("Yearly Salary: " + kyleKatarn.yearlySal);
    employeeCount = i + 1;
  }
  monthlyCreds += parseInt(kyleKatarn.yearlySal/12);
  $('.ebonHawk').text("Total monthly cost of salaries: $" + monthlyCreds);
  $('.c3PO').text("Total employees counted: " + employeeCount);

  $('.rakataPrime').append('<div></div>');
  var carnorJax = $('.rakataPrime').children().last();
  carnorJax.append('<p>#' + employeeCount + ') NAME: ' + hk47.empName + ' ID NUMBER: ' + hk47.empIDnum + ' JOB TITLE: ' + hk47.jobTitle + ' YEARLY SALARY: ' + hk47.yearlySal + '</p>');
  carnorJax.append('<button class="delete">Delete</button>');
  console.log(kirKanosArray);
  console.log(monthlyCreds);
  console.log(hk47);
}

function fireDeathStar(){
  $(this).parent().remove();
}
