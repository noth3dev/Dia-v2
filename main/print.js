
        const blackwhiteBtn = document.getElementById('blackwhite-btn');
        const colorBtn = document.getElementById('color-btn');
        const previewBox = document.createElement('div');
        previewBox.classList.add('preview-box', 'blackwhite', 'portrait', 'a4');
        const dropArea = document.getElementById('drop-area');

        blackwhiteBtn.addEventListener('click', () => {
            blackwhiteBtn.classList.add('active');
            colorBtn.classList.remove('active');
            previewBox.classList.remove('color');
            previewBox.classList.add('blackwhite');
        });
        colorBtn.addEventListener('click', () => {
            colorBtn.classList.add('active');
            blackwhiteBtn.classList.remove('active');
            previewBox.classList.remove('blackwhite');
            previewBox.classList.add('color');
        });

        // const portraitBtn = document.getElementById('portrait-btn');
        // const landscapeBtn = document.getElementById('landscape-btn');
        // portraitBtn.addEventListener('click', () => {
        //     portraitBtn.classList.add('active');
        //     landscapeBtn.classList.remove('active');
        //     previewBox.classList.remove('landscape');
        //     previewBox.classList.add('portrait');
        // });
        // landscapeBtn.addEventListener('click', () => {
        //     landscapeBtn.classList.add('active');
        //     portraitBtn.classList.remove('active');
        //     previewBox.classList.remove('portrait');
        //     previewBox.classList.add('landscape');
        // });

        const a4Btn = document.getElementById('a4-btn');
        const a5Btn = document.getElementById('a5-btn');
        const letterBtn = document.getElementById('letter-btn');
        const legalBtn = document.getElementById('legal-btn');
        a4Btn.addEventListener('click', () => {
            a4Btn.classList.add('active');
            a5Btn.classList.remove('active');
            letterBtn.classList.remove('active');
            legalBtn.classList.remove('active');
            previewBox.classList.remove('a5', 'letter', 'legal');
            previewBox.classList.add('a4');
        });
        a5Btn.addEventListener('click', () => {
            a5Btn.classList.add('active');
            a4Btn.classList.remove('active');
            letterBtn.classList.remove('active');
            legalBtn.classList.remove('active');
            previewBox.classList.remove('a4', 'letter', 'legal');
            previewBox.classList.add('a5');
        });
        letterBtn.addEventListener('click', () => {
            letterBtn.classList.add('active');
            a4Btn.classList.remove('active');
            a5Btn.classList.remove('active');
            legalBtn.classList.remove('active');
            previewBox.classList.remove('a4', 'a5', 'legal');
            previewBox.classList.add('letter');
        });
        legalBtn.addEventListener('click', () => {
            legalBtn.classList.add('active');
            a4Btn.classList.remove('active');
            a5Btn.classList.remove('active');
            letterBtn.classList.remove('active');
            previewBox.classList.remove('a4', 'a5', 'letter');
            previewBox.classList.add('legal');
        });

        const allPagesBtn = document.getElementById('all-pages-btn');
        const selectedPagesBtn = document.getElementById('selected-pages-btn');
        const pageRangeInput = document.getElementById('page-range-input');

        allPagesBtn.addEventListener('click', () => {
            allPagesBtn.classList.add('active');
            selectedPagesBtn.classList.remove('active');
            pageRangeInput.style.display = 'none'; 
        });

        selectedPagesBtn.addEventListener('click', () => {
            selectedPagesBtn.classList.add('active');
            allPagesBtn.classList.remove('active');
            pageRangeInput.style.display = 'inline-block'; 
        });

        const fileInput = document.getElementById('fileInput');
        const filePreview = document.getElementById('file-preview');

        dropArea.addEventListener('dragover', (event) => {
            event.preventDefault();
            dropArea.classList.add('dragging');
        });

        dropArea.addEventListener('dragleave', () => {
            dropArea.classList.remove('dragging');
        });

        dropArea.addEventListener('drop', (event) => {
            event.preventDefault();
            dropArea.classList.remove('dragging');
            const files = event.dataTransfer.files;
            handleFiles(files);
        });

        dropArea.addEventListener('click', () => {
            fileInput.click();
        });

        fileInput.addEventListener('change', (event) => {
            const files = event.target.files;
            handleFiles(files);
        });

        function handleFiles(files) {

            dropArea.innerHTML = '';
            previewBox.textContent = '미리보기';
            dropArea.appendChild(previewBox);

            filePreview.innerHTML = '';
            Array.from(files).forEach(file => {
                const fileName = document.createElement('span');
                fileName.textContent = file.name;
                filePreview.appendChild(fileName);
            });
        }

        const submitBtn = document.getElementById('submit-btn');

    function toggleSubmitButton() {
        if (fileInput.files.length === 0) {
            submitBtn.innerText = '파일 선택 필수';
            submitBtn.disabled = true;
            submitBtn.style.cursor = 'not-allowed'; 
        } else {
            submitBtn.innerText = '프린트 신청';
            submitBtn.disabled = false;
            submitBtn.style.backgroundColor = ''; 
            submitBtn.style.cursor = 'pointer'; 
        }
    }
    function parsePageRange(pageRange) {
    const pages = [];

    pageRange.split(',').forEach(part => {
        if (part.includes('-')) {
            const [start, end] = part.split('-').map(Number);
            for (let i = start; i <= end; i++) {
                pages.push(i);
            }
        } else {
            pages.push(Number(part));
        }
    });

    return pages.join(',');
}

    fileInput.addEventListener('change', () => {
        toggleSubmitButton();
    });

    dropArea.addEventListener('drop', (event) => {
        event.preventDefault();
        dropArea.classList.remove('dragging');
        const files = event.dataTransfer.files;
        handleFiles(files);
        toggleSubmitButton(); 
    });

    toggleSubmitButton();

    submitBtn.addEventListener('click', () => {
    if (fileInput.files.length === 0) {
        return;
    }

    const color = document.querySelector('#blackwhite-btn.active, #color-btn.active').textContent;
    const copy = document.querySelector('#copy-input').value;
    // const direction = document.querySelector('#portrait-btn.active, #landscape-btn.active').textContent;
    const paperSize = document.querySelector('#a4-btn.active, #a5-btn.active, #letter-btn.active, #legal-btn.active').textContent;

    let pageRange = document.querySelector('#all-pages-btn.active') ? '전체' : pageRangeInput.value;

    if (pageRange !== '전체') {
        const vali = /^(\d+(-\d+)?)(,\s*\d+(-\d+)?)*$/gm
        if (!vali.test(pageRange)) {
            alert('페이지 범위 형식을 지켜주세요.')
            return
        }
        pageRange = parsePageRange(pageRange);
    }

    const formData = new FormData();
    for (let i = 0; i < fileInput.files.length; i++) {
        formData.append('files', fileInput.files[i]);
    }

    const requestData = {
        color: color,
        // direction: direction,
        paperSize: paperSize,
        pageRange: pageRange,
        pageCopy: ((!copy || copy < 1 || 10 < copy) ? 1 : copy)
    };

    const jsonRequestData = JSON.stringify(requestData);
    // formData.append('printOptions', new Blob([jsonRequestData], { type: 'application/json' }));
    formData.append('printOptions', jsonRequestData)

    fetch('https://api.dimiprint.site/api/print-request', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        updateButtonStatus(true);  
    })
    .catch(error => {
        updateButtonStatus(false);  
    });
}); 
function updateButtonStatus(success) {
    if (success) {
        submitBtn.innerText = '신청 완료!';
        submitBtn.style.backgroundColor = 'green';  
        submitBtn.style.color = 'white';            
    } else {
        submitBtn.innerText = 'Error';
        submitBtn.style.backgroundColor = 'red';    
        submitBtn.style.color = 'white';            
    }

    setTimeout(() => {
        submitBtn.innerText = '프린트 신청';
        submitBtn.style.backgroundColor = '#007bff';       
        submitBtn.style.color = 'white';          
    }, 3000);
}    