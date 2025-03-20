const bgAnimation = document.getElementById('bgAnimation');

const numberOfColorBoxes = 400;

for (let i = 0; i < numberOfColorBoxes; i++) {
    const colorBox = document.createElement('div');
    colorBox.classList.add('colorBox');
    bgAnimation.append(colorBox)
    }

    // Add click event listener to the button
    document.getElementById("exploreBtnSTUDENT").addEventListener("click", function() {
        // Redirect to LoginStudent.html
        window.location.href = "../Student/StudentLogin/LoginStudent.html";
    });

    document.getElementById("exploreBtnLECTURER").addEventListener("click", function() {
        // Redirect to LoginStudent.html
        window.location.href = "../Lecturer/LecturerLogin/LoginLecturer.html";
    });


   