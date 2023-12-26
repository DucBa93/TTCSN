var listCoursesBlock = document.querySelector('#list-project')
var courseApi = "http://localhost:3000/TaiLieu"


function start() {
    getProject(renderProject);
    handleCreateForm()
}

start();

function getProject(callback) {
    fetch(courseApi)
        .then(function (response) {
            return response.json();
        })
        .then(callback);
}

function createProject(data, callback) {
    var options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data)
    }
    fetch(courseApi, options)
        .then(function (response) {
            response.json()
        })
        .then(callback)
}

function renderProject(courses) {
    var listCoursesBlock = document.querySelector('#list-project')
    var htmls = courses.map(function (course) {
        return `    
            <li style="border: 1px solid #000; padding: 10px; border-radius: 20px; margin-top:15px;" class="course-item-${course.id}">
                <h4>Mã dự án :<span class="maDA">${course.maDA}</span></h4>
                <p>Mã tài liêu :<span class="maTL">${course.maTL}</span></p>
                <p>Tên tài liệu :<span class="tenTL">${course.tenTL}</span></p>
                <p>Nguồn tài liệu :<span class="nguonTL">${course.nguonTL}</span></p>
                <p>Mô tả :<span class="moTa">${course.moTa}</span></p>
                <button  onclick="deleteProject(${course.id})">Xoá</button>
                <button  onclick="handleUpdateCourse(${course.id})" fixCourse(${course.id})">sửa</button>
            </li>
        `
    })
    listCoursesBlock.innerHTML = htmls.join('')
}


function handleUpdateCourse(id) {
    var courseItem = document.querySelector(".course-item-" + id);
    if (courseItem) {
        var maDA = document.querySelector(
            ".course-item-" + id + " .maDA"
        ).innerText;
        var maTL = document.querySelector(
            ".course-item-" + id + " .maTL"
        ).innerText;
        var tenTL = document.querySelector(
            ".course-item-" + id + " .tenTL"
        ).innerText;
        var nguonTL = document.querySelector(
            ".course-item-" + id + " .nguonTL"
        ).innerText;
        var moTa = document.querySelector(
            ".course-item-" + id + " .moTa"
        ).innerText;
        var htmls = `
        <h4>${maDA}</h4>
        <div>
            <div style="margin-top: 10px;>
                <label for="">Mã dự án</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="ma" value="${maDA}"/>
            </div>

            <div style="margin-top: 10px;>
                <label for="">Mã tài liệu</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="maTL" value="${maTL}"/>
            </div>
            <div style="margin-top: 10px;>
                <label for="">Tên tài liệu</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="tenTL" value="${tenTL}"/>
            </div>
            <div style="margin-top: 10px;>
                <label for="">Nguồn tài liệu</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="nguonTL" value="${nguonTL}"/>
            </div>
            <div style="margin: 10px 0;>
                <label for="">Mô tả</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="moTa" value="${moTa}"/>
            </div>

            <div>
                <button id="save">Save</button>
                <button id="cancel">Cancel</button>
            </div>
        </div>
        `;
        courseItem.innerHTML = htmls;

        var courseUpdate = document.querySelector("#save");
        courseUpdate.onclick = function () {
            var maDA = document.querySelector('input[name="ma"]').value;
            var maTL = document.querySelector(
                'input[name="maTL"]'
            ).value;
            var tenTL = document.querySelector(
                'input[name="tenTL"]'
            ).value;
            var nguonTL = document.querySelector(
                'input[name="nguonTL"]'
            ).value;
            var moTa = document.querySelector(
                'input[name="moTa"]'
            ).value;

            var options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    maDA: maDA,
                    maTL: maTL,
                    tenTL: tenTL,
                    nguonTL: nguonTL,
                    moTa: moTa
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

function deleteProject(id) {
    var options = {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
            // 'Content-Type': 'application/x-www-form-urlencoded',
        }

    }
    fetch(courseApi + '/' + id, options)
        .then(function (response) {
            response.json()
        })
        .then(function () {
            var courseItem = document.querySelector('.course-item-' + id)
            if (courseItem) {
                courseItem.remove();
            }
        })
}

function handleCreateForm() {
    var createBtn = document.querySelector('#create')
    createBtn.onclick = () => {
        var maDA = document.querySelector('input[name="ma"]').value;
        var maTL = document.querySelector('input[name="maTL"]').value;
        var tenTL = document.querySelector('input[name="tenTL"]').value;
        var nguonTL = document.querySelector('input[name="nguonTL"]').value;
        var moTa = document.querySelector('input[name="moTa"]').value;

        var formData = {
            maDA: maDA,
            maTL: maTL,
            tenTL: tenTL,
            nguonTL: nguonTL,
            moTa: moTa
        }
        // createProject(formData)
        createProject(formData, function () {
            getProject(renderProject)
        })
    }
}
