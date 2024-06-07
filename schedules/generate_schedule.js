    async function fetchScheduleData(url) {
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();

            renderSchedule(data);
        } catch (error) {
            console.error('There has been a problem with your fetch operation:', error);
        }
    } 
    function generateTable(round, roundNumber) {
        html += `<div class="round-title">Round ${roundNumber}</div>`;            
        html += '<table class="round-table">';
        html += `
            <tr>
                <th>Court</th>
                <th>Team 1</th>
                <th>Team 2</th>
            </tr>
        `;
        round.playing.forEach((game, index) => {
            html += `
                <tr>
                    <td>Court ${index + 1}</td>
                    <td>${game[0]} + ${game[1]}</td>
                    <td>${game[2]} + ${game[3]}</td>
                </tr>
            `;
        });
        html += '</table>';
        html += `<div class="sitting">Sitting: ${round.sitting.join(', ')}</div>`;
        return html;
    }

    function renderSchedule(data) {
        let scheduleDiv = document.getElementById('schedule');
        data.forEach((sched, index) => {
            renderSchedule2(scheduleDiv, sched.num_players, sched.schedule);
        });
    }

    function renderSchedule2(scheduleDiv, num_players, data) {
        scheduleDiv.innerHTML += `<H2>${num_players} Players</H2>`;
        scheduleDiv.innerHTML += `            
                <table class="head-table">
                <tr>
                    <td>Date: </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Day of Week: </td>
                    <td width=60%></td>
                </tr>
                <tr>
                    <td>Time: </td>
                    <td></td>
                </tr>
                <tr>
                    <td>Week #: </td>
                    <td></td>
                </tr>
                </table>
                `;

        data.forEach((round, index) => {
            scheduleDiv.innerHTML += generateTable(round, index + 1);
        });
        scheduleDiv.innerHTML += '<div style="break-after:page"></div>';
    }

    fetchScheduleData("schedule_5.json");
