const myscheduleData = [
    {
            "playing": [
                [2, 8, 16, 12],
                [13, 4, 10, 1],
                [7, 3, 6, 14],
                [9, 11, 5, 17]
            ],
            "sitting": [15]
        },
        {
            "playing": [
                [5, 1, 7, 12],
                [3, 10, 16, 9],
                [13, 15, 4, 17],
                [8, 11, 2, 6]
            ],
            "sitting": [14]
        },
        {
            "playing": [
                [10, 13, 5, 2],
                [17, 12, 6, 16],
                [3, 14, 4, 8],
                [7, 1, 9, 15]
            ],
            "sitting": [11]
        },
        {
            "playing": [
                [2, 8, 16, 12],
                [13, 4, 10, 1],
                [7, 3, 6, 14],
                [9, 11, 5, 17]
            ],
            "sitting": [15]
        },
        {
            "playing": [
                [5, 1, 7, 12],
                [3, 10, 16, 9],
                [13, 15, 4, 17],
                [8, 11, 2, 6]
            ],
            "sitting": [14]
        }
    ];

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
        let html = '';
        // if (roundNumber === 1) {
        //     html += '<H2>17 players</H2>';
        // }
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
        renderSchedule2(scheduleDiv, data);
        renderSchedule2(scheduleDiv, data);
    }
    function renderSchedule2(scheduleDiv, data) {
        scheduleDiv.innerHTML += '<H2>17 players</H2>';
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

    renderSchedule(myscheduleData);
    