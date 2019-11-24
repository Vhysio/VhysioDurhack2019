# Vhysio: AI Physio for the Visually Impaired
**By Alisa Hussain, AJ Sung & Ben Harries**

***1st Place Winners of DurHack 2019***

* Access the live application at: https://vhysio.herokuapp.com/
* View our presentation slides at: http://bit.ly/2OEQrWv
* Our DevPost Submission for DurHack2019: https://devpost.com/software/durhack2019-qiptux

### Vhysio is a web app utilising cutting edge Machine Learning library, tensorflow.js to enable accessible physiotherapy for the Visually Impaired, talking through exercises by responding to users' postures in real-time. 

Vhysio makes it easier for users to not only complete but to improve their techniques independently.  


## Technology

Vhysio utilises AI Machine Learning technology to learn what makes a particular position correct and incorrect. It has learnt
off a dataset of images to predict whether the position is correct, or incorrect - and what makes it so.  

We have used 'TeachableMachine' A web-based AI Machine Learning tool to train our models in the various physiotherapy poses. 

Google's Speech-to-Text API was also used to enable the application to be accessible by the visually impaired. The user can start their exercises via speech remotely this is more convenient and easier to use for our target audience. 

The application utilises Windows WebKit Speech Recognition, for text-to-speech. This is useful for the visually impaired as they can hear if they are in the right position as the application will tell them to adjust their posture if incorrect.
 
We also use the webcam to track the user's movement which is fed as input to the machine learning model and outputs a status on the user's posture. 

## Supportability

This is fully supported on Desktop/Android Google Chrome. However, from our research, IOS and Safari are unsupported. 

For best results it is advised to use Google Chrome on a desktop.

## Development

During our software development cycle, we used Notion for allocating work segments and dividing the workload into easy to use sizable chunks.

## Main files

* [Index.html]() 
* [Index.js]()
* [app.js]()
* [micWork]()

## Client Folder

* The web application is located in the clients folder. The web application consists of two files: index.html and index.js.

### Index.html

* The index.html contains all the HTML that forms the backbone of the website. 
* We have used the bootstrap open-source CSS framework for our front-end development.

### Index.js

* index.js contains the Javascript code for the web application. This works with HTML to add functionality to the site.
* Loads the model and metadata and handles image data.

## app.js

* The app.js is the server-side back-end code. This serves the web application using express on a node.js server. 
* We have decided to use Heroku as the hosting platform which can be accessed from the link above. 

## micWork 

(Deprecated due to ease of use of in-browser 'Windows WebKit Speech Recognition' alternative)

Uses Google Cloud SDK to utilise Google Cloud Speech-To-Text, so visually impaired users can communicate with the application.

* MicrophoneStream.js: Listens and transcribes text. Performs functions 
based on input received