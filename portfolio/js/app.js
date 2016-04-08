var quotes;
// MY QUOTES LIST IN FICTION
(function start() {

      quotes = [
        {
          text: '"It’s no use going back to yesterday, because I was a different person then."',
          source:  'Lewis Carroll, Alice in Wonderland'
        },
        {
          text: '"Begin at the beginning," the King said, very gravely, "and go on till you come to the end: then stop."',
          source:  'Lewis Carroll, Alice in Wonderland',
        },
        {
          text: '"Imagination is the only weapon in the war against reality."' ,
          source:  'Lewis Carroll, Alice in Wonderland'
        },
        {
          text: '"If you don`t know where you are going any road can take you there."',
          source:  'Lewis Carroll, Alice in Wonderland',
        },
        {
          text: '"And what is the use of a book," thought Alice, "without pictures or conversation?"',
          source:  'Lewis Carroll, Alice in Wonderland',
        },
        {
          text: '"Well, I never heard it before, but it sounds uncommon nonsense."' ,
          source:  'Lewis Carroll, Alice in Wonderland'
        },
        {
          text: 'Taking a new step, uttering a new word, is what people fear most.',
          source:  'Fyodor Dostoyevsky, Crime and Punishment',
        },
        {
          text: '"I did not bow down to you, I bowed down to all the suffering of humanity"',
          source:  'Fyodor Dostoyevsky, Crime and Punishment',
        },
        {
          text: '“I may not have been sure about what really did interest me, but I was absolutely sure about what didn`t.”',
          source:  'Albert Camus, The Stranger',
        },
        {
          text: '"I opened myself to the gentle indifference of the world."' ,
          source:  'Albert Camus, The Stranger'
        },
        {
          text: '"All great and precious things are lonely.”',
          source:  'John Steinbeck, East of Eden',
        },
        {
          text: '"And now that you don`t have to be perfect, you can be good.”',
          source:  'John Steinbeck, East of Eden',
        },
        {
          text: '"It seems to me that if you or I must choose between two courses of thought or action, we should remember our dying and try so to live that our death brings no pleasure to the world."' ,
          source:  'John Steinbeck, East of Eden'
        },
        {
          text: '"All great and precious things are lonely.”',
          source:  'John Steinbeck, East of Eden',
        },
        {
          text: '"And now that you don`t have to be perfect, you can be good.”',
          source:  'John Steinbeck, East of Eden',
        },
   		{
          text: '"See, the world is full of things more powerful than us. But if you know how to catch a ride, you can go places"' ,
          source:  'Neal Stephenson, Snow Crash'
        },
        {
          text: '“Is evil something you are? Or is it something you do?”',
          source:  'Bret Easton Ellis, American Psycho',
        },
        {
          text: '“I think a lot of snowflakes are alike...and I think a lot of people are alike too.”' ,
          source:  'Bret Easton Ellis, American Psycho',
        },
        {
          text: '“I`ve forgotten who I had lunch with earlier, and even more important, where.”' ,
          source:  'Bret Easton Ellis, American Psycho'
        },
        {
          text: '“In the middle of the journey of our life I found myself within a dark woods where the straight way was lost.”',
          source:  'Dante Alighieri, Inferno',
        },
        {
          text: '“There is no greater sorrow then to recall our times of joy in wretchedness.”',
          source:  'Dante Alighieri, Inferno',
        },
        {
          text: '“He is, most of all, l`amor che move il sole e l`altre stelle.”',
          source:  'Dante Alighieri, Inferno',
        },
        {
          text: '“Thence we came forth to rebehold the stars.”' ,
          source:  'Dante Alighieri, Inferno',
        },
        {
          text: '“Soon you will be where your own eyes will see the source and cause and give you their own answer to the mystery.”' ,
          source:  'Dante Alighieri, Inferno'
        },
        {
          text: '“She says nothing at all, but simply stares upward into the dark sky and watches, with sad eyes, the slow dance of the infinite stars.”',
          source:  'Neil Gaiman, Stardust',
        },
        {
          text: '“What do stars do? They shine.”',
          source:  'Neil Gaiman, Stardust',
        },
        {
          text: '“Are we human because we gaze at the stars, or do we gaze at the stars because we are human?”',
          source:  'Neil Gaiman, Stardust',
        },
        {
          text: '“Science is magic that works.”',
          source:  'Kurt Vonnegut, Cat`s Cradle',
        },
        {
          text: '"Beware of the man who works hard to learn something, learns it, and finds himself no wiser than before.”' ,
          source:  'Kurt Vonnegut, Cat`s Cradle',
        },
        {
          text: '“There is love enough in this world for everybody, if people will just look.”',
          source:  'Kurt Vonnegut, Cat`s Cradle',
        },
        {
          text: '"The most heartbreakingly beautiful girl I ever hope to see."',
          source:  'Kurt Vonnegut, Cat`s Cradle',
        },
        {
          text: '“We are healthy only to the extent that our ideas are humane.”' ,
          source:  'Kurt Vonnegut, Breakfast of Champions',
        },
        {      
          text: '“I couldn`t help wondering if that was what God put me on Earth for--to find out how much a man could take without breaking.”' ,
          source:  'Kurt Vonnegut, Breakfast of Champions',
        },
        {
          text: '“So, in the interests of survival, they trained themselves to be agreeing machines instead of thinking machines. All their minds had to do was to discover what other people were thinking, and then they thought that, too.”',
          source:  'Kurt Vonnegut, Breakfast of Champions',
        },
        {
          text: '"Of course it is exhausting, having to reason all the time in a universe which wasn`t meant to be reasonable.”',
          source:  'Kurt Vonnegut, Breakfast of Champions',
        },
        {
          text: '“They carried the sky. The whole atmosphere, they carried it, the humidity, the monsoons, the stink of fungus and decay, all of it, they carried gravity.”' ,
          source:  'Tim O`Brien, The Things They Carried',
        },
        {
          text: '“A thing may happen and be a total lie; another thing may not happen and be truer than the truth.”',
          source:  'Tim O`Brien, The Things They Carried',
        },
        {
          text: '“The only way to get rid of temptation is to yield to it.”',
          source:  'Oscar Wilde, The Picture of Dorian Gray',
        },
        {
          text: '“The basis of optimism is sheer terror.”'  ,
          source:  'Oscar Wilde, The Picture of Dorian Gray',
        },
        {      
          text: '“I was not proud of what I had learned but I never doubted that it was worth knowing.”' ,
          source:  'Hunter S. Thompson, The Rum Diary',
        },
        {
          text: '“Though I was careful never to mention it, I began to see a new dimension in everything that happened.”',
          source:  'Hunter S. Thompson, The Rum Diary',
        },
        {
          text: '“You better take care of me Lord, if you don`t you`re gonna have me on your hands.” ',
          source:  'Hunter S. Thompson, Fear and Loathing in Las Vegas',
        },
        {
          text: '“There he goes. One of God`s own prototypes. A high-powered mutant of some kind never even considered for mass production. Too weird to live, and too rare to die.”' ,
          source:  'Hunter S. Thompson, Fear and Loathing in Las Vegas',
      }];    
                func();

    setTimeout(func, 4000);

    })();

function func() {
    var quote = quotes[Math.floor(Math.random() * quotes.length)];
    document.getElementById("randomQuote").innerHTML =
    '<p>' + ' ' +quote.text + ' ' + '&nbsp' + '&nbsp'  +  '---' +
    quote.source + ' ' + '</p>';
    setTimeout(func, 5500);

}



// var strarray = [];


// $(document).foundation();
// $(".off-canvas-submenu").hide();
// $(".off-canvas-submenu-call").click(function() {
// 	var icon = $(this).parent().next(".off-canvas-submenu").is(':visible') ? '+' : '-';
// 	$(this).parent().next(".off-canvas-submenu").slideToggle('fast');
// 	$(this).find("span").text(icon);
// });
