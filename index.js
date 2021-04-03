import { countdown } from './countdown.js'

document.addEventListener('DOMContentLoaded', () => {

    const addBtn = document.getElementById('add'),
        submitBtn = document.getElementById('submit'),
        form = document.querySelector('form'),
        timetableLessonContainer = document.querySelector('.timetable-lesson-container'),
        timetableInfoContainer = document.querySelector('.timetable-info-container'),
        timetableScreen = document.querySelector('.timetable-screen');

    let inSession = false;
    let interval;

    addBtn.addEventListener('click', handleAddBtn);
    submitBtn.addEventListener('click', handleSubmitBtn);

    function handleAddBtn(e) {
        const div = document.createElement('div');
        const slots = document.querySelectorAll('.slot');
        const id = slots.length;
        if(id) {
            slots.forEach((slot,index) => slot.id = index)
        }
        div.classList.add('slot');
        div.id = id;
        div.setAttribute('draggable', true);
        div.innerHTML =
            `
            <div>            
                <label>Lesson:</label>
                <input type="text" name="lesson" />
                <input type="datetime-local" name="startTime" class="datetime"/>
                <input type="datetime-local" name="finishTime" class="datetime"/>
            </div>
            <div class="cross-container"></div>
            `;

        div.addEventListener('dragstart', handleOnDragStart);
        div.addEventListener('dragover', handleOnDragOver);
        div.addEventListener('dragleave', handleDragLeave);
        div.addEventListener('drop', handleOnDrop);

        const crossContainer = div.querySelector('.cross-container');
        crossContainer.addEventListener('click', (e) => document.getElementById(id).remove());

        form.appendChild(div);
    }

    function handleOnDragStart(e) {
        e.dataTransfer.setData("text/plain", e.target.id);
    }

    function handleDragLeave(e) {
        e.target.classList.remove('upper-marker', 'lower-marker');
    }

    function handleOnDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        if(e.target.className === 'slot') {
            const { top, bottom } = e.target.getBoundingClientRect();
            const midPoint = (bottom + top) / 2;
            const { classList } = e.target;
            const { clientY } = e;
            if(clientY > midPoint) {
                classList.add('lower-marker')
                classList.remove('upper-marker');
            } else {
                classList.remove('lower-marker')
                classList.add('upper-marker');
            }
        }
    }

    function handleOnDrop(e) {
        e.preventDefault();
        const id = e.dataTransfer.getData("text/plain");
        const sourceNode = document.getElementById(id);
        const { target, clientY } = e;
        target.classList.remove('upper-marker', 'lower-marker');
        const { top, bottom } = target.getBoundingClientRect();
        const midPoint = (bottom + top) / 2;
        if(clientY > midPoint) {
            target.insertAdjacentElement('afterend', sourceNode);
        } else {
            form.insertBefore(sourceNode, target);
        }

    }

    function handleSubmitBtn(e) {
        inSession = true;
        const nearestSlot = findNearestSlot();
        runCountdown(nearestSlot);
    }

    function findNearestSlot() {
        const slots = document.querySelectorAll('.datetime');
        const slotTimes = [...slots].map(getSlotTime);
        const validSlotTimes = slotTimes.filter(slot => slot.timeDiff > 0);
        return validSlotTimes[0];
    }

    function runCountdown(slot) {
        if(!inSession) return;
        const now = Date.now();
        const lesson = slot.element.parentElement.querySelector('input[name="lesson"]').value;
        const { time } = slot;
        slot.order === 0 ? displayInfo("", now, time) : displayInfo(lesson, now, time);
        countdown(time);
        interval = setInterval(() => {
            if(!inSession) {
                reset();
                return;
            }
            timetableScreen.classList.add('show');
            const slotFinished = countdown(time);
            if(slotFinished) {
                const audio = new Audio("./sounds/annoying_sound.mp3");
                audio.play();
                clearInterval(interval);
                const nextSlot = findNearestSlot();
                runCountdown(nextSlot);
            }
        }, 1000)
    }

    function displayInfo(lesson, startTime, endTime) {
        timetableLessonContainer.classList.add('timetable-lesson');
        timetableLessonContainer.innerHTML =
            `
                <p>Lesson: ${lesson}</p>
            `

        timetableInfoContainer.innerHTML =
            `
                <p class="timetable-start-time">Start time: ${formatTime(startTime)}</p>
                <p class="timetable-end-time">End time: ${formatTime(endTime)}</p>
                
            `
    }

    function formatTime(time) {
        return new Date(time).toLocaleTimeString('en-us', { hour: '2-digit', minute: '2-digit' });
    }

    function getSlotTime(slot, order) {
        const time = slot.value;
        return {
            order,
            time,
            timeDiff: new Date(time).getTime() - Date.now(),
            element: slot
        }
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
