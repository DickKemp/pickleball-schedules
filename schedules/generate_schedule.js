const myscheduleData = [
    {
        "num_players": 13,
        "schedule": [
            {
                "playing": [
                    [
                        11,
                        12,
                        2,
                        7
                    ],
                    [
                        13,
                        1,
                        4,
                        3
                    ],
                    [
                        6,
                        10,
                        5,
                        9
                    ]
                ],
                "sitting": [
                    8
                ]
            },
            {
                "playing": [
                    [
                        12,
                        13,
                        9,
                        1
                    ],
                    [
                        8,
                        3,
                        7,
                        6
                    ],
                    [
                        4,
                        10,
                        11,
                        2
                    ]
                ],
                "sitting": [
                    5
                ]
            },
            {
                "playing": [
                    [
                        13,
                        8,
                        10,
                        2
                    ],
                    [
                        4,
                        5,
                        3,
                        9
                    ],
                    [
                        1,
                        12,
                        6,
                        11
                    ]
                ],
                "sitting": [
                    7
                ]
            },
            {
                "playing": [
                    [
                        1,
                        3,
                        8,
                        9
                    ],
                    [
                        13,
                        10,
                        7,
                        12
                    ],
                    [
                        5,
                        6,
                        11,
                        4
                    ]
                ],
                "sitting": [
                    2
                ]
            },
            {
                "playing": [
                    [
                        10,
                        7,
                        6,
                        4
                    ],
                    [
                        5,
                        3,
                        12,
                        2
                    ],
                    [
                        8,
                        11,
                        9,
                        13
                    ]
                ],
                "sitting": [
                    1
                ]
            }
        ]
    },
    {
        "num_players": 14,
        "schedule": [
            {
                "playing": [
                    [
                        12,
                        14,
                        5,
                        6
                    ],
                    [
                        9,
                        8,
                        11,
                        4
                    ],
                    [
                        7,
                        13,
                        2,
                        1
                    ]
                ],
                "sitting": [
                    3,
                    10
                ]
            },
            {
                "playing": [
                    [
                        4,
                        8,
                        13,
                        3
                    ],
                    [
                        6,
                        12,
                        9,
                        7
                    ],
                    [
                        14,
                        10,
                        1,
                        11
                    ]
                ],
                "sitting": [
                    2,
                    5
                ]
            },
            {
                "playing": [
                    [
                        6,
                        4,
                        5,
                        11
                    ],
                    [
                        10,
                        1,
                        3,
                        2
                    ],
                    [
                        8,
                        14,
                        7,
                        12
                    ]
                ],
                "sitting": [
                    13,
                    9
                ]
            },
            {
                "playing": [
                    [
                        13,
                        1,
                        5,
                        12
                    ],
                    [
                        10,
                        4,
                        6,
                        7
                    ],
                    [
                        3,
                        14,
                        9,
                        2
                    ]
                ],
                "sitting": [
                    8,
                    11
                ]
            },
            {
                "playing": [
                    [
                        10,
                        2,
                        9,
                        12
                    ],
                    [
                        13,
                        8,
                        6,
                        14
                    ],
                    [
                        5,
                        3,
                        11,
                        7
                    ]
                ],
                "sitting": [
                    1,
                    4
                ]
            }
        ]
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
    // renderSchedule(myscheduleData);
