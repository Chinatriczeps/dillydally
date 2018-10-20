
$(document).ready(function() {


  //Toggle register and login
  $( ".loginbutton" ).click(function() {
    $( ".loginform" ).slideToggle("slow")
    $( ".registerform" ).hide()
    $( ".edituserform" ).hide()
  })

  $( ".registerbutton" ).click(function() {
    $( ".registerform" ).slideToggle("slow")
    $( ".loginform" ).hide()
    $( ".edituserform" ).hide()
  
  })

  $( ".edituserbutton" ).click(function() {
    $( ".edituserform" ).slideToggle("slow")
    $( ".loginform" ).hide()
    $( ".registerform" ).hide()
  })

  $('.itemList form').on('submit', function(e) {
    e.preventDefault();
    let inputData = $('.itemList form').serialize();
    let content = $('.w-100 textarea').val()
    //prevent incorrect input
    if (content === null || content === ''){
      $('.emptyError').show('fast');
    }$.ajax('/todo/new', {
      method: 'POST',
      data: inputData,
    }).then(function() {

     //Reset input feild to default state
      $('.textarea').val('');
      $('.textarea').empty();
      $('.emptyError').hide();
    })
  });


  function getListContent(data) {
    $.ajax('/api/todo')
    .then(function (data) {

      for ( let itemID in data) {

      let category = data[itemID].category
      let content = data[itemID].content

      createListContent(category, content)
    
      }
    })
  };
  getListContent()




  function createListContent(category, content) {

    let $textContent = $('<li>').text(content)

    $('.' + category).append($textContent)

    return content

  };


})



