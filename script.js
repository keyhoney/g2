fetch('students.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        const students = {};
        data.forEach(student => {
            const classNum = student["반"];
            const number = student["번호"];
            if (!students[classNum]) {
                students[classNum] = {};
            }
            students[classNum][number] = {
                name: student["이름"],
                photo: student["그림 주소"],
                major: student["희망 학과"],
                career: student["희망 직업"],
                contact: student["본인 연락처"],
                motherContact: student["어머니 연락처"],
                fatherContact: student["아버지 연락처"],
                email: student["이메일 주소"]
            };
        });

        let currentClassNum = null;
        let currentNumber = null;

        // 폼 제출 이벤트 리스너
        document.getElementById('studentForm').addEventListener('submit', function(event) {
            event.preventDefault();

            currentClassNum = document.getElementById('class').value;
            currentNumber = parseInt(document.getElementById('number').value);

            const student = students[currentClassNum]?.[currentNumber];

            const resultDiv = document.getElementById('result');
            if (student) {
                displayStudentInfo(student);
            } else {
                resultDiv.innerHTML = '<p>학생 정보를 찾을 수 없습니다.</p>';
            }
        });

        // 이전 학생 버튼 클릭 이벤트
        document.getElementById('prevStudent').addEventListener('click', function() {
            if (currentNumber > 1) {
                currentNumber--;
                document.getElementById('number').value = currentNumber; // 드롭다운 값 변경
                const student = students[currentClassNum]?.[currentNumber];
                if (student) {
                    displayStudentInfo(student);
                }
            }
        });

        // 이후 학생 버튼 클릭 이벤트
        document.getElementById('nextStudent').addEventListener('click', function() {
            currentNumber++;
            document.getElementById('number').value = currentNumber; // 드롭다운 값 변경
            const student = students[currentClassNum]?.[currentNumber];
            if (student) {
                displayStudentInfo(student);
            }
        });

        // 학생 정보를 화면에 표시하는 함수
        function displayStudentInfo(student) {
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = `
                <h2>${student.name}</h2>
                <img src="${student.photo}" alt="${student.name}" class="student-image" />
                <p>희망 전공: ${student.major}</p>
                <p>희망 진로: ${student.career}</p>
                <p>학생 연락처: ${student.contact}</p>
                <p>어머니 연락처: ${student.motherContact}</p>
                <p>아버지 연락처: ${student.fatherContact}</p>
                <p>이메일 주소: ${student.email}</p>
            `;
        }
    })
    .catch(error => console.error('Error loading the student data:', error));
