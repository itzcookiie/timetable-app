const days = document.querySelector('.days'),
    hours = document.querySelector('.hours'),
    minutes = document.querySelector('.minutes'),
    seconds = document.querySelector('.seconds');

const secondsInADay = 60 * 60 * 24;
const secondsInAnHour = 60 * 60;
const secondsInAMinute = 60;
let interval;
let stopCountdown = false;

    export function countdown( endTime) {
        const timeNow = Date.now();
        const selectedTime = new Date(endTime);
        const timeDiff = (selectedTime - timeNow) / 1000;
        if(timeDiff <= 0) {
            clearInterval(interval);
            stopCountdown = true;
            return true;
        }
        const daysSince = timeDiff / secondsInADay;
        const timeInDays = parseInt(daysSince);
        const hoursSince = (timeDiff % secondsInADay) / secondsInAnHour;
        const timeInHours = parseInt(hoursSince);
        const minutesSince = ((timeDiff % secondsInADay) % secondsInAnHour) / secondsInAMinute;
        const timeInMinutes = parseInt(minutesSince);
        const secondsSince = (((timeDiff % secondsInADay) % secondsInAnHour) % secondsInAMinute) % secondsInAnHour;
        const timeInSeconds = parseInt(secondsSince);
        days.querySelector('.time').innerText = timeInDays;
        hours.querySelector('.time').innerText = timeInHours;
        minutes.querySelector('.time').innerText = timeInMinutes;
        seconds.querySelector('.time').innerText = timeInSeconds;
    }
