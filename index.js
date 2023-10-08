document.getElementById('login-form').addEventListener('submit', function(event) {
  event.preventDefault();

  var nameInput = document.getElementById('name').value.trim();
  var matricNumberInput = document.getElementById('matric-number').value.trim();
  var departmentInput = document.getElementById('department').value.trim();

  if (nameInput === '' || matricNumberInput === '' || departmentInput === '') {
    alert('Please fill in all the required fields.');
  } else {
    // Clear local storage before setting the new name
    localStorage.clear();
    localStorage.setItem('name', nameInput);
    window.location.href = 'home.html';
  }
});
