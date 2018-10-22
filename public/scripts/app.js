
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

  $(".close" ).click(function() {
    $('.popup-content').hide()
    $('.editcategory').empty()
  });

  $(".loginform").on("submit", function(e) {
    // e.preventDefault();
    $.ajax('/login', { method: 'GET' }) .then(function (data) {

    console.log(data)
  })
})

var request = $.ajax({
  url: "/login",
  type: "POST",
  data: {id : menuId},
  dataType: "html"
});

request.done(function(msg) {
  console.log( msg );
});

request.fail(function(jqXHR, textStatus) {
  console.log( "Request failed: " + textStatus );
});


  $('.itemList form').on('submit', function(e) {
    e.preventDefault();
    let inputData = $('.itemList form').serialize();
    let content = $('.w-100 textarea').val()
    //prevent incorrect input
    if (content === null || content === ''){
      $('.emptyError').show('fast');

    } else {
      $.ajax('/todo/new', {
      method: 'POST',
      data: inputData,

    }).then(function () {
      $.ajax('/api/todo', { method: 'GET' }) .then(function (data) {
      let object = data[data.length - 1];
      let index = object.content;
      let ID = object.id;

      let category = object.category
      let $textContent = $('<li>').text(index).attr('data-id', ID)
      let $editButton = $('<button>').addClass('glyphicon glyphicon-edit')
      .attr('data-id', data[data.length - 1].id)
      .click((function(e) {
        e.preventDefault();
        console.log(e.timeStamp)
  //creating edit features for list item
        $('.itemname').empty(content)
        $('.popup-content').show()
        $('.itemname').append(content)
        let $foodList = $('<button>').text('Eat').attr('data-id', data[data.length - 1].id).attr('type', 'submit')
          .attr('name','foodcate')
          .click((function(e) {
            e.preventDefault();
            $.ajax('/todo/' + data[data.length - 1].id + '/edit', {
              method: 'POST',
              data: {
              id: data[data.length - 1].id,
              catagory: 'Food',
              }
             })
            .then(function(e) {
            // $( "<li>" ).slice('data-id', ID)
            $("ul li[data-id=" + e[0].id + "]").remove();
            let $addItem = $('<li>').text(e[0].content)

            $('.Food').append($addItem)
          
  
          }).then(function() {
            $('.popup-content').hide()

          })

            }))

        let $productList = $('<button>').text('Buy').attr('data-id', ID).attr('type', 'submit').attr('name','productcate')
        .click((function(e) {
          e.preventDefault();
          $.ajax('/todo/' + data[data.length - 1].id + '/edit', {
            method: 'POST',
            data: {
              id: data[data.length - 1].id,
              catagory: 'Product',
            }
           })
           .then(function(e) {
            // $( "<li>" ).slice('data-id', ID)
            $("ul li[data-id=" + e[0].id + "]").remove();
            let $addItem = $('<li>').text(e[0].content)

            $('.Product').append($addItem)
            $addItem.append($deleteButton, $editButton)
  
          }).then(function() {
            $('.popup-content').hide()

          })


          }))
        let $filmList = $('<button>').text('Watch').attr('data-id', data[data.length - 1].id).attr('type', 'submit').attr('name','filmcate')
        .click((function(e) {
          e.preventDefault();
          $.ajax('/todo/' + data[data.length - 1].id + '/edit', {
            method: 'POST',
            data: {
              id: data[data.length - 1].id,
              catagory: 'Film',
            }
           })
           .then(function(e) {
            // $( "<li>" ).slice('data-id', ID)
            $("ul li[data-id=" + e[0].id + "]").remove();
            let $addItem = $('<li>').text(e[0].content)

            $('.Film').append($addItem)
            $addItem.append($deleteButton, $editButton)
  
          }).then(function() {
            $('.popup-content').hide()

          })

          }))
        let $bookList = $('<button>').text('Book').attr('data-id', data[data.length - 1].id).attr('type', 'submit').attr('name','bookcate')
        .click((function(e) {
          e.preventDefault();
          $.ajax('/todo/' + data[data.length - 1].id + '/edit', {
            method: 'POST',
            data: {
              id: data[data.length - 1].id,
              catagory: 'Book',
            }
           })
           .then(function(e) {
            // $( "<li>" ).slice('data-id', ID)
            $("ul li[data-id=" + e[0].id + "]").remove();
            let $addItem = $('<li>').text(e[0].content)

            $('.Book').append($addItem)
            $addItem.append($deleteButton, $editButton)
  
          }).then(function() {
            $('.popup-content').hide()
          })

          }))
   
          $('.editcategory').empty()
          $('.editcategory').append($foodList, $productList, $filmList, $bookList)

        // button html   <button type='submit' name='bookcate'>Book</button>
        //add buttons to be gerated on command with item id
      // .editcategory for append

      //will i have to a .click on every $itemList for wanted effect?
      //better method than current method


      }))

      let $deleteButton = $('<button>').addClass('glyphicon glyphicon-remove')
      .attr('data-id', data[data.length - 1].id)
      .click((function(e) {
        e.preventDefault();
        $("ul li[data-id=" + data[data.length - 1].id + "]").remove();


        $.ajax('/todo/' + data[data.length - 1].id + '/delete', {
          method: 'POST'
         })


      }))

     $('.' + category).append($textContent)
          $textContent.append($deleteButton, $editButton)
    //Reset input feild to default state
     $('.w-100 textarea').val('');
     $('.w-100 textarea').empty();
     $('.emptyError').hide();

    })
    })
    }
  })


function getListContent(data) {
  $.ajax(`/api/todo/${data}`)
  .then(function (data) {
    for ( let itemID in data) {
    let category = data[itemID].category
    let content = data[itemID].content
    let ID = data[itemID].id
    createListContent(category, content, ID)
    }
  })
};
function getLoggedInUser() {
  $.ajax('/userid')
  .then((result) => {
    getListContent(result)
  })
}
getLoggedInUser()



  function createListContent(category, content, ID) {
//creating list item
    let $textContent = $('<li>').text(content).attr('data-id', ID)
    let $editButton = $('<button>').addClass('glyphicon glyphicon-edit').attr('data-id', ID)
    .click((function(e) {
      e.preventDefault();
      
//creating edit features for list item
      $('.itemname').empty(content)
      $('.popup-content').show()
      $('.itemname').append(content)
      
      let $foodList = $('<button>').text('Eat').attr('data-id', ID).attr('type', 'submit')
        .attr('name','foodcate')
        .click((function(e) {
          e.preventDefault();
          $.ajax('/todo/' + ID + '/edit', {
            method: 'POST',
            data: {
            id: ID,
            catagory: 'Food',
            }
           })
          .then(function(e) {
          // $( "<li>" ).slice('data-id', ID)
          $("ul li[data-id=" + e[0].id + "]").remove();
          let $addItem = $('<li>').text(e[0].content)

          $('.Food').append($addItem)
          $addItem.append($deleteButton, $editButton)

        }).then(function() {
          $('.popup-content').hide()

        })

          }))

      let $productList = $('<button>').text('Buy').attr('data-id', ID).attr('type', 'submit').attr('name','productcate')
      .click((function(e) {
        e.preventDefault();
        $.ajax('/todo/' + ID + '/edit', {
          method: 'POST',
          data: {
            id: ID,
            catagory: 'Product',
          }
         })
         .then(function(e) {
          // $( "<li>" ).slice('data-id', ID)
          $("ul li[data-id=" + e[0].id + "]").remove();
          let $addItem = $('<li>').text(e[0].content)

          $('.Product').append($addItem)
          $addItem.append($deleteButton, $editButton)

        }).then(function() {
          $('.popup-content').hide()

        })


        }))
      let $filmList = $('<button>').text('Watch').attr('data-id', ID).attr('type', 'submit').attr('name','filmcate')
      .click((function(e) {
        e.preventDefault();
        $.ajax('/todo/' + ID + '/edit', {
          method: 'POST',
          data: {
            id: ID,
            catagory: 'Film',
          }
         })
         .then(function(e) {
          // $( "<li>" ).slice('data-id', ID)
          $("ul li[data-id=" + e[0].id + "]").remove();
          let $addItem = $('<li>').text(e[0].content)

          $('.Film').append($addItem)
          $addItem.append($deleteButton, $editButton)

        }).then(function() {
          $('.popup-content').hide()

        })

        }))
      let $bookList = $('<button>').text('Book').attr('data-id', ID).attr('type', 'submit').attr('name','bookcate')
      .click((function(e) {
        e.preventDefault();
        $.ajax('/todo/' + ID + '/edit', {
          method: 'POST',
          data: {
            id: ID,
            catagory: 'Book',
          }
         })
         .then(function(e) {
          // $( "<li>" ).slice('data-id', ID)
          $("ul li[data-id=" + e[0].id + "]").remove();
          let $addItem = $('<li>').text(e[0].content)

          $('.Book').append($addItem)
             $addItem.append($deleteButton, $editButton)

        }).then(function() {
          $('.popup-content').hide()

        })


        }))
    
       
        $('.editcategory').empty() 
      
      $('.editcategory').append($foodList, $productList, $filmList, $bookList)

    }))

let $deleteButton = $('<button>').addClass('glyphicon glyphicon-remove')
.attr('data-id', ID)
.click((function(e) {
  e.preventDefault();
  $("ul li[data-id=" + ID + "]").remove();


  $.ajax('/todo/' + ID + '/delete', {
    method: 'POST'
   })


}))

$('.' + category).append($textContent)
$textContent.append($deleteButton, $editButton)


return content



}

})



