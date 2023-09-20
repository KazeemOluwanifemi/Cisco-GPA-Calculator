window.onload = function () {
  const addCourseButton = document.querySelector('.btn-add');
  addCourseButton.addEventListener('click', () => {
    const courseList = document.getElementById('course-list');
    const rowCount = courseList.rows.length;

    const row = courseList.insertRow(rowCount);
    row.innerHTML = `
      <td>${rowCount + 1}</td>
      <td><input type="text" placeholder="Enter Course Code"></td>
      <td><input type="text" placeholder="Enter Unit"></td>

      <td>
        <div class="dropdown">
          <div class="dropwown_select">
            <select name="dropdown_items" id="dropdown_items">
              <option value="selectGrade" selected="selected" class="option" id="selected">Select Grade</option>
              <option value="A" class="option">A</option>
              <option value="B" class="option">B</option>
              <option value="C" class="option">C</option>
              <option value="D" class="option">D</option>
              <option value="F" class="option">F</option>
            </select>
          </div>
        </div>
      </td>

      <td><button class="btn btn-remove">-</button></td>
    `;

    const removeButton = row.querySelector('.btn-remove');
    removeButton.addEventListener('click', () => {
      row.remove();
      updateSerialNumbers();
    });
  });

  const calculateButton = document.querySelector('.btn-calculate');
  calculateButton.addEventListener('click', () => {
    const rows = document.querySelectorAll('#course-list tr');
    let totalUnit = 0;
    let totalGradePoints = 0;

    rows.forEach(row => {
      const unitInput = row.querySelector('input[type="text"][placeholder="Enter Unit"]');
      const gradeSelect = row.querySelector('#dropdown_items');

      const unit = parseFloat(unitInput.value);
      const grade = gradeSelect.value;

      if (!isNaN(unit) && grade !== 'selectGrade') {
        totalUnit += unit;
        totalGradePoints += calculateGradePoints(grade) * unit;
      }
      
    });

    const gpa = (totalGradePoints / totalUnit).toFixed(2);
    document.getElementById('gpa').textContent = gpa;

    document.getElementById('advice-btn').disabled = false;
  });

  function calculateGradePoints(grade) {
    switch (grade.toUpperCase()) {
      case 'A':
        return 5;
      case 'B':
        return 4;
      case 'C':
        return 3;
      case 'D':
        return 2;
      case 'F':
        return 0;
      default:
        return 0;
    }
  }

  const adviceButton = document.getElementById('advice-btn');
  adviceButton.addEventListener('click', () => {
    const gpa = document.getElementById('gpa').textContent;
    localStorage.setItem('gpa', gpa);
    window.location.href = 'advice.html';
  });

  const welcomeMessage = document.getElementById('welcome-message');
  const name = localStorage.getItem('name');
  
  if (name) {
    welcomeMessage.textContent = `Welcome, ${name}`;
  }

  const generateReportButton = document.createElement('button');
  generateReportButton.textContent = 'Generate Report';
  generateReportButton.classList.add('btn');
  generateReportButton.id = 'generate-report';

  const reportContainer = document.getElementById('report-container');
  reportContainer.appendChild(generateReportButton);

  generateReportButton.addEventListener('click', () => {
    const rows = document.querySelectorAll('#course-list tr');
    const courses = [];

    rows.forEach(row => {
      const courseCodeInput = row.querySelector('input[type="text"][placeholder="Enter Course Code"]');
      const unitInput = row.querySelector('input[type="text"][placeholder="Enter Unit"]');
      const gradeSelect = row.querySelector('#dropdown_items');

      const courseCode = courseCodeInput.value.trim();
      const unit = parseFloat(unitInput.value);
      const grade = gradeSelect.value;

      if (courseCode !== '' && !isNaN(unit) && grade !== 'selectGrade') {
        courses.push({
          courseCode: courseCode,
          unit: unit,
          grade: grade
        });
      }
    });

    const reportData = {
      courses: courses,
      gpa: document.getElementById('gpa').textContent
    };

    localStorage.setItem('reportData', JSON.stringify(reportData));
    window.location.href = 'report.html';
  });

  function updateSerialNumbers() {
    const rows = document.querySelectorAll('#course-list tr');
    rows.forEach((row, index) => {
      row.firstElementChild.textContent = index + 1;
    });
  }
};
