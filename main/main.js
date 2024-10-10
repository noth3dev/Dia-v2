        let slideIndex = 0;
            const slides = document.querySelectorAll('.slides');
            const slideWrapper = document.getElementById('slideWrapper');
            const totalSlides = slides.length;
        
        function showSlide(n) {
            slideIndex = n;
            slideWrapper.style.transform = `translateX(-${slideIndex * 100}%)`;
            updateMenu(n);
        }

        
        function updateMenu(n) {
            const menuItems = document.querySelectorAll('.menu-item');
            menuItems.forEach((item, index) => {
                if (index === n) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            });
        }

        
        function randomGreeting() {
            const greetings = ["Hello world", "i wanna go home", "i wanna eat ramen", "Greetings", "Dimigo Out", "반갑노 게이야"];
            const randomIndex = Math.floor(Math.random() * greetings.length);
            return greetings[randomIndex];
        }

        
        document.getElementById('greeting').textContent = randomGreeting();

        
        updateMenu(0);

        
        
// 한국 날짜 가져오는 함수
function getKoreaDate() {
    const currentDate = new Date();
    const utc = currentDate.getTime() + (currentDate.getTimezoneOffset() * 60000); // UTC 시간
    const koreaTimeOffset = 9 * 60 * 60000; // 한국 시간으로 변환 (UTC+9)
    return new Date(utc + koreaTimeOffset); // 한국 시간 반환
}

// API에서 급식 데이터를 가져오는 함수
function fetchMealData(date) {
    const formattedDate = date.toISOString().split('T')[0]; // 날짜를 'YYYY-MM-DD' 형식으로 변환
    const url = `https://api.디미고급식.com/meal/${formattedDate}`;

    console.log(`Fetching meal data for date: ${formattedDate}`);

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayMealData(data); 
        })
        .catch(error => console.error('Error fetching meal data:', error));
}

function searchMenu(menuItem) {
    const query = menuItem.textContent.trim();
    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(query)}`; 
    window.open(searchUrl, '_blank'); 
}

function addSearchFunctionality() {
    const mealItems = document.querySelectorAll('.meal-card ul li'); 

    console.log("선택된 급식 메뉴 항목 수: ", mealItems.length); 

    mealItems.forEach(item => {
        item.style.cursor = 'pointer'; 
        item.addEventListener('click', function () {
            searchMenu(item); 
        });
    });
}

function displayMealData(mealData) {
    const breakfastElement = document.getElementById('breakfast');
    const lunchElement = document.getElementById('lunch');
    const dinnerElement = document.getElementById('dinner');

    function createMealList(mealString) {
        if (!mealString || mealString.trim() === "") {
            return '<li>Data unavailable</li>';
        }
        return mealString.split('/').map(item => `<li>${item.trim()}</li>`).join('');
    }
    breakfastElement.innerHTML = createMealList(mealData.breakfast);
    lunchElement.innerHTML = createMealList(mealData.lunch);
    dinnerElement.innerHTML = createMealList(mealData.dinner);

    const mealDateElement = document.getElementById('mealDate');
    const date = new Date(mealData.date);
    const daysOfWeek = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
    mealDateElement.textContent = `${mealData.date} (${daysOfWeek[date.getDay()]})`;
    addSearchFunctionality();

    updateTodayMealButton();
}
function updateTodayMealButton() {
    const todayMealButton = document.getElementById('todayMealButton');
    const todayDate = getKoreaDate(); 
    if (currentDate.toDateString() !== todayDate.toDateString()) {
        todayMealButton.style.display = 'inline-block'; 
    } else {
        todayMealButton.style.display = 'none';
    }
}

function showTodayMeal() {
    currentDate = new Date(todayDate);
    fetchMealData(currentDate);
    updateTodayMealButton(); 
}

let currentDate = getKoreaDate();
const todayDate = new Date(currentDate); 

function changeDate(offset) {
    currentDate.setDate(currentDate.getDate() + offset); 
    fetchMealData(currentDate); 
}

fetchMealData(currentDate);


            const students = [
                "고하은", "권순모", "김규빈", "김무준", "김민찬", 
                "김세준", "김소은", "김재민", "김준원", "마현진", 
                "박현준", "백재원", "여지민", "오민혜", "우리나", 
                "위재우", "유연찬", "유정호", "이강현", "이수안", 
                "이승찬", "이연준", "이은채", "이종화", "임도영", 
                "임형주", "조성빈", "최지원", "강산", "김진교"
            ];


    function resetSeating() {
        const seatingArrangement = document.getElementById('seatingArrangement');

        // Debugging to ensure the element is selected properly
        console.log("Seating arrangement element:", seatingArrangement);

        // Clear previous seating layout if any
        seatingArrangement.innerHTML = ''; 
        console.log("Seating arrangement cleared");

        
        for (let i = 0; i < 5; i++) { 
            const row = document.createElement('div');
            row.classList.add('row');
            console.log(`Created row ${i + 1}`);

            for (let j = 0; j < 6; j++) { 
                const cell = document.createElement('div');
                cell.classList.add('cell');
                cell.textContent = '???'; 
                row.appendChild(cell);
                console.log(`Added cell to row ${i + 1}:`, cell);
            }

            seatingArrangement.appendChild(row); 
            console.log(`Appended row ${i + 1} to seating arrangement`);
        }
    }


    function randomizeSeating() {
        resetSeating(); 
        const shuffledStudents = [...students].sort(() => Math.random() - 0.5); 
        const cells = document.querySelectorAll('.cell'); 
        let index = 0;

        
        cells.forEach((cell, idx) => {
            setTimeout(() => {
                if (index < shuffledStudents.length) {
                    cell.textContent = shuffledStudents[index]; 
                    cell.classList.add('reveal'); 
                } else {
                    cell.textContent = '???'; 
                }
                index++;
            }, idx * 300); 
        });
    }


            
            function downloadSeatingArrangement() {
                const canvas = document.getElementById('downloadCanvas');
                const context = canvas.getContext('2d');
                const seatingArrangement = document.getElementById('seatingArrangement');
                const cells = seatingArrangement.getElementsByClassName('cell');

                
                const cellWidth = 80; 
                const cellHeight = 50; 
                const spacing = 10; 
                const rows = 5; 
                const columns = 6; 
                canvas.width = columns * (cellWidth + spacing) - spacing; 
                canvas.height = rows * (cellHeight + spacing) - spacing; 

                
                for (let i = 0; i < rows; i++) {
                    for (let j = 0; j < columns; j++) {
                        const index = (rows - 1 - i) * columns + (columns - 1 - j); 

                        
                        const xPos = j * (cellWidth + spacing);
                        const yPos = i * (cellHeight + spacing);

                        
                        context.fillStyle = 'white'; 
                        context.fillRect(xPos, yPos, cellWidth, cellHeight);

                        
                        const studentName = cells[index].textContent === '???' ? '???' : cells[index].textContent;

                        
                        context.fillStyle = 'black'; 
                        context.font = 'bold 18px pretendard';
                        context.textAlign = 'center';
                        context.textBaseline = 'middle';
                        context.fillText(studentName, xPos + (cellWidth / 2), yPos + (cellHeight / 2));
                    }
                }

                
                const link = document.createElement('a');
                link.download = 'seating_arrangement_flipped.png';
                link.href = canvas.toDataURL();
                link.click();
            }

            function randomizeCleaning() {
        const shuffledStudents = students.sort(() => Math.random() - 0.5); 

        
        document.getElementById('group1_student1').textContent = shuffledStudents[0];
        document.getElementById('group1_student2').textContent = shuffledStudents[1];

        document.getElementById('group2_student1').textContent = shuffledStudents[2];
        document.getElementById('group2_student2').textContent = shuffledStudents[3];

        document.getElementById('group3_student1').textContent = shuffledStudents[4];
        document.getElementById('group3_student2').textContent = shuffledStudents[5];

        document.getElementById('group4_student1').textContent = shuffledStudents[6];
        document.getElementById('group5_student1').textContent = shuffledStudents[7];
        document.getElementById('group6_student1').textContent = shuffledStudents[8];
        document.getElementById('group7_student1').textContent = shuffledStudents[9];

        
        document.getElementById('group8_student1').textContent = shuffledStudents[10];
        document.getElementById('group8_student2').textContent = shuffledStudents[11];
        document.getElementById('group8_student3').textContent = shuffledStudents[12];

        document.getElementById('group9_student1').textContent = shuffledStudents[13];
        document.getElementById('group9_student2').textContent = shuffledStudents[14];
        document.getElementById('group9_student3').textContent = shuffledStudents[15];

        
        document.getElementById('group10_student1').textContent = shuffledStudents[16];
        document.getElementById('group11_student1').textContent = shuffledStudents[17];

        
        document.getElementById('group12_student1').textContent = shuffledStudents[18];
        document.getElementById('group12_student2').textContent = shuffledStudents[19];
        document.getElementById('group12_student3').textContent = shuffledStudents[20];
        document.getElementById('group12_student4').textContent = shuffledStudents[21];

        
        document.getElementById('group13_student1').textContent = shuffledStudents[22];

        
        document.getElementById('group14_student1').textContent = shuffledStudents[23];
        document.getElementById('group15_student1').textContent = shuffledStudents[24];
        document.getElementById('group16_student1').textContent = shuffledStudents[25];
        document.getElementById('group17_student1').textContent = shuffledStudents[26];
    }

    
    function downloadCleaningTable() {
        const table = document.querySelector("#cleaningTable"); 
        html2canvas(table).then(canvas => {
            const link = document.createElement('a');
            link.download = 'cleaning_schedule.png'; 
            link.href = canvas.toDataURL('image/png'); 
            link.click(); 
        });
    }

    document.getElementById('randomizeButton').addEventListener('click', randomizeSeating);
            document.getElementById('downloadButton').addEventListener('click', downloadSeatingArrangement);
            document.getElementById('randomizeCleaningButton').addEventListener('click', randomizeCleaning);
    document.getElementById('downloadCleaningButton').addEventListener('click', downloadCleaningTable); 
    

    let events = {
        '2024-10-09': [{ name: '수학 시험', period: 2 }, { name: '과학 실험', period: 4 }],
        '2024-10-10': [{ name: '영어 시험', period: 1 }],
        '2024-10-11': [{ name: '사회 수행평가', period: 3 }],
        '2024-10-13': [{ name: '체육 대회', period: 5 }],
        '2024-10-16': [{ name: '수학 수행평가', period: 2 }],
        '2024-10-18': [{ name: '영어 말하기 평가', period: 3 }]
    };

    
    function renderWeeklyCalendar(events) {
        const daysOfWeek = ['mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun'];
        const currentDate = new Date();
        const startOfWeek = new Date(currentDate.setDate(currentDate.getDate() - currentDate.getDay() + 1)); 

        daysOfWeek.forEach((day, index) => {
            const dayElement = document.getElementById(day);
            const currentDay = new Date(startOfWeek);
            currentDay.setDate(startOfWeek.getDate() + index);

            const dateText = `${currentDay.getDate()}일`; 
            dayElement.innerHTML = `<div class="date">${dateText}</div>`;

            
            const eventDate = currentDay.toISOString().split('T')[0]; 
            const eventsForDay = events[eventDate]; 

            if (eventsForDay && eventsForDay.length > 0) {
                
                eventsForDay.sort((a, b) => a.period - b.period);

                const eventList = document.createElement('ul');
                eventsForDay.forEach(event => {
                    const eventItem = document.createElement('li');
                    eventItem.classList.add('event');
                    eventItem.textContent = `${event.name} (${event.period}교시)`; 
                    eventList.appendChild(eventItem);
                });
                dayElement.appendChild(eventList); 
            }
        });
    }

    
    function getNextWeekEvents(events) {
        const nextWeekEvents = [];
        const currentDate = new Date();
        const nextWeekStart = new Date(currentDate.setDate(currentDate.getDate() + (7 - currentDate.getDay()))); 
        
        Object.keys(events).forEach(eventDate => {
            const eventDateObj = new Date(eventDate);
            if (eventDateObj >= nextWeekStart && eventDateObj < new Date(nextWeekStart.getTime() + 7 * 24 * 60 * 60 * 1000)) {
                
                events[eventDate].forEach(event => {
                    nextWeekEvents.push({ date: eventDate, name: event.name, period: event.period });
                });
            }
        });
        return nextWeekEvents;
    }

    
    function displayNextWeekTests(nextWeekEvents) {
        const nextWeekTestsElement = document.getElementById('nextWeekTests');
        nextWeekTestsElement.textContent = `다음주에 수행평가가 ${nextWeekEvents.length}개 있습니다.`;

        nextWeekTestsElement.addEventListener('mouseover', function() {
            let hoverText = nextWeekEvents.map(event => {
                const date = new Date(event.date);
                const dayOfWeek = ['일', '월', '화', '수', '목', '금', '토'][date.getDay()];
                return `${dayOfWeek}요일: ${event.name} (${event.period}교시)`;
            }).join('\n');

            nextWeekTestsElement.style.transition = 'all 0.5s ease'; 
            nextWeekTestsElement.innerText = hoverText;
        });

        nextWeekTestsElement.addEventListener('mouseout', function() {
            nextWeekTestsElement.innerText = `다음주에 수행평가가 ${nextWeekEvents.length}개 있습니다.`;
        });
    }

function showSlide(index) {
    const slides = document.querySelectorAll('.slides');
    const menuItems = document.querySelectorAll('.menu-item');
    
    slides.forEach((slide, i) => {
        if (i === index) {
            slide.style.display = 'block';
        } else {
            slide.style.display = 'none';
        }
    });
    menuItems.forEach((item, i) => {
        if (i === index) {
            item.classList.add('active'); 
        } else {
            item.classList.remove('active');
        }
    });
}

// 키보드 입력에 따른 슬라이드 전환 이벤트 리스너
document.addEventListener('keydown', function(event) {
    const activeElement = document.activeElement;
    const isTextInput = activeElement.tagName === 'INPUT' || activeElement.tagName === 'TEXTAREA';

    if (isTextInput) {
        return;
    }

    switch (event.key) {
        case '1':
            showSlide(0); // 첫 번째 슬라이드
            break;
        case '2':
            showSlide(1); // 두 번째 슬라이드
            break;
        case '3':
            showSlide(2); // 세 번째 슬라이드
            break;
        case '4':
            showSlide(3); // 네 번째 슬라이드
            break;
        case '5':
            showSlide(4); // 다섯 번째 슬라이드
            break;
        case '6':
            showSlide(5); // 여섯 번째 슬라이드
            break;
    }
});

    
    document.addEventListener('DOMContentLoaded', function () {
        renderWeeklyCalendar(events); 
        const nextWeekEvents = getNextWeekEvents(events); 
        displayNextWeekTests(nextWeekEvents); 
    });



document.getElementById('logoutButton').addEventListener('click', function() {
    alert("You have logged out!"); 
    
});


document.getElementById('gameButton').addEventListener('click', function() {
    showSlide(6); 
});

let tokens = 10000; 
const tokenDisplay = document.getElementById('tokenCount');
const gameResult = document.getElementById('gameResult');
const rollingNumberDisplay = document.getElementById('rollingNumber');
const betButtons = document.querySelectorAll('.game-container button'); 
const tokenRankingDisplay = document.getElementById('tokenRanking');


const players = [
    { name: 'Player 1', tokens: 150 },
    { name: 'Player 2', tokens: 200 },
    { name: 'Player 3', tokens: 180 },
    { name: 'You', tokens: tokens } 
];


function updateTokenDisplay() {
    tokenDisplay.textContent = tokens;
}


function updateTokenRanking() {
    
    players.find(player => player.name === 'You').tokens = tokens;

    
    players.sort((a, b) => b.tokens - a.tokens);

    
    tokenRankingDisplay.innerHTML = '';
    players.forEach((player, index) => {
        const listItem = document.createElement('li');
        listItem.textContent = `${player.name}: ${player.tokens} 토큰`;
        tokenRankingDisplay.appendChild(listItem);
    });
}


function rollNumber(finalNumber) {
    let currentNumber = 0;
    const rollInterval = setInterval(() => {
        currentNumber = Math.floor(Math.random() * 100) + 1; 
        rollingNumberDisplay.textContent = String(currentNumber).padStart(2, '0'); 
    }, 50); 

    
    setTimeout(() => {
        clearInterval(rollInterval); 
        rollingNumberDisplay.textContent = String(finalNumber).padStart(2, '0'); 
        enableButtons(); 
    }, 2000); 
}


function disableButtons() {
    betButtons.forEach(button => {
        button.disabled = true; 
        button.style.opacity = "0.6"; 
        button.style.cursor = "not-allowed"; 
    });
}


function enableButtons() {
    betButtons.forEach(button => {
        button.disabled = false; 
        button.style.opacity = "1"; 
        button.style.cursor = "pointer"; 
    });
}


function placeBet(choice) {
    const betAmount = parseInt(document.getElementById('betAmount').value, 10);

    if (isNaN(betAmount) || betAmount <= 0) {
        gameResult.textContent = "올바른 배팅 금액을 입력하세요.";
        return;
    }

    if (betAmount > tokens) {
        gameResult.textContent = "배팅할 토큰이 부족합니다.";
        return;
    }

    disableButtons();

    const randomNumber = Math.floor(Math.random() * 100) + 1;
    const isEven = randomNumber % 2 === 0;
    const result = isEven ? '짝수' : '홀수';

    rollNumber(randomNumber);
    setTimeout(() => {
        const userWon = (isEven && choice === 'E') || (!isEven && choice === 'H');
        if (userWon) {
            tokens += betAmount;
            gameResult.textContent = `승리! 숫자는 ${randomNumber} (${result})입니다. ${betAmount} 토큰을 얻었습니다!`;
        } else {
            tokens -= betAmount;
            gameResult.textContent = `패배! 숫자는 ${randomNumber} (${result})입니다. ${betAmount} 토큰을 잃었습니다.`;
        }

        updateTokenDisplay(); 
        updateTokenRanking(); 
    }, 2200); 
}

updateTokenDisplay();
updateTokenRanking();

