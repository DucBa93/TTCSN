var listCoursesBlock = document.querySelector('#list-project')
var courseApi = "https://zfjyk6-8080.csb.app/nganSach"


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
                <p>Ngân sách dự trù :<span class="duTru">${course.NSduTru}</span></p>
                <p>Chi phí vật tư :<span class="vatTu">${course.chiPhiVT}</span></p>
                <p>Chi phí nhân lực :<span class="nhanLuc">${course.chiPhiNL}</span></p>
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
        var NSduTru = document.querySelector(
            ".course-item-" + id + " .duTru"
        ).innerText;
        var chiPhiVT = document.querySelector(
            ".course-item-" + id + " .vatTu"
        ).innerText;
        var chiPhiNL = document.querySelector(
            ".course-item-" + id + " .nhanLuc"
        ).innerText;
        var htmls = `
        <h4>${maDA}</h4>
        <div>
            <div style="margin-top: 10px;>
                <label for="">Mã dự án</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="ma" value="${maDA}"/>
            </div>

            <div style="margin-top: 10px;>
                <label for="">Ngân sách dự trù</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="dutru" value="${NSduTru}"/>
            </div>
            <div style="margin-top: 10px;>
                <label for="">Nguồn lực</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="VT" value="${chiPhiVT}"/>
            </div>
            <div style="margin: 10px 0;>
                <label for="">Ngân sách</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="NL" value="${chiPhiNL}"/>
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
            var tenDA = document.querySelector(
                'input[name="dutru"]'
            ).value;
            var nhanLuc = document.querySelector(
                'input[name="VT"]'
            ).value;
            var nganSach = document.querySelector(
                'input[name="NL"]'
            ).value;

            var options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    maDA: maDA,
                    tenDA: tenDA,
                    nhanLuc: nhanLuc,
                    nganSach: nganSach
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
        var tenDA = document.querySelector('input[name="duTru"]').value;
        var nhanLuc = document.querySelector('input[name="VT"]').value;
        var nganSach = document.querySelector('input[name="NL"]').value;

        var formData = {
            maDA: maDA,
            tenDA: tenDA,
            nhanLuc: nhanLuc,
            nganSach: nganSach,
        }
        // createProject(formData)
        createProject(formData, function () {
            getProject(renderProject)
        })
    }
}
