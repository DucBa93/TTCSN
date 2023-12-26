var listCoursesBlock = document.querySelector('#list-project')
var courseApi = "http://localhost:3000/Member"


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
                <p>Mã thành viên :<span class="maTV">${course.maTV}</span></p>
                <p>Tên thành viên :<span class="tenTV">${course.tenTV}</span></p>
                <p>Email :<span class="email">${course.email}</span></p>
                <p>Vai trò :<span class="vaiTro">${course.vaiTro}</span></p>
                <p>SĐT :<span class="sdt">${course.SDT}</span></p>
                <p>Địa chỉ :<span class="diaChi">${course.diaChi}</span></p>
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
        var maTV = document.querySelector(
            ".course-item-" + id + " .maTV"
        ).innerText;
        var tenTV = document.querySelector(
            ".course-item-" + id + " .tenTV"
        ).innerText;
        var email = document.querySelector(
            ".course-item-" + id + " .email"
        ).innerText;
        var vaiTro = document.querySelector(
            ".course-item-" + id + " .vaiTro"
        ).innerText;
        var SDT = document.querySelector(
            ".course-item-" + id + " .sdt"
        ).innerText;
        var diaChi = document.querySelector(
            ".course-item-" + id + " .diaChi"
        ).innerText;
        var htmls = `
        <h4>${maDA}</h4>
        <div>
            <div style="margin-top: 10px;>
                <label for="">Mã dự án</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="ma" value="${maDA}"/>
            </div>

            <div style="margin-top: 10px;>
                <label for="">Mã thành viên</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="maTv" value="${maTV}"/>
            </div>
            <div style="margin-top: 10px;>
                <label for="">Tên thành viên</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="tenTV" value="${tenTV}"/>
            </div>
            <div style="margin-top: 10px;>
                <label for="">Email</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="email" value="${email}"/>
            </div>
            <div style="margin-top: 10px;>
                <label for="">Vai trò</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="vaitro" value="${vaiTro}"/>
            </div>
            <div style="margin-top: 10px;>
                <label for="">SDT</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="sdt" value="${SDT}"/>
            </div>
            <div style="margin: 10px 0;>
                <label for="">Địa chỉ</label>
                <input style="padding: 5px; border-radius:10px; border:none;background-color:#D2E3C8;" type="text" name="dc" value="${diaChi}"/>
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
            var maTV = document.querySelector(
                'input[name="maTV"]'
            ).value;
            var tenTV = document.querySelector(
                'input[name="tenTV"]'
            ).value;
            var email = document.querySelector(
                'input[name="email"]'
            ).value;
            var vaiTro = document.querySelector(
                'input[name="vaitro"]'
            ).value;
            var SDT = document.querySelector(
                'input[name="sdt"]'
            ).value;
            var diaChi = document.querySelector(
                'input[name="dc"]'
            ).value;

            var options = {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    maDA: maDA,
                    maTV: maTV,
                    tenTV: tenTV,
                    email: email,
                    vaiTro: vaiTro,
                    SDT: SDT,
                    diaChi: diaChi
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
        var maDA = document.querySelector('input[name="maDA"]').value;
        var maTV = document.querySelector('input[name="maTV"]').value;
        var tenTV = document.querySelector('input[name="tenTV"]').value;
        var email = document.querySelector('input[name="email"]').value;
        var vaiTro = document.querySelector('input[name="vaiTro"]').value;
        var SDT = document.querySelector('input[name="sdt"]').value;
        var diaChi = document.querySelector('input[name="diaChi"]').value;

        var formData = {
            maDA: maDA,
            maTV: maTV,
            tenTV: tenTV,
            email: email,
            vaiTro: vaiTro,
            SDT: SDT,
            diaChi: diaChi
        }
        // createProject(formData)
        createProject(formData, function () {
            getProject(renderProject)
        })
    }
}
