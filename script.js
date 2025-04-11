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
                <input type="range" id="attractiveness-slider" min="0" max="100" step="10" value="50" style="width: 80%;"/>
            </div>
            <h3>Why do you find this person attractive? (Select all that apply)</h3>
            <div>
                <label><input type="checkbox" name="reasons" value="Nice"> Nice</label><br>
                <label><input type="checkbox" name="reasons" value="Happy"> Happy</label><br>
                <label><input type="checkbox" name="reasons" value="Sad"> Sad</label><br>
                <label><input type="checkbox" name="reasons" value="Interesting"> Interesting</label><br>
                <label><input type="checkbox" name="reasons" value="Confident"> Confident</label><br>
                <label><input type="checkbox" name="reasons" value="Other"> Other</label>
                <div id="other-text-container">
                    <label for="other-text">Please specify:</label>
                    <input type="text" id="other-text" name="other-text" placeholder="100 character limit" maxLength="100">
                </div>
            </div>
        `;
    },
    choices: ["Next image"],
    // data: {
    //     trial_id: 'attractiveness_rating',
    //     rating: response
    // },
};

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
var imageFiles = [
    { image: 'generated_faces/face_001.png' },
    { image: 'generated_faces/face_007.png' },  // Add more image URLs or paths to actual images
    { image: 'generated_faces/face_010.png' }
];

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
var filename = 'Face_Attractiveness_Data.csv';

var saveData = {
    type: jsPsychPipe,
    action: "save",
    experiment_id: "xte9VlHVTxVU",
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

on_load = function() {
    // Update slider value dynamically
    document.getElementById("attractiveness-slider").addEventListener("input", function() {
        document.getElementById("slider-value").textContent = this.value;
    });

    // Check if the "Other" checkbox is selected, and show the textbox accordingly
    var otherCheckbox = document.getElementById("other-checkbox");
    var otherTextContainer = document.getElementById("other-text-container");

    // If "Other" checkbox is checked when the page loads, display the text box
    if (otherCheckbox && otherCheckbox.checked) {
        otherTextContainer.style.display = "block";
    }

    // If the user selects "Other", show the textbox
    otherCheckbox.addEventListener("change", function() {
        if (this.checked) {
            otherTextContainer.style.display = "block";
        } else {
            otherTextContainer.style.display = "none";
        }
    });
}