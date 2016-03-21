var hk47 = {};
var kirKanosArray = [];
var monthlyCreds = 0;
var employeeCount = 0;
var kyleKatarn;

$(document).ready(function(){
  getInfo();
  $('#darthRevan').on('submit', function(event){
    event.preventDefault();

    $.each($('#darthRevan').serializeArray(), function(i,field){
      hk47[field.name] = field.value;
    });
    sendToServer(hk47);
    //Next thing clears out text fields.
    $('#darthRevan').find('input[type=text]').val("");
    // kirKanosArray.push(hk47);
    // monlthlyCreditsSpent();
  });
  $('.rakataPrime').on('click', '.delete', fireDeathStar);
});

function getInfo(){
  $.ajax({
        type: "GET",
        url: "/store/",
        success: function(response){
          throwStuffinArray(response);
        }
    });
}
//
// function fireDeathStar(){
//   $(this).parent().remove();
// }

function fireDeathStar() {
  var id = $(this).data('id');
  console.log("inside deleteToServerFunc after this.data",id);
  var idObject = {"id":id};
  console.log("The idObject is ",idObject);
  $.ajax({
    type: 'DELETE',
    url: '/store',
    data: idObject,
    success: function(response){
      console.log("Getting a response? Yes");

    }
  });
  // $(this).parent().remove();
  $('.rakataPrime').text("");
  $('.ebonHawk').text("");
  monthlyCreds=0;
  getInfo();
}

function sendToServer(){
  $.ajax({
        type: "POST",
        url: "/store/",
        data: hk47,
        success: function(response){
          throwStuffinArray(response);
        }
    });
}

// function appendDom(data){
//   kirKanosArray.push(data);
//   console.log(data);
//   console.log(kirKanosArray);
//
// }

function throwStuffinArray(data){
  throwStuffinArray2(data);
  kirKanosArray=[];
}

function throwStuffinArray2(data){
  for(var i = 0; i < data.length; i++){
    kirKanosArray.push(data[i]);
  }
  for(i = 0; i < kirKanosArray.length; i++){
    kyleKatarn = kirKanosArray[i];
    $('.rakataPrime').append('<div data-id='+""+kyleKatarn.id+'>'+'</div>');
    var carnorJax = $('.rakataPrime').children().last();
    carnorJax.append('<p>#' + kyleKatarn.id + ') NAME: ' + kyleKatarn.name + ' ID NUMBER: ' + kyleKatarn.id_number + ' JOB TITLE: ' + kyleKatarn.job_title + ' YEARLY SALARY: ' + kyleKatarn.yearly_salary + '</p>');
    carnorJax.append('<button class="delete" data-id='+""+kyleKatarn.id+'>'+'Delete</button>');
  }
  for(i = 0; i < kirKanosArray.length; i++){
    monthlyCreds += parseInt(kirKanosArray[i].yearly_salary/12);
    console.log(monthlyCreds);
    $('.ebonHawk').text("Total monthly cost of salaries: $" + monthlyCreds);
  }
}

// function monlthlyCreditsSpent(){
//   for(var i = 0; i < kirKanosArray.length; i++){
//     kyleKatarn = kirKanosArray[i];
//     $('.tieFighter').text("Name: " + kyleKatarn.name);
//     $('.tieBomber').text("ID Number: " + kyleKatarn.id_number);
//     $('.tieInterceptor').text("Job Title: " + kyleKatarn.job_title);
//     $('.tieAdvanced').text("Yearly Salary: " + kyleKatarn.yearly_salary);
//     employeeCount = kyleKatarn.id;
//   }
//   monthlyCreds += parseInt(kyleKatarn.yearlySal/12);
//   $('.ebonHawk').text("Total monthly cost of salaries: $" + monthlyCreds);
//   $('.c3PO').text("Total employees counted: " + employeeCount);
//
//   $('.rakataPrime').append('<div></div>');
//   var carnorJax = $('.rakataPrime').children().last();
//   carnorJax.append('<p>#' + employeeCount + ') NAME: ' + hk47.empName + ' ID NUMBER: ' + hk47.empIDnum + ' JOB TITLE: ' + hk47.jobTitle + ' YEARLY SALARY: ' + hk47.yearlySal + '</p>');
//   carnorJax.append('<button class="delete">Delete</button>');
//   console.log(kirKanosArray);
//   console.log(monthlyCreds);
//   console.log(hk47);
// }
