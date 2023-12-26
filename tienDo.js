var listCoursesBlock = document.querySelector('#list-project')
var listdetaillock = document.querySelector('#list-detail')
const showProject = document.querySelector('.form-popup ')
const hideProject = document.querySelector('.close-btn')
const hideProgress = document.querySelector('.close-btn-progress')
const infoProgress = document.querySelector('.form_progress')
var courseApi = "http://localhost:3000/List-Project"

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
            <li style="background-color:#fff; border-radius:20px ;padding: 15px 20px; width: 80% ;background-color:#C6CF9B;margin-bottom: 30px; border-bottom: 1px solid #000;" class="course-item-${course.id}">
                <p class="maDA">Mã dự án :${course.maDA}</p>
                <p class="name">Tên dự án :${course.tenDA}</p> 
                <p style="display:none;">Ngày báo cáo: <span class="date">${course.ngayBaoCao}</span></p>
                <p class="illustrate" style="display:none;">${course.moTa}</p>              
                <p class="progress" style="display:none;">${course.tienDo}</p>              
                <p class="ending" style="display:none;">${course.ngayHoanThanh}</p>              
                <button style="padding: 10px; cursor: pointer; background-color:#2D9596; color:#fff; border:none;border-radius:15px; " onclick="show(${course.id})">Báo cáo tiến độ</button>
                <button style="padding: 10px; cursor: pointer; background-color:#2D9596; color:#fff; border:none;border-radius:15px; " onclick="ShowProgress(${course.id})">Xem tiến độ</button>
                 
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('')
}


function ShowProgress(id) {
    infoProgress.classList.add('showUp')
    infoProgress.classList.remove('hide')
    var listdetaillock = document.querySelector('.showProgress')
    var courseItem = document.querySelector(".course-item-" + id);

    if (courseItem) {
        var ngayBaoCao = document.querySelector(
            ".course-item-" + id + " .date"
        ).innerText;
        var moTa = document.querySelector(
            ".course-item-" + id + " .illustrate"
        ).innerText;
        var tienDo = document.querySelector(
            ".course-item-" + id + " .progress"
        ).innerText;
        var ngayHT = document.querySelector(
            ".course-item-" + id + " .ending"
        ).innerText;
        var htmls = `
            <div>
            <span style="margin-left: 25px" class="ngayBaoCao">Ngày báo cáo :${ngayBaoCao}</span></p>
            <span style="margin-left: 25px" class="moTa">Mô tả :${moTa}</span></p>
            <span style="margin-left: 25px" class="tienDo">Tiến độ :${tienDo}</span></p>
            <span style="margin-left: 25px" class="ngayHoanThanh">Ngày hoàn thành :${ngayHT}</span></p>
            </div>
        `
        listdetaillock.innerHTML = htmls
    }

}

hideProgress.addEventListener("click", () => {
    infoProgress.classList.add('hide')
    infoProgress.classList.remove('showUp')
})

hideProject.addEventListener("click", () => {
    showProject.classList.add('hide')
    showProject.classList.remove('showUp')
})

function show(id) {
    // showProject.classList.add('showUp')
    // showProject.classList.remove('hide')
    var courseItem = document.querySelector(".course-item-" + id);
    if (courseItem) {

        var ngayBaoCao = document.querySelector(
            ".course-item-" + id + " .date"
        ).innerText;
        var moTa = document.querySelector(
            ".course-item-" + id + " .illustrate"
        ).innerText;
        var tienDo = document.querySelector(
            ".course-item-" + id + " .progress"
        ).innerText;
        var ngayHoanThanh = document.querySelector(
            ".course-item-" + id + " .ending"
        ).innerText;

        var htmls = `
        <div>
            <div style="margin-top: 10px;">
                <label for="date">Ngày báo cáo</label>
                <input style="padding: 5px; border-radius:10px; border:none;" type="text" name="date" value="${ngayBaoCao}"/>
            </div>

            <div style="margin-top: 10px;>
                <label for="">Mô tả</label>
                <input style="padding: 5px; border-radius:10px; border:none;" type="text" name="illustrate" value="${moTa}"/>
            </div>
            <div style="margin-top: 10px;>
                <label for="">Tiến độ</label>
                <input style="padding: 5px; border-radius:10px; border:none;" type="text" name="progress" value="${tienDo}"/>
            </div>
            <div style="margin-top: 10px;>
                <label for="">Ngày hoàn thành</label>
                <input style="padding: 5px; border-radius:10px; border:none;" type="text" name="end" value="${ngayHoanThanh}"/>
            </div>

            <div style="margin: 20px 0;>
                <button style="display:none;padding: 10px; cursor: pointer; background-color:#fff; color:#000; border:none;border-radius:15px;"></button>
                <button style="padding: 10px; cursor: pointer; background-color:#fff; color:#000; border:none; border-radius:15px;" id="save">Save</button>
                <button style="padding: 10px; cursor: pointer; background-color:#fff; color:#000; border:none;border-radius:15px;" id="cancel">Cancel</button>
            </div>
        </div>
        `;
        courseItem.innerHTML = htmls;
        console.log(courseItem);
        var courseUpdate = document.querySelector("#save");
        courseUpdate.onclick = function () {
            var ngayBaoCao = document.querySelector('input[name="date"]').value;
            var moTa = document.querySelector(
                'input[name="illustrate"]'
            ).value;
            var tienDo = document.querySelector(
                'input[name="progress"]'
            ).value;
            var ngayHoanThanh = document.querySelector(
                'input[name="end"]'
            ).value;

            var options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    ngayBaoCao: ngayBaoCao,
                    moTa: moTa,
                    tienDo: tienDo,
                    ngayHoanThanh: ngayHoanThanh
                }),
            };
            fetch(courseApi + "/" + id, options).then(function (response) {
                return response.json();
            });

        };
        var courseCancel = document.querySelector("#cancel");
        courseCancel.onclick = function () {
            getProject(renderProject);
        };
    }

}





