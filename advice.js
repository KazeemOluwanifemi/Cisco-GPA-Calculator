window.onload = function() {
    // Retrieve the GPA value from localStorage
    const gpa = localStorage.getItem('gpa');
  
    // Check if the GPA value exists
    if (gpa) {
      // Parse the GPA value as a floating-point number
      const gpaValue = parseFloat(gpa);
  
      // Display the GPA on the page
      const gpaElement = document.getElementById('gpa');
      gpaElement.textContent = gpaValue.toFixed(2);
  
      // Provide advice based on the GPA
      provideAdvice(gpaValue);
    } else {
      // GPA value not found in localStorage
      console.error('GPA value not found.');
    }
  
    // Go back to index.html when the button is clicked
    // const goBackBtn = document.getElementById('goBackBtn');
    // goBackBtn.addEventListener('click', () => {
    //   window.location.href = 'index.html';
    // });
  };