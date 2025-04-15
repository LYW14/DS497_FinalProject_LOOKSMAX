// Initialize jsPsych
var jsPsych = initJsPsych();

// Modified image stimulus with improved touch handling
var imageStimulus = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        var image = jsPsych.timelineVariable('image');
        return `
            <div id="touch-container" style="width: 100%; height: 80vh; display: flex; flex-direction: column; justify-content: center; align-items: center;">
                <img src="${image}" style="max-width: 100%; max-height: 70vh;">
                <p style="margin-top: 20px;">Press any key or tap anywhere to proceed.</p>
            </div>`;
    },
    on_load: function() {
        // Add touch event listeners to the entire screen
        document.addEventListener('touchend', endTrialOnTouch);
        document.addEventListener('click', endTrialOnTouch);
        
        function endTrialOnTouch(e) {
            e.preventDefault();
            jsPsych.finishTrial();
            // Remove event listeners to prevent multiple triggers
            document.removeEventListener('touchend', endTrialOnTouch);
            document.removeEventListener('click', endTrialOnTouch);
        }
    },
    on_finish: function() {
        // Clean up any remaining event listeners when the trial ends
        document.removeEventListener('touchend', endTrialOnTouch);
        document.removeEventListener('click', endTrialOnTouch);
    }
};

// Rating Slider for attractiveness - keeping the same UI improvements
var attractivenessRatingAndReasons = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() {
        var image = jsPsych.timelineVariable('image');
        return `
            <h2>Rate the attractiveness of the person in the photo.</h2>
            <img src="${image}" alt="Face" style="max-width: 100%; max-height: 40vh;">
            <p>Use the slider to indicate how attractive you find the person.</p>
            <div>
                <input type="range" id="attractiveness-slider" min="0" max="100" step="10" value="50" style="width: 90%; margin: 20px auto;">
            </div>
            <h3>What features contributed to their attractiveness? (Select all that apply)</h3>
            <div style="text-align: left; max-width: 300px; margin: 0 auto;">
                <div class="checkbox-item">
                    <label><input type="checkbox" name="reasons" value="Mouth"> Mouth</label>
                </div>
                <div class="checkbox-item">
                    <label><input type="checkbox" name="reasons" value="Eyes"> Eyes</label>
                </div>
                <div class="checkbox-item">
                    <label><input type="checkbox" name="reasons" value="Nose"> Nose</label>
                </div>
                <div class="checkbox-item">
                    <label><input type="checkbox" name="reasons" value="Ears"> Ears</label>
                </div>
                <div class="checkbox-item">
                    <label><input type="checkbox" name="reasons" value="Jaw"> Jaw</label>
                </div>
                <div class="checkbox-item">
                    <label><input type="checkbox" name="reasons" value="Hair"> Hair</label>
                </div>
                <div class="checkbox-item">
                    <label><input type="checkbox" id="other-checkbox" name="reasons" value="Other"> Other</label>
                </div>
                <div id="other-text-container" style="display: none; margin-top: 10px;">
                    <label for="other-text">Please specify:</label>
                    <input type="text" id="other-text" name="other-text" placeholder="100 character limit" maxLength="100" style="width: 100%;">
                </div>
            </div>
            <style>
                .checkbox-item {
                    margin: 10px 0;
                    font-size: 16px;
                }
                input[type="checkbox"] {
                    width: 20px;
                    height: 20px;
                    vertical-align: middle;
                    margin-right: 10px;
                }
                label {
                    display: flex;
                    align-items: center;
                    padding: 10px 0;
                }
                @media (max-width: 768px) {
                    h2 { font-size: 20px; }
                    h3 { font-size: 18px; }
                    p { font-size: 16px; }
                    .checkbox-item { font-size: 16px; }
                }
            </style>
        `;
    },
    choices: ["Next image"],
    button_html: '<button class="jspsych-btn" style="padding: 12px 24px; font-size: 18px; margin-top: 20px;" onclick="captureAttractivenessData()">%choice%</button>',
    on_load: function () {
        const otherCheckbox = document.getElementById("other-checkbox");
        const otherTextContainer = document.getElementById("other-text-container");

        if (otherCheckbox) {
            otherCheckbox.addEventListener("change", function () {
                otherTextContainer.style.display = this.checked ? "block" : "none";
            });
        }
        
        // Make checkboxes larger and more touch-friendly
        const checkboxes = document.querySelectorAll('input[type="checkbox"]');
        checkboxes.forEach(function(checkbox) {
            checkbox.style.width = '24px';
            checkbox.style.height = '24px';
        });
        
        // Make the checkbox labels more tappable
        const labels = document.querySelectorAll('label');
        labels.forEach(function(label) {
            label.style.cursor = 'pointer';
        });
    }
};

function captureAttractivenessData() {
    const slider = document.getElementById('attractiveness-slider');
    const checked = document.querySelectorAll('input[name="reasons"]:checked');
    const otherText = document.getElementById('other-text');

    const sliderValue = slider ? slider.value : null;
    const reasons = Array.from(checked).map(cb => cb.value);
    const otherReasonText = reasons.includes("Other") && otherText ? otherText.value : "";

    jsPsych.data.write({
        attractiveness_rating: sliderValue,
        reasons_selected: reasons,
        other_reason_text: otherReasonText
    });
}

// Define the timeline variables (set of images)
var imageFiles = jsPsych.randomization.sampleWithoutReplacement([
    { image: 'generated_faces/face_001.png' },
    { image: 'generated_faces/face_007.png' },
    // [... keep all your existing images ...]
    { image: 'generated_faces/face_473.png' },
],
10);

// Create trials dynamically based on the image files
var judgmentTrials = {
    timeline: [
        imageStimulus,
        attractivenessRatingAndReasons
    ],
    timeline_variables: imageFiles.map(function(imageData) {
        return {
            image: imageData.image
        };
    }),
    randomize_order: true
};

// Add viewport meta tag and necessary styles
function addMobileStyles() {
    // Create a style element
    var style = document.createElement('style');
    style.innerHTML = `
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 10px;
            max-width: 100%;
            box-sizing: border-box;
            touch-action: manipulation;
            -webkit-text-size-adjust: 100%;
        }
        input[type="range"] {
            -webkit-appearance: none;
            height: 25px;
            background: #d3d3d3; 
            outline: none;
            border-radius: 12px;
        }
        input[type="range"]::-webkit-slider-thumb {
            -webkit-appearance: none;
            appearance: none;
            width: 35px;
            height: 35px;
            background: #4CAF50;
            cursor: pointer;
            border-radius: 50%;
        }
        .jspsych-btn {
            touch-action: manipulation;
            cursor: pointer;
            font-size: 18px;
            padding: 15px 25px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 5px;
            margin-top: 20px;
        }
        .jspsych-btn:active {
            background-color: #3e8e41;
        }
    `;
    document.head.appendChild(style);
    
    // Add viewport meta tag
    var meta = document.createElement('meta');
    meta.name = 'viewport';
    meta.content = 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no';
    document.head.appendChild(meta);
    
    // Add event listener to prevent unwanted zooming on iOS
    document.addEventListener('gesturestart', function(e) {
        e.preventDefault();
    });
}

// Save the data to a CSV file
var filename = 'Face_Attractiveness_' + Date.now() + '.csv';

var saveData = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "patXCp7HrMNc",
    filename: filename,
    data_string: function() {
        return jsPsych.data.get().csv();
    },
    on_finish: function(data) {
        alert('Data saved successfully!');
    }
};

// End trial with improved touch handling
const endTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size: 24px; text-align: center; margin-top: 40px;">Thank you for participating!<br><br>Tap anywhere or press any key to finish.</div>',
    on_load: function() {
        function finishEndTrial(e) {
            if (e) e.preventDefault();
            jsPsych.finishTrial();
            document.removeEventListener('touchend', finishEndTrial);
            document.removeEventListener('click', finishEndTrial);
        }
        
        document.addEventListener('touchend', finishEndTrial);
        document.addEventListener('click', finishEndTrial);
    }
};

// Initialize mobile styles before running the experiment
var initTrial = {
    type: jsPsychCallFunction,
    func: function() {
        addMobileStyles();
    }
};

// Run the experiment
jsPsych.run([initTrial, judgmentTrials, saveData, endTrial]);