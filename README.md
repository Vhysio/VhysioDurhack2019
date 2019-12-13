### **_1st Place DurHack 2019 🎉_**

# Vhysio: AI Physio for the Visually Impaired

**By Alisa Hussain, AJ Sung & Ben Harries**

-   Access the live application at: https://vhysio.herokuapp.com/
-   View our presentation slides at: http://bit.ly/2OEQrWv
-   Our DevPost Submission for DurHack2019: https://devpost.com/software/durhack2019-qiptux
-   Our Demo Video:
    https://www.youtube.com/watch?v=WkkFUl41TWc&feature=youtu.be
-   Our presentation for 2020 imagine cup:
    https://www.youtube.com/watch?v=GpqsrE4nKT8

### Vhysio is a web app utilising **_tensorflow.js_**, a cutting edge browser based Machine Learning library, to enable accessible physiotherapy for the Visually Impaired - talking through exercises by responding to users' postures in real-time.

Vhysio makes it easier for users to not only complete but to improve their techniques independently.

## How to install and use Vhysio

-   Install and Starting Instructions
-   Unzip VhysioDurhack2019-master.zip
-   Open `client/index.html` in web browser

_Or_

-   Unzip `VhysioDurhack2019-master.zip`
-   `cd` into `VhysioDurhack2019-master`
-   Install `node`
-   `npm install`
-   `node app.js`

## How to use Vhysio

-   Allow browser access to microphone and camera
-   Say “start exercises” or press “Start”
-   Try to do a “back bend stretch” approximately 8 foot away from the webcam with whole body in frame like in demo video. (only works in one orientation currently)

## Technology

### Machine Learning - tensorflow.js

Vhysio uses a [tensorflow.js](https://www.tensorflow.org/js) (browser based) model to make predictions on the state of the current users pose. It has been trained on a dataset of images created by us (~600 images per pose) to predict whether the position is correct, or incorrect - and what makes it so.

We have used [TeachableMachine](https://teachablemachine.withgoogle.com/), a web-based Machine Learning tool, to train our models in the various physiotherapy poses.

![Alisa training the model](https://i.ibb.co/SfyQgy8/alisatrainingimage.gif)

Google's Speech-to-Text API was also used to enable the application to be accessible by the visually impaired. The user can start their exercises via speech remotely this is more convenient and easier to use for our target audience.

(Deprecated due to ease of use of in-browser 'Windows WebKit Speech Recognition' alternative)

The application utilises Windows WebKit Speech Recognition, for text-to-speech. This is useful for the visually impaired as they can hear if they are in the right position as the application will tell them to adjust their posture if incorrect.

We also use the webcam to track the user's movement which is fed as input to the posenet machine learning model and outputs posture image on the user's body.

## Supportability

This is fully supported on Desktop/Android Google Chrome. However, from our research, IOS and Safari are unsupported.

For best results it is advised to use Google Chrome on a desktop.

## Development

During our software development cycle, we used Notion for allocating work segments and dividing the workload into easy to use sizable chunks.

## Main files

-   [index.html](./client/index.html)
-   [index.js](./client/index.js)
-   [app.js](./app.js)
-   [micWork](./micWork)

## Client Folder

-   The web application is located in the clients folder. The web application consists of two files: index.html and index.js.

### Index.html

-   The index.html contains all the HTML that forms the backbone of the website.
-   We have used the bootstrap open-source CSS framework for our front-end development.

### Index.js

-   index.js contains the Javascript code for the web application. This works with HTML to add functionality to the site.
-   Loads the model and metadata and handles image data.

## app.js

-   The app.js is the server-side back-end code. This serves the web application using express on a node.js server.
-   We have decided to use Heroku as the hosting platform which can be accessed from the link above.

## micWork

(Deprecated due to ease of use of in-browser 'Windows WebKit Speech Recognition' alternative)

Uses Google Cloud SDK to utilise Google Cloud Speech-To-Text, so visually impaired users can communicate with the application.

-   MicrophoneStream.js: Listens and transcribes text. Performs functions
    based on input received
