
$(document).ready(function() {

  //Toggle login
  $( ".loginbutton" ).click(function() {
    $( ".loginform" ).slideToggle("slow")
    $( ".registerform" ).hide()
    $( ".edituserform" ).hide()
  })

  //Toggle register
  $( ".registerbutton" ).click(function() {
    $( ".registerform" ).slideToggle("slow")
    $( ".loginform" ).hide()
    $( ".edituserform" ).hide()
  })

  //Toggle edit user
  $( ".edituserbutton" ).click(function() {
    $( ".edituserform" ).slideToggle("slow")
    $( ".loginform" ).hide()
    $( ".registerform" ).hide()
  })

  //Close editcategory
  $(".close" ).click(function() {
    $('.popup-content').hide()
    $('.editcategory').empty()
  });

  //Post New List Item to Form 
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
      //Render the new list item to list
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
  
  //creating edit features for list item
        $('.itemname').empty(content)
        $('.popup-content').show()
        $('.itemname').append(content)
        //create popup buttons that can change the category 
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

      //End of edit buttons

      //Append New item to list

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


//Render list data on login with sorted per user
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


//creating list item on render
  function createListContent(category, content, ID) {

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
    
       //Empty previous buttons rendered for list item
        $('.editcategory').empty() 
      
        //append edited list item
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

//append content on render
  $('.' + category).append($textContent)
  $textContent.append($deleteButton, $editButton)


  return content



  }

})



