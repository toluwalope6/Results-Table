var scoreTable = document.getElementById('tableStyle');
var unsubmittedCountElement = document.getElementById('unsubmittedCount');
var averageRepresentation = 'percent'; // Default representation

var columnCount  = 5;
 
getAverage();

function getAverage() {
    var rows = scoreTable.querySelectorAll('tbody tr');
    rows.forEach(row => {
        if (row.classList.contains('new-row')) {
            // Calculate the average for the new row
            calculateAverageForRow(row);
            // Remove the 'new-row' class so it's not calculated again
            row.classList.remove('new-row');
        } 
        else{
            var sum = 0;
                var count = 0;
                row.querySelectorAll('td:nth-child(n+3)').forEach((cell, index) => {
                    if (index !== columnCount) {
                        var value = parseInt(cell.innerText);
                        if (!isNaN(value)) {
                            sum += value;
                            count++;
                        } else {
                            cell.innerText = ' ';
                            cell.classList.add('unsubmitted');
                        }
                    }
                });
                if (count > 0) {
                    var average = Math.round((sum / count));
                    var finalGradeCell = row.querySelector('.final-grade');
                    finalGradeCell.innerText = convertGrade(average, averageRepresentation);
                    finalGradeCell.classList.toggle('failed-grade', average < 60);
                }
            }
            });
        
    calculateUnsubmittedCount();
}

function toggleAverageRepresentation() {
    var representations = ['percent', 'letter', '4.0'];
    var currentIndex = representations.indexOf(averageRepresentation);
    averageRepresentation = representations[(currentIndex + 1) % representations.length];
    getAverage(); // Recalculate grades based on the new representation
}

function convertGrade(average, representation) {
    if (representation === 'percent') {
        return average + '%';
    } else if (representation === 'letter') {
        if (average >= 93) return 'A';
        else if (average >= 90) return 'A-';
        else if (average >= 87) return 'B+';
        else if (average >= 83) return 'B';
        else if (average >= 80) return 'B-';
        else if (average >= 77) return 'C+';
        else if (average >= 73) return 'C';
        else if (average >= 70) return 'C-';
        else if (average >= 67) return 'D+';
        else if (average >= 63) return 'D';
        else if (average >= 60) return 'D-';
        else return 'F';
    } else if (representation === '4.0') {
        if (average >= 93) return '4.0';
        else if (average >= 90) return '3.7';
        else if (average >= 87) return '3.3';
        else if (average >= 83) return '3.0';
        else if (average >= 80) return '2.7';
        else if (average >= 77) return '2.3';
        else if (average >= 73) return '2.0';
        else if (average >= 70) return '1.7';
        else if (average >= 67) return '1.3';
        else if (average >= 63) return '1.0';
        else if (average >= 60) return '0.7';
        else return '0.0';
    }
}

function addInputListeners() {
    var unsubmittedCells = scoreTable.querySelectorAll('td.unsubmitted');
    unsubmittedCells.forEach(cell => {
        cell.addEventListener('input', function() {
            cell.classList.remove('unsubmitted');
        });
    });
}

function calculateUnsubmittedCount() {
    var unsubmittedCells = scoreTable.querySelectorAll('td.unsubmitted');
    unsubmittedCountElement.innerText = `Unsubmitted Assignments: ${unsubmittedCells.length}`;
}

document.getElementById('addRowButton').addEventListener('click', function() {
    var table = document.getElementById('tableStyle');
    var newRow = table.insertRow(-1);
    var cellCount = table.rows[0].cells.length;

    for(var i = 0; i < cellCount -1; i++)
    {
        // newRow.innerHTML = <td contenteditable='true'></td>;
        var cell = newRow.insertCell();
        cell.contentEditable = true;
        if (i >= 2) {
            cell.classList.add('unsubmitted');
        }
    }
    var finalGradeCell = newRow.insertCell();
    finalGradeCell.classList.add('final-grade');

    newRow.classList.add('new-row');

    addInputListeners(); 
    calculateUnsubmittedCount(); 
    getAverage();
});
function calculateAverageForRow(row) {
    var sum = 0;
    var count = 0;
    var cells = row.querySelectorAll('td:nth-child(n+3)');
    cells.forEach((cell, index) => {
        if (index < cells.length - 1) { 
            var value = parseInt(cell.innerText);
            if (!isNaN(value)) {
                sum += value;
                count++;
            } else {
                cell.innerText = ' ';
                cell.classList.add('unsubmitted');
            }
        }
    });

    if (count > 0) {
        var average = Math.round(sum / count);
        var finalGradeCell = row.querySelector('.final-grade');  
        if (finalGradeCell) {  
            finalGradeCell.innerText = convertGrade(average, averageRepresentation);
            finalGradeCell.classList.toggle('failed-grade', average < 60);
        }
    }
}
var count = 6;
var column = 7;
document.getElementById('addColumnButton').addEventListener('click', function() {
    var table = document.getElementById('tableStyle');
    var headerRow = table.rows[0];
    var newCell = headerRow.insertCell(column);
    newCell.textContent = 'Assignment ' + count;
    count+=1;
    column+=1;
    columnCount+=1;

    var rowCount = table.rows.length;
    for(var i = 1; i < rowCount; i++){
        var newRowCell = table.rows[i].insertCell(7);
        newRowCell.contentEditable = 'true';
        newRowCell.classList.add('unsubmitted'); 

        addInputListeners(); 
    }
});
// document.getElementById('retrieveDataButton').addEventListener('click', function() {
//     var previousTableState = [
//         ['Divine Ikubor', '001', '90', '88', '67', '78', '67', '-', 'A'],
//         ['Trey Davidson', '002', '', '', '', '', '', '-', '-'],
//         ['John Benson', '003', '', '', '', '', '', '-', '-'],
//         ['Katie Thompson', '004', '', '', '', '', '', '-', '-'],
//         ['Sean Ciaran', '005', '', '', '', '', '', '-', '-']
//     ];
//     scoreTable.querySelectorAll('tbody tr').forEach(row => row.remove());
//     previousTableState.forEach((rowData, rowIndex) => {
//         var row = scoreTable.insertRow(-1); 

//         rowData.forEach((cellData, cellIndex) => {
//             var cell = row.insertCell(cellIndex);
//             cell.contentEditable = true;
//             cell.innerText = cellData;
//         });
//     });

//     getAverage();
//     calculateUnsubmittedCount();
// });

scoreTable.addEventListener('input', getAverage);
addInputListeners();

scoreTable.addEventListener('click', function(event) {
    if (event.target.tagName === 'TD' && event.target.parentNode.rowIndex !== 0) {
        var row = event.target.parentNode;
        var isSelected = row.classList.contains('highlighted-row');
        
        var rows = scoreTable.querySelectorAll('tbody tr');
        rows.forEach(row => row.classList.remove('highlighted-row'));
        

        if (!isSelected) {
            row.classList.add('highlighted-row');
        }
    }
});
scoreTable.addEventListener('click', function(event) {
    if (event.target.tagName === 'TH' && event.target.cellIndex !== 7 && event.target.cellIndex !== 0 && event.target.cellIndex !== 1) {
        var columnIndex = event.target.cellIndex;
        var rows = scoreTable.querySelectorAll('tbody tr');
        rows.forEach(row => {
            var cells = row.cells;
            cells[columnIndex].classList.toggle('highlighted-column');
        });
    }
});
