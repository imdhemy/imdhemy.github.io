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

fetch('assets/js/daily-challenge-data.json').
  then(async function(res) {
      const response = await res.json();
      Object.keys(response).forEach(function(item){
          const data = response[item];
          item = item.split('_');
          draw(item[0], item[1], item[2], item[3] + ' Daily Challenge' ,data);
      });
  });

function draw(startDate,endDate, id, label ,data) {
    const days = getDates(
      new Date(Date.parse(startDate)),
      new Date(Date.parse(endDate))
    );
    
    const dailyChallenge = document.getElementById(id).getContext('2d');
    
    new Chart(dailyChallenge, {
        type: 'line',
        data: {
            labels: days,
            datasets: [{
                label: label,
                data: data,
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
}
