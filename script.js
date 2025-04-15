// Initialize jsPsych
var jsPsych = initJsPsych();

var imageStimulus = {
    type: jsPsychHtmlKeyboardResponse,
    // stimulus: function() {
    //     var image = jsPsych.timelineVariable('image');
    //     return `<img src="${image}" style="max-width: 100%; max-height: 70vh;" class="touch-responsive">
    //             <p>Press any key or tap the image to proceed.</p>`;
    // },
    on_load: function() {
        // Add touch event listener to the image
        const touchElement = document.querySelector('.touch-responsive');
        if (touchElement) {
            touchElement.addEventListener('touchstart', function() {
                jsPsych.finishTrial();
            });
            // Also add click event for desktop testing of touch functionality
            touchElement.addEventListener('click', function() {
                jsPsych.finishTrial();
            });
        }
    }
};

// Rating Slider for attractiveness
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
    { image: 'generated_faces/face_007.png' },  // Add more image URLs or paths to actual images
    { image: 'generated_faces/face_010.png' },
    { image: 'generated_faces/face_011.png' },
    { image: 'generated_faces/face_013.png' },
    { image: 'generated_faces/face_020.png' },
    { image: 'generated_faces/face_021.png' },
    { image: 'generated_faces/face_029.png' },
    { image: 'generated_faces/face_030.png' },
    { image: 'generated_faces/face_033.png' },
    { image: 'generated_faces/face_039.png' },
    { image: 'generated_faces/face_041.png' },
    { image: 'generated_faces/face_054.png' },
    { image: 'generated_faces/face_057.png' },
    { image: 'generated_faces/face_059.png' },
    { image: 'generated_faces/face_060.png' },
    { image: 'generated_faces/face_061.png' },
    { image: 'generated_faces/face_062.png' },
    { image: 'generated_faces/face_073.png' },
    { image: 'generated_faces/face_076.png' },
    { image: 'generated_faces/face_077.png' },
    { image: 'generated_faces/face_078.png' },
    { image: 'generated_faces/face_079.png' },
    { image: 'generated_faces/face_080.png' },
    { image: 'generated_faces/face_085.png' },
    { image: 'generated_faces/face_092.png' },
    { image: 'generated_faces/face_095.png' },
    { image: 'generated_faces/face_102.png' },
    { image: 'generated_faces/face_103.png' },
    { image: 'generated_faces/face_108.png' },
    { image: 'generated_faces/face_115.png' },
    { image: 'generated_faces/face_117.png' },
    { image: 'generated_faces/face_132.png' },
    { image: 'generated_faces/face_133.png' },
    { image: 'generated_faces/face_136.png' },
    { image: 'generated_faces/face_137.png' },
    { image: 'generated_faces/face_140.png' },
    { image: 'generated_faces/face_146.png' },
    { image: 'generated_faces/face_147.png' },
    { image: 'generated_faces/face_149.png' },
    { image: 'generated_faces/face_151.png' },
    { image: 'generated_faces/face_155.png' },
    { image: 'generated_faces/face_156.png' },
    { image: 'generated_faces/face_160.png' },
    { image: 'generated_faces/face_162.png' },
    { image: 'generated_faces/face_167.png' },
    { image: 'generated_faces/face_174.png' },
    { image: 'generated_faces/face_178.png' },
    { image: 'generated_faces/face_180.png' },
    { image: 'generated_faces/face_184.png' },
    { image: 'generated_faces/face_185.png' },
    { image: 'generated_faces/face_199.png' },
    { image: 'generated_faces/face_200.png' },
    { image: 'generated_faces/face_204.png' },
    { image: 'generated_faces/face_205.png' },
    { image: 'generated_faces/face_217.png' },
    { image: 'generated_faces/face_218.png' },
    { image: 'generated_faces/face_220.png' },
    { image: 'generated_faces/face_230.png' },
    { image: 'generated_faces/face_238.png' },
    { image: 'generated_faces/face_239.png' },
    { image: 'generated_faces/face_241.png' },
    { image: 'generated_faces/face_250.png' },
    { image: 'generated_faces/face_251.png' },
    { image: 'generated_faces/face_255.png' },
    { image: 'generated_faces/face_260.png' },
    { image: 'generated_faces/face_265.png' },
    { image: 'generated_faces/face_270.png' },
    { image: 'generated_faces/face_275.png' },
    { image: 'generated_faces/face_277.png' },
    { image: 'generated_faces/face_283.png' },
    { image: 'generated_faces/face_285.png' },
    { image: 'generated_faces/face_309.png' },
    { image: 'generated_faces/face_313.png' },
    { image: 'generated_faces/face_315.png' },
    { image: 'generated_faces/face_318.png' },
    { image: 'generated_faces/face_320.png' },
    { image: 'generated_faces/face_325.png' },
    { image: 'generated_faces/face_331.png' },
    { image: 'generated_faces/face_333.png' },
    { image: 'generated_faces/face_350.png' },
    { image: 'generated_faces/face_352.png' },
    { image: 'generated_faces/face_353.png' },
    { image: 'generated_faces/face_355.png' },
    { image: 'generated_faces/face_357.png' },
    { image: 'generated_faces/face_358.png' },
    { image: 'generated_faces/face_359.png' },
    { image: 'generated_faces/face_366.png' },
    { image: 'generated_faces/face_372.png' },
    { image: 'generated_faces/face_376.png' },
    { image: 'generated_faces/face_377.png' },
    { image: 'generated_faces/face_378.png' },
    { image: 'generated_faces/face_387.png' },
    { image: 'generated_faces/face_388.png' },
    { image: 'generated_faces/face_390.png' },
    { image: 'generated_faces/face_392.png' },
    { image: 'generated_faces/face_404.png' },
    { image: 'generated_faces/face_408.png' },
    { image: 'generated_faces/face_411.png' },
    { image: 'generated_faces/face_419.png' },
    { image: 'generated_faces/face_420.png' },
    { image: 'generated_faces/face_421.png' },
    { image: 'generated_faces/face_422.png' },
    { image: 'generated_faces/face_423.png' },
    { image: 'generated_faces/face_424.png' },
    { image: 'generated_faces/face_425.png' },
    { image: 'generated_faces/face_431.png' },
    { image: 'generated_faces/face_433.png' },
    { image: 'generated_faces/face_435.png' },
    { image: 'generated_faces/face_438.png' },
    { image: 'generated_faces/face_463.png' },
    { image: 'generated_faces/face_472.png' },
    { image: 'generated_faces/face_473.png' },
],
10);

// Create trials dynamically based on the image files
var judgmentTrials = {
    timeline: [
        imageStimulus,  // Image display
        attractivenessRatingAndReasons // Combined attractiveness rating and reasons
    ],
    timeline_variables: imageFiles.map(function(imageData) {
        return {
            image: imageData.image
        };
    }),
    randomize_order: true // Randomize the image order
};

// mobile dev
document.head.insertAdjacentHTML('beforeend', `
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no">
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 10px;
            max-width: 100%;
            box-sizing: border-box;
            touch-action: manipulation;
        }
        .touch-responsive {
            cursor: pointer;
            -webkit-tap-highlight-color: rgba(0,0,0,0);
        }
        .jspsych-btn {
            touch-action: manipulation;
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
    </style>
`);

// Save the data to a CSV file
var filename = 'Face_Attractiveness_' + Date.now() + '.csv';

var saveData = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "patXCp7HrMNc",
    filename: filename,
    data_string: function() {
        return jsPsych.data.get().csv(); // Convert data to CSV format
    },
    on_finish: function(data) {
        alert('Data saved successfully!');
    }
};

// End trial
const endTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: '<div style="font-size: 24px; text-align: center; margin-top: 40px;">Thank you for participating!<br><br>Tap anywhere or press any key to finish.</div>',
    on_load: function() {
        document.addEventListener('touchstart', function() {
            jsPsych.finishTrial();
        }, {once: true});
        document.addEventListener('click', function() {
            jsPsych.finishTrial();
        }, {once: true});
    }
};

// Run the experiment
jsPsych.run([judgmentTrials, saveData, endTrial]);
