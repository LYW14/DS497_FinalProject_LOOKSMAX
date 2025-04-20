# DS 497 - LOOKSMAX Project Code|
# Author: Max Schultz           |
#_______________________________|
library(tidyverse)
zip <- "497dataperception.zip"
file_list <- unzip(zip, list = T)$Name
col_spec <- cols(
  response = col_character(),
  .default = col_guess()
)
all_data <- map_dfr(file_list, ~ read_csv(unz(zip, .x), col_types = col_spec))
head(all_data)

# cleaning the stimulus column to just extract the face ids
all_data<- all_data %>% 
  mutate(stimulus = str_extract(stimulus, "face_\\d+\\.png"))
names(all_data)

df <- all_data %>%
  mutate(participant_id = cumsum(lag(trial_index, default = 0) == 9 & trial_index == 0))
df_clean <- df %>%
  group_by(participant_id, trial_index) %>%
  summarise(
    attractiveness_rating = na.omit(attractiveness_rating)[1],
    stimulus = str_extract(na.omit(stimulus)[1], "face_\\d+\\.png"),
    response = na.omit(response)[1],
    reasons_selected = na.omit(reasons_selected)[1],
    other_reason_text = na.omit(other_reason_text)[1],
    rt = na.omit(rt)[1],
    time_elapsed = na.omit(time_elapsed)[1],
    .groups = "drop"
  )

head(df_clean)

write.csv(df_clean, file='cleaned_497_data.csv')




