
$(document).ready(function() {

  //Toggle register and login
  $( ".loginbutton" ).click(function() {
    $( ".loginform" ).slideToggle("slow")
   
  })


  $( ".registerbutton" ).click(function() {
    $( ".registerform" ).slideToggle("slow")
  
  })

})




function createListContent(content) {

  let $content = $('<ul>')
  // let $textContent = $('<li>').text(

  content.append($textcontent)

  return content

}









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
