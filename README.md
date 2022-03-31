Firebase Hosting URL: https://tweeter-c02b8.web.app

Milestone 6 - Firebase

Replace the server connection with firebase firestore
Send data and get data from firestore (you can use the account you created for deployment)
Only logged in users can see tweets and send tweets (see “firestore rules”) - implement a Login and Sign Up page with firebase auth, if the user is not logged in - prevent routing to the tweets pages, and redirect the user to the login page. You can implement your own view and design. Implement a login and signup both with google and with a custom email and password.
Instead of saving the userName on every tweet, save a reference to the user  by the user id.
Add profile picture upload for every user (hint: use firebase cloud storage)
The data needs to update live when there are new tweets (without intervals)
Implement infinite scrolling - at the beginning get 10 tweets, and when the user reaches the end of the screen load the next 10 tweets, etc. (hint: look for firestore pagination.)
No need for a custom backend! all of your code should be in your react project.


