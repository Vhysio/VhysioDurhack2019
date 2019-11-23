// More API functions here:
// https://github.com/googlecreativelab/teachablemachine-community/tree/master/libraries/pose

// the link to your model provided by Teachable Machine export panel
// const URL = "https://teachablemachine.withgoogle.com/models/9o5NXD5r/";   // Lunge
const URL = "https://teachablemachine.withgoogle.com/models/nFctljBl/"; // Back bend
let model, webcam, ctx, labelContainer, maxPredictions;

const STREAK = 10;
const CONFIDENCE_BENCHMARK = 0.5;
var currentPosture_and_stream = { Posture: "Unsure", Streak: 1 };
var lastCall = "Unsure";
var flag = true;
async function init() {
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
}

async function loop(timestamp) {
    webcam.update(); // update the webcam frame

    await predict();
    window.requestAnimationFrame(loop);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function predict() {
    var current_major_pose;
    var current_major_pose_confidence = 0;
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    for (let i = 0; i < maxPredictions; i++) {
        const classPrediction =
            prediction[i].className +
            ": " +
            prediction[i].probability.toFixed(2);
        labelContainer.childNodes[i].innerHTML = classPrediction;

        if (prediction[i].probability > CONFIDENCE_BENCHMARK) {
            if (currentPosture_and_stream.Posture == prediction[i].className) {
                console.log(
                    currentPosture_and_stream.Streak,
                    lastCall,
                    prediction[i].className
                );
                if (currentPosture_and_stream.Streak > STREAK) {
                    if (lastCall != prediction[i].className) {
                        console.log(
                            "Has been " +
                                prediction[i].className +
                                " " +
                                STREAK +
                                " times in a row"
                        );
                        lastCall = prediction[i].className;
                        var msg = new SpeechSynthesisUtterance(
                            prediction[i].className
                        );
                        window.speechSynthesis.speak(msg);
                    } else if (
                        lastCall == "Correct Lunge" ||
                        lastCall == "Correct"
                    ) {
                        if (flag) {
                            var msg = new SpeechSynthesisUtterance(
                                "NEXT STRETCH"
                            );
                            window.speechSynthesis.speak(msg);
                            flag = false;
                        }
                    }
                } else {
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
