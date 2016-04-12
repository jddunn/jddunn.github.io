//  JavaScript code for exploring the results of any Twitter widget (In this case, a search for posts with the words "got hacked" in them)
//  Single Twitter posts appear in a clear, stylized manner on the page. Then, every 3 seconds (Change the timer if you want!), the next most recent
//  post is selected and replaces the previous. 
//  The code for the timer and animation is in sketch.js and other web files
//  Written by: J.D. Dunn
//  Credit to Jason Mayes for the library / example


//  Instructions below for the Twitter Fetcher library
/**
 * ### HOW TO CREATE A VALID ID TO USE: ###
 * Go to www.twitter.com and sign in as normal, go to your settings page.
 * Go to "Widgets" on the left hand side.
 * Create a new widget for what you need eg "user time line" or "search" etc.
 * Feel free to check "exclude replies" if you don't want replies in results.
 * Now go back to settings page, and then go back to widgets page and
 * you should see the widget you just created. Click edit.
 * Look at the URL in your web browser, you will see a long number like this:
 * 345735908357048478
 * Use this as your ID below instead!
 */

/**
 * How to use TwitterFetcher's fetch function:
 *
 * @function fetch(object) Fetches the Twitter content according to
 *     the parameters specified in object.
 *
 * @param object {Object} An object containing case sensitive key-value pairs
 *     of properties below.
 *
 * You may specify at minimum the following two required properties:
 *
 * @param object.id {string} The ID of the Twitter widget you wish
 *     to grab data from (see above for how to generate this number).
 * @param object.domId {string} The ID of the DOM element you want
 *     to write results to.
 *
 * You may also specify one or more of the following optional properties
 *     if you desire:
 *
 * @param object.maxTweets [int] The maximum number of tweets you want
 *     to return. Must be a number between 1 and 20. Default value is 20.
 * @param object.enableLinks [boolean] Set false if you don't want
 *     urls and hashtags to be hyperlinked.
 * @param object.showUser [boolean] Set false if you don't want user
 *     photo / name for tweet to show.
 * @param object.showTime [boolean] Set false if you don't want time of tweet
 *     to show.
 * @param object.dateFunction [function] A function you can specify
 *     to format date/time of tweet however you like. This function takes
 *     a JavaScript date as a parameter and returns a String representation
 *     of that date.
 * @param object.showRetweet [boolean] Set false if you don't want retweets
 *     to show.
 * @param object.customCallback [function] A function you can specify
 *     to call when data are ready. It also passes data to this function
 *     to manipulate them yourself before outputting. If you specify
 *     this parameter you must output data yourself!
 * @param object.showInteraction [boolean] Set false if you don't want links
 *     for reply, retweet and favourite to show.
 * @param object.showImages [boolean] Set true if you want images from tweet
 *     to show.
 * @param object.linksInNewWindow [boolean] Set false if you don't want links
 *     to open in new window.
 * @param object.lang [string] The abbreviation of the language you want to use
 *     for Twitter phrases like "posted on" or "time ago". Default value
 *     is "en" (English).
 * @param object.showPermalinks [boolean] Set false if you don't want time
 *     to be permalinked.
 * @param object.dataOnly [boolean] Set true if you want the argument passed
 *     to the customCallback to be an Array of Objects containing data
 *     instead of an Array of HTML Strings
 */

// ##### Simple example 1 #####
// A simple example to get my latest tweet and write to a HTML element with
// id "example1". Also automatically hyperlinks URLS and user mentions and
// hashtags.
// var config1 = {
//   "id": '719300266374406145',
//   "domId": 'example1',
//   "maxTweets": 1,
//   "enableLinks": true
  // "customCallback": populateTpl,
  // "dataOnly" : true

// };
// twitterFetcher.fetch(config1);


// ##### Advanced example 3 #####
// An advance example to get data in Objects, instead of HTML Strings,
// to populate a template for example.
var i = 0;
var increment = 0;
var config8 = {
  "id": '719300266374406145',
  "dataOnly": true,
  "customCallback": populateTplTimer
};

twitterFetcher.fetch(config8);
if ($(document).height() > $(window).height()) {
     var scrollTop = ($('html').scrollTop()) ? $('html').scrollTop() : $('body').scrollTop(); // Works for Chrome, Firefox, IE...
     $('html').addClass('noscroll').css('top',-scrollTop);         
}

function populateTplTimer(tweets) {
   setInterval(function(){  
   populateTpl(tweets)}, 3000);
}

function populateTpl(tweets){
  console.log("populated");
  var element = document.getElementById('gotHacked');
  var html = '<ul>';
  increment++;
  for (i = 0, lgth = i+1; i < lgth ; i++) {
    var tweetObject = tweets[increment];
    html += '<li>'
      + (tweetObject.image ? '<div class="tweet-img"><img src="'+tweetObject.image+'" /></div>' : '') +
     // '<h2 style="margin-left: -75%;color:white;font-size:150%">"</h>'+
      // '<p style="text-align:none;margin-top:0%;margin-left:-95%;padding:-10%;font-size:160%"class="tweet-content">"'+
      '<p style="font-size:120%"class="tweet-content">"  '+   
       tweetObject.tweet +'   "'
  // '<p style="font-size:160%"class="tweet-content">"' +'</p>' +'</p>' +'</p>'
  // '<h2 style=margin-left: 10%;color:white;font-size:150%">"'  +'</h>'+
      + '<p style="text-align:none;margin-top:5%;margin-left:55%;font-size:130%"class="tweet-infos">POSTED : <br></p> ' +'<p style="margin-top:0%;margin-left:54%;color:red">'+ tweetObject.time + '</p>'
      + '<p style="margin-left:54%;margin-top:-.25%;color: grey;text-align:none">AGO'
      + '<p class="tweet-authors">' + tweetObject.author + '</p>'
     + '<p style="margin-left: 1%;padding:5%;color:grey"class="tweet-link"><a style="padding:5%;color:grey"href="' + tweetObject.permalinkURL + '">link</a></p>'
    + '</li>';
  }
  html += '</ul>';
  element.innerHTML = html;
}