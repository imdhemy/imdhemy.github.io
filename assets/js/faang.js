Date.prototype.addDays = function(days) {
    const date = new Date(this.valueOf());
    date.setDate(date.getDate() + days);
    return date;
}

function getDates(startDate, stopDate) {
    const dateArray = [];
    let currentDate = startDate;
    while (currentDate <= stopDate) {
        dateArray.push(new Date (currentDate).toDateString());
        currentDate = currentDate.addDays(1);
    }
    return dateArray;
}

const dailyChallenge = document.getElementById('faang-daily-challenge').getContext('2d');

const days = getDates(new Date(Date.parse('2022-06-01')), new Date().addDays(30));

const durations = [0, 0, 0, 0, 19, 42, 23, 5, 62];

const dailyChallengeChart = new Chart(dailyChallenge, {
    type: 'line',
    data: {
        labels: days,
        datasets: [{
            label: 'June-22 Daily challenge',
            data: durations,
            borderColor: 'rgb(21, 155, 255)'
        }],
    },
    options: {
        scales: {
            yAxes: {
                title: {
                    display: true,
                    text: 'Minutes',
                    font: {size: 16}
                },
                ticks: {precision: 0}
            },
            xAxes: {
                title: {
                    display: true,
                    text: 'Date',
                    font: {size: 16}
                }
            }
        }
    },
});
