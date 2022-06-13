# timetable-app

## TODO
- Check pickSlot function works when time matches ✔
- Calculate time from startTime to finishTime ✔
- Finish pickSlot functionality - should find the closest activity that is about to start then start timer (timetable app) when it reaches the startTime ✔
- When the time ends for an activity, an incredibly annoying alarm should ring ✔
- When an activity is in session, make the background go blue or whatever RNG colour ✔
- Screen should only display info about activity, start time, end time and maybe the next activity ✔
- If you click on the screen anywhere the timetable finishes ✔
- You can click the submit button again and it will start up like you never left ✔

- Fill in lesson - add label to HTML so we can add lessons

02/24/2021 

Completed. All that's left is to finish off CSS

- Added drag and drop so I can arrange it in any order I want


### Ideas

#### How the app should work (so I know what parts need to be refactored)
- Create a list of activities with the name and start + finish time
- Once I've created the list, I want to lock them in and be told what my current activity is, what time I started + will finish and how long is left
- If I want to cancel the timetable in progress, I can press esc


#### Features
- Have to fill in all the activity fields (all fields are required)
- Start time of additional activities will be autofilled in based on prev activity finish time