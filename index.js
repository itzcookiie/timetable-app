import { countdown } from './countdown.js'

document.addEventListener('DOMContentLoaded', () => {

    const addBtn = document.getElementById('add'),
        submitBtn = document.getElementById('submit'),
        form = document.querySelector('form'),
        timetableInfo = document.querySelector('.timetable-info'),
        timetableScreen = document.querySelector('.timetable-screen'),
        container = document.querySelector('.container');

    let storedSlots = [];
    let inSession = false;
    let interval;

    addBtn.addEventListener('click', handleAddBtn);
    submitBtn.addEventListener('click', handleSubmitBtn);

    function handleAddBtn(e) {
        const div = document.createElement('div');
        div.classList.add('slot');
        div.innerHTML =
            `
            <input type="datetime-local" name="startTime" class="startTime"/>
            <input type="datetime-local" name="finishTime" class="finishTime"/>
            `;
        form.appendChild(div);
    }

    function handleSubmitBtn(e) {
        inSession = true;
        const nearestSlot = findNearestSlot();
        runCountdown(nearestSlot, true);
    }

    function findNearestSlot() {
        storedSlots = document.querySelectorAll('.slot');
        const slotTimes = [...storedSlots].map(getSlotTimes);
        const formattedSlotTimes = formatSlotTimes(slotTimes);
        const sortedSlotTimes = formattedSlotTimes.sort((a,b) => a.timeDiff - b.timeDiff);
        const validSlotTimes = sortedSlotTimes.filter(slot => slot.timeDiff > 0)
        return validSlotTimes[0];
    }

    function runCountdown(slot, firstRound) {
        if(!inSession) return;
        const now = Date.now();
        if(firstRound) {
            displayInfo('', now, slot.time);
        } else {
            displayInfo('', now, slot.time);
        }
        countdown(slot.time);
        interval = setInterval(() => {
            if(!inSession) {
                reset();
                return;
            }
            timetableScreen.classList.add('show');
            const slotFinished = countdown(slot.time)
            if(slotFinished) {
                const audio = new Audio("./sounds/annoying_sound.mp3");
                audio.play();
                clearInterval(interval);
                const nextSlot = findNearestSlot();
                runCountdown(nextSlot, false)
            }
        }, 1000)
    }

    function displayInfo(lesson, startTime, endTime) {
        timetableInfo.innerHTML =
            `
                <p>Lesson: ${lesson}</p>
                <p>Start time: ${new Date(startTime).toLocaleTimeString()}</p>
                <p>End time: ${new Date(endTime).toLocaleTimeString()}</p>
            `
    }

    function getSlotTimes(slot) {
        const startTimeInput = slot.querySelector('input[name="startTime"]');
        startTimeInput.startTime = true;
        const finishTimeInput = slot.querySelector('input[name="finishTime"]');
        finishTimeInput.startTime = false;
        const startTime = startTimeInput.value;
        const endTime = finishTimeInput.value;
        return [
            {
                time: startTime,
                timeDiff: new Date(startTime).getTime() - Date.now(),
                element: startTimeInput
            },
            {
                time: endTime,
                timeDiff: new Date(endTime).getTime() - Date.now(),
                element: finishTimeInput
            }
        ]
    }

    function formatSlotTimes(slots) {
        return slots.flatMap(slot => slot)
    }

    function reset() {
        clearInterval(interval);
        timetableScreen.classList.remove('show');
    }

    document.addEventListener('click', () => {
        const timeTableScreenShowing = getComputedStyle(timetableScreen).display !== 'none';
        if(timeTableScreenShowing && inSession) {
            inSession = false;
        }
    })
})



// TODO
// Check pickSlot function works when time matches ✔
// Calculate time from startTime to finishTime ✔
// Finish pickSlot functionality - should find the closest activity that is about to start then start timer (timetable app) when it reaches the startTime ✔
// When the time ends for an activity, an incredibly annoying alarm should ring ✔
// When an activity is in session, make the background go blue or whatever RNG colour ✔
// Screen should only display info about activity, start time, end time and maybe the next activity ✔
// If you click on the screen anywhere the timetable finishes ✔
// You can click the submit button again and it will start up like you never left ✔

// Fill in lesson - add label to HTML so we can add lessons
