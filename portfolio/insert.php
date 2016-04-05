// Get values from form
$name=$_POST['name'];
$city=$_POST['city'];
$phone=$_POST['phone'];
$email=$_POST['email'];
 
$to = &quot;johnnyddunn@gmail.com@gmail.com&quot;;
$subject = &quot;Future Tutorials Contact Form Test&quot;;
$message = &quot; Name: &quot; . $name . &quot;\r\n City: &quot; . $city . &quot;\r\n Phone: &quot; . $phone . &quot;\r\n Email: &quot; . $email;
 
 
$from = &quot;FutureTutorials&quot;;
$headers = &quot;From:&quot; . $from . &quot;\r\n&quot;;
$headers .= &quot;Content-type: text/plain; charset=UTF-8&quot; . &quot;\r\n&quot;; 
 
if(@mail($to,$subject,$message,$headers))
{
  print &quot;&lt;script&gt;document.location.href='confirmation.html';&lt;/script&gt;&quot;;
  // Created by Future Tutorials
}else{
  echo &quot;Error! Please try again.&quot;;
}