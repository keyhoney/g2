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

        let currentIndex = -1; // 현재 학생 인덱스
        const studentOrder = []; // 학생 정보를 저장할 배열

        // 폼 제출 이벤트 리스너
        document.getElementById('studentForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const classNum = document.getElementById('class').value;
            const number = document.getElementById('number').value;

            const student = students[classNum]?.[number];

            const resultDiv = document.getElementById('result');
            const prevButton = document.getElementById('prevStudent');
            const nextButton = document.getElementById('nextStudent');

            if (student) {
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

                // 학생 정보를 배열에 저장
                studentOrder.push(student);
                currentIndex = studentOrder.length - 1;

                // 버튼 표시
                prevButton.style.display = currentIndex > 0 ? 'block' : 'none';
                nextButton.style.display = 'none'; // '이후' 버튼은 처음에는 숨김
            } else {
                resultDiv.innerHTML = '<p>학생 정보를 찾을 수 없습니다.</p>';
                prevButton.style.display = 'none';
                nextButton.style.display = 'none';
            }
        });

        // 이전 학생 버튼 클릭 이벤트
        document.getElementById('prevStudent').addEventListener('click', function() {
            if (currentIndex > 0) {
                currentIndex--;
                const prevStudent = studentOrder[currentIndex];
                displayStudentInfo(prevStudent);
                this.style.display = currentIndex > 0 ? 'block' : 'none';
                document.getElementById('nextStudent').style.display = 'block'; // '이후' 버튼은 항상 표시
            }
        });

        // 이후 학생 버튼 클릭 이벤트
        document.getElementById('nextStudent').addEventListener('click', function() {
            if (currentIndex < studentOrder.length - 1) {
                currentIndex++;
                const nextStudent = studentOrder[currentIndex];
                displayStudentInfo(nextStudent);
                this.style.display = currentIndex < studentOrder.length - 1 ? 'block' : 'none';
                document.getElementById('prevStudent').style.display = 'block'; // '이전' 버튼은 항상 표시
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
