document.getElementById('addRow').onclick = addRow;
document.getElementById('calculateGPA').onclick = calculateGPA;
document.getElementById('reset').onclick = resetForm;

function addRow() {
    var formContainer = document.getElementById('formContainer');
    var newRow = document.createElement('div');
    newRow.className = 'subject-row';
    newRow.innerHTML = `
        <input type="text" placeholder="Subject Name">
        <select>
            <option value="">Grade</option>
            <option value="4.0">A</option>
            <option value="3.7">A-</option>
            <option value="3.3">B+</option>
            <option value="3.0">B</option>
            <option value="2.7">B-</option>
            <option value="2.3">C+</option>
            <option value="2.0">C</option>
            <option value="1.7">C-</option>
            <option value="1.3">D+</option>
            <option value="1.0">D</option>
            <option value="0.0">F</option>
        </select>
        <input type="number" placeholder="Credits" min="0">
        <button class="delete-row">X</button>
    `;
    formContainer.appendChild(newRow);
    
    var deleteButton = newRow.getElementsByClassName('delete-row')[0];
    deleteButton.onclick = function() {
        newRow.remove();
    };
}

function calculateGPA() {
    var rows = document.getElementsByClassName('subject-row');
    var totalPoints = 0;
    var totalCredits = 0;

    for (var i = 0; i < rows.length; i++) {
        var gradeSelect = rows[i].getElementsByTagName('select')[0];
        var grade = gradeSelect.value;
        var creditsInput = rows[i].getElementsByTagName('input')[1];
        var credits = creditsInput.value;

        if (grade !== "" && credits > 0) {
            totalPoints += Number(grade) * Number(credits);
            totalCredits += Number(credits);
        }
    }

    var gpa;
    if (totalCredits > 0) {
        gpa = (totalPoints / totalCredits).toFixed(2);
    } else {
        gpa = 'No valid entries to calculate GPA.';
    }

    document.getElementById('result').innerText = `Calculated GPA: ${gpa}`;
}

function resetForm() {
    var rows = document.getElementsByClassName('subject-row');

    for (var i = 0; i < rows.length; i++) {
        rows[i].getElementsByTagName('input')[0].value = ''; // Subject Name
        rows[i].getElementsByTagName('select')[0].value = ''; // Grade
        rows[i].getElementsByTagName('input')[1].value = ''; // Credits
    }
    document.getElementById('result').innerText = '';
}
