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

        // 폼 제출 이벤트 리스너
        document.getElementById('studentForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const classNum = document.getElementById('class').value;
            const number = document.getElementById('number').value;

            const student = students[classNum]?.[number];

            const resultDiv = document.getElementById('result');
            if (student) {
                resultDiv.innerHTML = `
                    <h2>${student.name}</h2>
                    <img src="${student.photo}" alt="${student.name}" />
                    <p>희망 전공: ${student.major}</p>
                    <p>희망 진로: ${student.career}</p>
                    <p>학생 연락처: ${student.contact}</p>
                    <p>어머니 연락처: ${student.motherContact}</p>
                    <p>아버지 연락처: ${student.fatherContact}</p>
                    <p>이메일 주소: ${student.email}</p>
                `;
            } else {
                resultDiv.innerHTML = '<p>학생 정보를 찾을 수 없습니다.</p>';
            }
        });
    })
    .catch(error => console.error('Error loading the student data:', error));
