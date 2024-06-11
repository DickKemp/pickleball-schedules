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
    function renderSchedule(data) {
        let scheduleDiv = document.getElementById('body_schedule');
        let html = '';
        data.forEach((sched, index) => {
            html = renderSchedule2(html, sched.num_players, sched.schedule);
        });
        scheduleDiv.innerHTML += html;
        console.log(html);
    }

    function renderSchedule2(innerHTML, num_players, data) {
        innerHTML += `<h2 style="text-align: center;">${num_players} Players</h2>`;

        innerHTML += `
        <div class = "container">
        `;
        data.forEach((round, index) => {
            innerHTML += generateTable(round, index + 1);
        });

        innerHTML += `
            <div>
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
            </div>
            `;
            innerHTML += `
            </div>
            `;
            innerHTML += `
            <div class="footer2">Print from here: https://dickkemp.github.io/pickleball-schedules/</div>
            <div class="footer">Code: https://github.com/DickKemp/pickleball-schedules</div>
            `;
            
        innerHTML += '<div style="break-after:page"></div>';
        return innerHTML;
    }

    function generateTable(round, roundNumber) {
        let html = '<div>';
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
        html += '</div>';
        return html;
    }


    fetchScheduleData("schedule_5.json");
