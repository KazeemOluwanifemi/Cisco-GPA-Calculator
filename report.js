window.onload = function () {
  const reportData = JSON.parse(localStorage.getItem('reportData'));
  const reportContainer = document.getElementById('report-container');
  const gpaElement = document.getElementById('gpa');

  if (reportData && reportData.courses.length > 0) {
    const table = document.getElementById('course-table');
    const courseList = document.getElementById('course-list');

    reportData.courses.forEach((course, index) => {
      const row = document.createElement('tr');
      row.innerHTML = `
          <td>${index + 1}</td>
          <td>${course.courseCode}</td>
          <td>${course.unit}</td>
          <td>${course.grade}</td>
        `;
      courseList.appendChild(row);
    });

    // Set the GPA correctly
    gpaElement.textContent = reportData.gpa;

    // Parse the GPA value as a floating-point number
    const gpaValue = parseFloat(reportData.gpa);

    // Provide advice based on the GPA
    provideAdvice(gpaValue);
  } else {
    reportContainer.innerHTML = '<p>No courses found</p>';
  }

  // Report Label
  const name = localStorage.getItem('name');
  const heading = document.createElement('h2');
  heading.textContent = `${name}'s Report`;
  reportContainer.insertBefore(heading, reportContainer.firstChild);

  // Print page button
  const printButton = document.querySelector('.btn-print');
  printButton.addEventListener('click', () => {
    window.print();
  });

  // Function to provide advice based on GPA
  function provideAdvice(gpa) {
    const adviceElement = document.getElementById('advice');

    if (gpa >= 4.50) {
      adviceElement.textContent = 'Congratulations! You are doing exceptionally well.';
      adviceElement.classList.add('excellent');
    } else if (gpa >= 3.50) {
      adviceElement.textContent = 'Great job! You are on track to achieving academic success. Keep it up!';
      adviceElement.classList.add('good');
    } else if (gpa >= 2.50) {
      adviceElement.textContent = 'You are doing well, but there is still room for improvement. Keep pushing yourself!';
      adviceElement.classList.add('average');
    } else if (gpa >= 1.50) {
      adviceElement.textContent = 'You need to work harder to achieve better results. Consider seeking academic assistance.';
      adviceElement.classList.add('poor');
    } else {
      adviceElement.textContent = 'You are not meeting the minimum requirements for academic success. Seek academic assistance immediately!';
      adviceElement.classList.add('bad');
    }
  }
};
