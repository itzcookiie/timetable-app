document.addEventListener('DOMContentLoaded', () => {
    const addBtn = document.getElementById('add'),
    submitBtn = document.getElementById('submit'),
    form = document.querySelector('form');

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
        const slots = document.querySelectorAll('.slot');
        setInterval(() => {
            slots.forEach(pickSlot)
        }, 1000)
    }

    function pickSlot(slot) {
        const startTimeInput = slot.querySelector('input[name="startTime"]')
        const finishTimeInput = slot.querySelector('input[name="finishTime"]')
        const startTime = startTimeInput.valueAsNumber
        console.log(startTime === Date.now())
        if (Date.now() >= startTime) {
            console.log('NOW')
        }
    }
})

// TODO
// Check pickSlot function works when time matches
// Calculate time from startTime to finishTime
// Finish pickSlot functionality - should find the closest activity that is about to start then start timer (timetable app) when it reaches the startTime
// When the time ends for an activity, an incredibly annoying alarm should ring
// When an activity is in session, make the background go blue or whatever RNG colour
// Screen should only display info about activity, start time, end time and maybe the next activity
// If you click on the screen anywhere the timetable finishes
// You can click the submit button again and it will start up like you never left
