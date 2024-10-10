
        function toggleStatus(element) {
            element.classList.toggle('active');
            if (element.classList.contains('active')) {
                element.textContent = 'Active';
            } else {
                element.textContent = 'Inactive';
            }
        }

        
        let evalData = {
            '2024-10-16': [{ name: '수학 수행평가', period: 2 }],
            '2024-10-20': [{ name: '영어 시험', period: 1 }]
        };

        
        let printQueue = [
            { document: 'Report.pdf', user: '1306 김세준', pages: 5, status: 'Pending' },
            { document: 'I.pdf', user: '1320 유정화', pages: 2, status: 'Pending' }
        ];

        let printLog = [
            { document: 'Report.pdf', user: '1306 김세준', pages: 5, Type: 'Print' },
            { document: 'Repordt.pdf', user: '1306 김세준', pages: 5, Type: 'Print' },
            { document: '-', user: '1320 유정화', pages: 2, Type: 'Copy' }
        ];

        
        
        function rendersuhangs() {
            const evalTable = document.getElementById('evalTableBody');
            evalTable.innerHTML = ''; // 테이블 초기화

            const dates = Object.keys(evalData).sort();
            dates.forEach(date => {
                evalData[date].forEach((suhang, index) => {
                    const row = `<tr>
                        <td>${date}</td>
                        <td><input type="text" value="${suhang.name}" onchange="updateEval('${date}', ${index}, 'name', this.value)"></td>
                        <td><input type="number" value="${suhang.period}" onchange="updateEval('${date}', ${index}, 'period', this.value)"></td>
                        <td><button class="button" onclick="deleteEval('${date}', ${index})">Delete</button></td>
                    </tr>`;
                    evalTable.innerHTML += row;
                });
            });
        }

        // 평가 수정
        function updateEval(date, index, field, value) {
            evalData[date][index][field] = value;
        }

        // 평가 삭제
        function deleteEval(date, index) {
            evalData[date].splice(index, 1);
            if (evalData[date].length === 0) delete evalData[date];
            rendersuhangs();
        }

        // 평가 추가
        function addsuhang() {
            const date = document.getElementById('evalDate').value;
            const name = document.getElementById('evalName').value;
            const period = document.getElementById('evalPeriod').value;

            if (!evalData[date]) evalData[date] = [];
            evalData[date].push({ name, period });
            rendersuhangs();
        }

        // 프린트 대기열 렌더링
        function renderPrintQueue() {
            const printQueueTable = document.getElementById('printQueueBody');
            printQueueTable.innerHTML = '';

            printQueue.forEach((printJob, index) => {
                const row = `<tr>
                    <td>${printJob.document}</td>
                    <td>${printJob.user}</td>
                    <td>${printJob.pages}</td>
                    <td>${printJob.status}</td>
                    <td><button class="button" onclick="cancelPrint(${index})">Cancel</button></td>
                </tr>`;
                printQueueTable.innerHTML += row;
            });
        }

// 프린트 로그 렌더링
function renderPrintLogs() {
    const printLogsTable = document.getElementById('printLogsBody');
    printLogsTable.innerHTML = '';

    printLog.forEach(log => {
        const row = `<tr>
            <td>${log.document}</td>
            <td>${log.user}</td>
            <td>${log.pages}</td>
            <td>${log.Type}</td>
        </tr>`;
        printLogsTable.innerHTML += row;
    });
}

        
        function cancelPrint(index) {
            printQueue.splice(index, 1); 
            renderPrintQueue();
        }

        
        window.onload = function() {
    rendersuhangs();
    renderPrintQueue();
    renderPrintLogs(); 
}



function exportCostData() {
    const pricePerPage = document.getElementById('pricePerPage').value; 
    const userPrintData = {};

    
    printLog.forEach(log => {
        if (!userPrintData[log.user]) {
            userPrintData[log.user] = { totalPages: 0, totalCost: 0 };
        }
        userPrintData[log.user].totalPages += log.pages;
        userPrintData[log.user].totalCost = userPrintData[log.user].totalPages * pricePerPage;
    });

    
    const exportData = Object.keys(userPrintData).map(user => {
        return {
            "User": user,
            "Total Pages": userPrintData[user].totalPages,
            "Total Cost (KRW)": userPrintData[user].totalCost
        };
    });

    
    const worksheet = XLSX.utils.json_to_sheet(exportData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Print Costs");

    
    XLSX.writeFile(workbook, 'print_costs.xlsx');
}
