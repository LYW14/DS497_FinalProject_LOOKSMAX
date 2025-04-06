# DS497_FinalProject_LOOKSMAX
Group final project repo for BU CDS DS497 Data Science of the Mind.

# Overview
This project intends to collect user opinions on attractiveness of a person based on an image of their face. This will be collected in two ways:

Rating: Users rate the attractiveness of the person using a slider range.

Short explanation: Users select choices for why they find the person attractive, with an option to specify "Other" in a text input box.

The experiment uses jsPsych (a JavaScript library for creating behavioral experiments) to manage the timeline and data collection.

# Features
Image Display: Users are presented with an AI generated image (TBD).

Slider range: A slider allows users to rate the attractiveness of the person on a scale from 0 to 100, with a step of 10.

Multi-Select: A list of checkboxes allows users to select reasons why they find the person attractive.

Textbox: If a user selects "Other" as a reason, they are shown a text box to specify their answer (with a 100-character limit).

Data Collection: The collected data, including slider values and multi-select choices, is saved into a CSV file for analysis using DataPipe.
