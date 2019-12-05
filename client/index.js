// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
// const URL2 = "https://teachablemachine.withgoogle.com/models/9o5NXD5r/"; // Lunge
const URL2 = "https://teachablemachine.withgoogle.com/models/Jttf39ey/"; // 2.0 lunge

// const URL1 = "https://teachablemachine.withgoogle.com/models/nFctljBl/"; // Back bend
// const URL1 = "https://teachablemachine.withgoogle.com/models/w_q11QNp/"; // DEMO
const URL1 = "https://teachablemachine.withgoogle.com/models/8gQNM0Uk/"; // 2.0
let model, model2, webcam, ctx, labelContainer, maxPredictions;

var bar_colours = [
    "bg-success",
    "bg-warning",
    "bg-info",
    "bg-danger",
    "bg-success",
    "bg-info",
    "bg-warning",
    "bg-danger"
];

let no_stretch = 1;

const STREAK = 40;
const CONFIDENCE_BENCHMARK = 0.5;
var currentPosture_and_stream = { Posture: "Unsure", Streak: 1 };
var lastCall = "Unsure";
var flag = true;

async function init(URLno) {
    var URL = URL1;
    if (URLno == 1) {
        URL = URL2;
    }

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    // load the model and metadata
    // Refer to tmPose.loadFromFiles() in the API to support files from a file picker
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(parent.innerWidth, parent.innerHeight, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById("canvas");
    canvas.width = parent.innerWidth;
    canvas.height = parent.innerHeight;

    ctx = canvas.getContext("2d");
    labelContainer = document.getElementById("label-container");
    for (let i = 0; i < maxPredictions; i++) {
        // and class labels
        labelContainer.appendChild(document.createElement("div"));
    }
    var startmsg = new SpeechSynthesisUtterance(
        "Starting Your Exercises. Beginning with Back Bend Stretch"
    );

    if (URLno == 1) {
        startmsg = new SpeechSynthesisUtterance(
            "Second Exercise. Lunge Rotate Stretch"
        );
    }
    window.speechSynthesis.speak(startmsg);

    var el = document.getElementById("filler-label-container");
    el.remove();
    var bel = document.getElementById("speech");
    bel.remove();

    sequence.innerHTML = `<div class="scrollmenu">
    <a href="#BackBend" id="stretch1" >Back Bend</a>
    <a href="#Lunge" id="stretch2" >Lunge Rotate</a>
    <a href="#calf" id="stretch3" >Calf Tense</a>
    <a href="#about" id="stretch4">Shoulder Relax</a>
    <a href="#support">Neck Soother</a>
    <a href="#blog">Ankle Rolling</a>
    <a href="#base">Chest Expand</a>
  </div>`;

    if (URLno == 1) {
        sequence.innerHTML = `<div class="scrollmenu">
    <a href="#BackBend" id="stretch1" >Back Bend</a>
    <a href="#Lunge" id="stretch1" >Lunge Rotate</a>
    <a href="#calf" id="stretch3" >Calf Tense</a>
    <a href="#about" id="stretch4">Shoulder Relax</a>
    <a href="#support">Neck Soother</a>
    <a href="#blog">Ankle Rolling</a>
    <a href="#base">Chest Expand</a>
  </div>`;
    }
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame

    await predict();
    window.requestAnimationFrame(loop);
}

async function predict() {
    let { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    let prediction = await model.predict(posenetOutput);

    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element

    // Prediction 2: run input through teachable machine classification model

    // Prediction 2: run input through teachable machine classification model

    for (let i = 0; i < maxPredictions; i++) {
        prediction[i].className =
            prediction[i].className == "Kness too bent"
                ? "Knees Too Bent"
                : prediction[i].className;
        const classPrediction =
            prediction[i].className +
            ": " +
            (prediction[i].probability * 100).toFixed(0) +
            "%" +
            `<div class="progress">
                <div class="progress-bar progress-bar-striped ${
                    bar_colours[i]
                }" role="progressbar" style="width: ${(
                prediction[i].probability * 100
            ).toFixed(0)}%" aria-valuenow=${(
                prediction[i].probability * 100
            ).toFixed(0)} aria-valuemin="0" aria-valuemax="100"></div>
            </div>`;

        labelContainer.childNodes[i].innerHTML = classPrediction;
        if (prediction[i].probability > CONFIDENCE_BENCHMARK) {
            if (currentPosture_and_stream.Posture == prediction[i].className) {
                console.log(
                    currentPosture_and_stream.Streak,
                    lastCall,
                    prediction[i].className
                );
                if (currentPosture_and_stream.Streak > STREAK) {
                    console.log("Mumba", lastCall, no_stretch);
                    if (lastCall != prediction[i].className) {
                        console.log(
                            "Has been " +
                                prediction[i].className +
                                " " +
                                STREAK +
                                " times in a row"
                        );
                        // Current Status
                        footer.innerHTML = "Status: " + prediction[i].className;

                        lastCall = prediction[i].className;
                        var msg = new SpeechSynthesisUtterance(
                            prediction[i].className
                        );
                        window.speechSynthesis.speak(msg);
                    } else {
                        if (no_stretch == 1 && lastCall == "Correct Bend") {
                            console.log(msg, "yeeepo");
                            var msg = new SpeechSynthesisUtterance(
                                "Hold there for 10 seconds. Finished Back Bend"
                            );
                            window.speechSynthesis.speak(msg);

                            flag = false;
                            console.log("start" + no_stretch);
                            document.getElementById(
                                "stretch" + no_stretch
                            ).style.background = "green";
                            no_stretch += 1;
                            init(1);
                        } else if (
                            no_stretch == 2 &&
                            lastCall == "Correct Lunge"
                        ) {
                            var msg = new SpeechSynthesisUtterance(
                                "Finished Lunge Rotate"
                            );
                            window.speechSynthesis.speak(msg);
                            flag = false;
                            console.log("start" + no_stretch);
                            document.getElementById(
                                "stretch" + no_stretch.toString()
                            ).style.background = "green";
                            no_stretch += 1;
                        } else if (no_stretch == 3) {
                            var msg = new SpeechSynthesisUtterance(
                                "Finished Stretches. This continues your 3 day streak"
                            );
                            window.speechSynthesis.speak(msg);
                            no_stretch += 1;
                        }
                    }
                } else {
                    console.log("streak", currentPosture_and_stream.Streak);
                    currentPosture_and_stream.Streak += 1;
                }
            } else {
                console.log("Yeahhh");
                currentPosture_and_stream.Posture = prediction[i].className;
                currentPosture_and_stream.Streak = 0;
                console.log(currentPosture_and_stream.Posture);
            }
        }
    }

    // finally draw the poses
    drawPose(pose);
}

function drawPose(pose) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
        const minPartConfidence = 0.5;
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx);
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx);
    }
}

try {
    let started = true;
    window.SpeechRecognition =
        window.webkitSpeechRecognition || window.SpeechRecognition;
    let finalTranscript = "";
    let recognition = new window.SpeechRecognition();
    recognition.interimResults = true;
    recognition.maxAlternatives = 10;
    recognition.continuous = true;
    recognition.onresult = event => {
        let interimTranscript = "";
        for (
            let i = event.resultIndex, len = event.results.length;
            i < len;
            i++
        ) {
            let transcript = event.results[i][0].transcript;
            if (transcript.includes("start exercises")) {
                if (started) {
                    started = false;
                    init(0);

                    console.log("Start Exercises");
                    // Removes the div with the 'div-02' id}}
                }
            }
            if (event.results[i].isFinal) {
                finalTranscript += transcript;
            } else {
                interimTranscript += transcript;
            }
        }
        speech.innerHTML =
            '<i style="color:#ddd;">' + interimTranscript + "</>";
        // finalTranscript + '<i style="color:#ddd;">' + interimTranscript + "</>";
    };
    recognition.start();
} catch (err) {
    alert(
        "Unfortunatley this Browser/OS combination is unsupported. For best results use Google Chrome on Desktop or Android"
    );
}
