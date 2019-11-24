# Vhysio: AI Physio for Visually Impaired
Access the live application at: https://vhysio.herokuapp.com/

Vhysio is a tool which makes physiotherapy more accessible to those visually impaired. Talking through exercises and responding to users' postures in real time, 
Vhysio makes it easier for users to not only complete, but to improve their techniques independently.  


## Technology

Vhysio utilises AI Machine Learning technology to learn what makes a particular position correct and incorrect. It has learnt
off a dataset of images to predict whether the position is correct, or incorrect - and what makes it so.  

The application utilises Windows WebKit Speech Recognition, which makes it fully functional on 
chrome. Only the camera is functional on Safari. The application does not run on iOS or Android.

## Main files

* [Index.html](index.html) 
* [Index.js](index.js)
* [micWork](micWork)
* [app.js](app.js)

### Index.html

HTML that forms the backbone of the website.

### Index.js

Works with HTML to add functionality to site.  
Loads the model and metadata and handles image data.

### micWork

Uses Google Cloud SDK to utilise Google Cloud Speech-To-Text, so visually impaired 
users can communicate with the application.

* MicrophoneStream.js: Listens and transcribes text. Performs functions 
based on input received


