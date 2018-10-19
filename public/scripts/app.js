
$(document).ready(function() {

  //Toggle register and login
  $( ".loginbutton" ).click(function() {
    $( ".loginform" ).slideToggle("slow")
    $( ".registerform" ).hide()
   
  })

  $( ".registerbutton" ).click(function() {
    $( ".registerform" ).slideToggle("slow")
    $( ".loginform" ).hide()
  
  })

  // console.log(
  // $ajax.


  // //Loading new tweets and rending them to page
  // function loadTweets() {
  //   $.ajax('/api/todo', { method: 'GET' })
  //   .then(function (tweetJSON) {
  //     renderTweets(tweetJSON);
  //   });
  // }

  // function renderTweets(tweets) {
    
  //   for (let userData in tweets) {
    
  //     let tweet = tweets[userData];
  //     let newComment = createTweetElement(tweet)
  //   //adding tweet to top of list
  //       $('.tweets-container').prepend(newComment)
  //     }
  //   }

  function getListContent(data) {
    $.ajax('/api/todo')
    .then(function (data) {
      for ( let itemID in data) {

      let category = data[itemID].category
      let content = data[itemID].content
      createListContent(category, content)
      //If catagory in data base matches catagory of list add to that list
     

      }
    })
  };

  getListContent()



  function createListContent(category, content) {
    console.log(content)
    console.log(category)

    let $textContent = $('<li>').text(content)

    $('.'+category).append($textContent)

    return content

  };


})


  // function categorizeListContent(category, content) {
  //   let $textContent;
  //   if (category === 'foods') {
  //     createListContent(category, content)
  //   }

  // }



//   function renderListContent(renderData) {
//     $.ajax('/api/todo')
//     .then(function (renderData) {
//       for ( let itemID in renderData) {
    
//       //If catagory in data base matches catagory of list add to that list
//       createListContent(renderData[itemID].content);
//       }
//     })
//   };

// renderListContent()






// $(() => {
//   $.ajax({
//     method: "GET",
//     url: "/api/users"
//   }).done((users) => {
//     for(user of users) {
//       $("<div>").text(user.name).appendTo($("main"));
//     }
//   });;
// });







// function createTweetElement(tweet) {

//   let $tweet = $('<article>')
//   let $bubbleHeader = $('<header>')
//   let $profilePicture = $('<img>').attr("src", tweet.user.avatars.small);
//   let $username = $('<name>').text(tweet.user.name); 
//   let $handle = $('<handle>').text(tweet.user.handle);
//   let $tweetContent = $('<div>').text(tweet.content.text);
//   let $bubbleFooter = $('<footer>')
//   //Moment set for date and time
//   let $createdAt= $('<span>').addClass('createdAt').text(moment(tweet.created_at).startOf("minute").fromNow());
//   //Boot strap glyphicons
//   let $hiddenFlag = $('<span>').addClass('glyphicon glyphicon-flag')
//   let $hiddenHeart = $('<span>').addClass('glyphicon glyphicon-heart')
//   let $hiddenReblog = $('<span>').addClass('glyphicon glyphicon-retweet')
  
//   $bubbleHeader.append($profilePicture, $username, $handle)

//   $bubbleFooter.append($createdAt, $hiddenReblog, $hiddenHeart, $hiddenFlag )
  
//   $tweet.append($bubbleHeader, $tweetContent, $bubbleFooter)

//   return $tweet;
// }
