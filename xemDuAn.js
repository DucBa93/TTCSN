var listCoursesBlock = document.querySelector('#list-project')
var listdetaillock = document.querySelector('#list-detail')
const showProject = document.querySelector('.form-popup ')
const hideProject = document.querySelector('.close-btn')
var courseApi = "https://zfjyk6-8080.csb.app/List-Project"


function start() {
    getProject(renderProject);
}

start();

function getProject(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}
function renderProject(courses) {
    var listCoursesBlock = document.querySelector('#list-project')
    var htmls = courses.map(function (course) {
        return `    
            <li style="padding: 10px 0;margin-bottom: 30px; border-bottom: 1px solid #000;" class="course-item-${course.id}">
                <p class="maDA">Mã dự án :${course.maDA}</p>
                <p class="name">Tên dự án :${course.tenDA}</p>              
                <p style="display:none;" class="member">Nhân lực :${course.nhanLuc}</p>              
                <p  style="display:none;"class="cash">Ngân sách :${course.nganSach}</p>              
                <button style="padding: 10px; cursor: pointer; background-color:#2D9596; color:#fff; border:none;border-radius:15px; " onclick="show(${course.id})">Xem chi tiết</button>
                 
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('')
}



hideProject.addEventListener("click", () => {
    showProject.classList.add('hide')
    showProject.classList.remove('showUp')
})

function show(id) {
    showProject.classList.add('showUp')
    showProject.classList.remove('hide')
    var listdetaillock = document.querySelector('.showInfo')
    var courseItem = document.querySelector(".course-item-" + id);

    if (courseItem) {
        var maDA = document.querySelector(
            ".course-item-" + id + " .maDA"
        ).innerText;
        var tenDA = document.querySelector(
            ".course-item-" + id + " .name"
        ).innerText;
        var nhanLuc = document.querySelector(
            ".course-item-" + id + " .member"
        ).innerText;
        var nganSach = document.querySelector(
            ".course-item-" + id + " .cash"
        ).innerText;
        var htmls = `
            <div>
            <span style="margin-left: 25px" class="name">${maDA}</span></p>
            <span style="margin-left: 25px" class="name">${tenDA}</span></p>
            <span style="margin-left: 25px" class="member">${nhanLuc}</span></p>
            <span style="margin-left: 25px" class="cash">${nganSach}</span></p>
            </div>
        `
        listdetaillock.innerHTML = htmls
    }
    // var htmls = courses.map(function (course) {
    //     console.log(course.id);
    //     return `    
    //         <li  class="course-item-${course.id}">
    //             <h4>Mã dự án :${course.maDA}</h4>
    //             <p>Tên dự án :${course.tenDA}</p>
    //             <p>Nhân lực :${course.nhanLuc}</p>
    //             <p>Ngân sách :${course.nganSach}</p>

    //         </li>
    //     `
    // })

}