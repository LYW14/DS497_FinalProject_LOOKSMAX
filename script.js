// Initialize jsPsych
var jsPsych = initJsPsych();

var imageStimulus = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function() {
        var image = jsPsych.timelineVariable('image');
        return `<img src="${image}" style="max-width: 500px;"><p>Press any key to proceed.</p>`;
    }
};

// Rating Slider for attractiveness
var attractivenessRatingAndReasons = {
    type: jsPsychHtmlButtonResponse,
    stimulus: function() {
        var image = jsPsych.timelineVariable('image');
        return `
            <h2>Rate the attractiveness of the person in the photo.</h2>
            <img src="${image}" alt="Face" style="max-width: 500px;">
            <p>Use the slider to indicate how attractive you find the person.</p>
            <div>
                <input type="range" id="attractiveness-slider" min="0" max="100" step="10" value="50" style="width: 80%;">
            </div>
            <h3>What features based off your rating contributed to their attractiveness? (Select all that apply)</h3>
            <div>
                <label><input type="checkbox" name="reasons" value="Mouth"> Mouth</label><br>
                <label><input type="checkbox" name="reasons" value="Eyes"> Eyes</label><br>
                <label><input type="checkbox" name="reasons" value="Nose"> Nose</label><br>
                <label><input type="checkbox" name="reasons" value="Ears"> Ears</label><br>
                <label><input type="checkbox" name="reasons" value="Jaw"> Jaw</label><br>
                <label><input type="checkbox" name="reasons" value="Hair"> Hair</label><br>
                <label><input type="checkbox" id="other-checkbox" name="reasons" value="Other"> Other</label>
                <div id="other-text-container" style="display: none;">
                    <label for="other-text">Please specify:</label>
                    <input type="text" id="other-text" name="other-text" placeholder="100 character limit" maxLength="100">
                </div>
            </div>
        `;
    },
    choices: ["Next image"],
    button_html: '<button class="jspsych-btn" onclick="captureAttractivenessData()">%choice%</button>',
    on_load: function () {
        const otherCheckbox = document.getElementById("other-checkbox");
        const otherTextContainer = document.getElementById("other-text-container");

        if (otherCheckbox) {
            otherCheckbox.addEventListener("change", function () {
                otherTextContainer.style.display = this.checked ? "block" : "none";
            });
        }
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

// Reasons for attractiveness
// var reasonsForAttractiveness = {
//     type: jsPsychSurveyMultiSelect,
//     questions: [
//         {
//             prompt: "Why do you find this person attractive? (Select all that apply)",
//             options: ["Nice", "Happy", "Sad", "Interesting", "Confident", "Other"],
//             vertical: true,
//             required: true,
//             name: "reasons"
//         }
//     ],
//     data: {
//         trial_id: 'reason_for_attractiveness'
//     }
// };

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
    type: jsPsychHtmlButtonResponse,
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
    stimulus: 'Nothing left to do here.'
};

// Run the experiment
jsPsych.run([judgmentTrials, saveData, endTrial]);


// ------------------- Event listeners 

