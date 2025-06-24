let data = [];

document.querySelector('.update_form').style.display = "none";

// Theme toggle logic
document.addEventListener('DOMContentLoaded', () => {
    const themeSwitcher = document.getElementById('themeSwitcher');

    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-mode');
        themeSwitcher.checked = true;
    }

    themeSwitcher.addEventListener('change', function () {
        if (this.checked) {
            document.body.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            document.body.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    });

    readAll(); // Load data on DOM ready
});

function readAll() {
    localStorage.setItem("object", JSON.stringify(data));
    var tabledata = document.querySelector(".data_table");

    const filter = document.getElementById("statusFilter")?.value || "All";

    var object = localStorage.getItem('object');
    var objectdata = JSON.parse(object);
    var element = "";
    let filteredData;
    if (filter === "All") {
        filteredData = objectdata;
    } else {
        filteredData = objectdata.filter(record => record.status === filter);
    }


    filteredData.forEach(record => {
        element += `<tr>
            <td>${record.task}</td>
            <td>${record.date}</td>
            <td>${record.status}</td>
            <td>
                <button class="edit" onclick="edit(${record.id})">Edit</button>
                <button class="delete" onclick="delet(${record.id})">Delete</button>
            </td>
        </tr>`;
    });

    tabledata.innerHTML = element;
}


function delet(id) {
    data = data.filter(rec => rec.id !== id);
    readAll();
}

function create() {
    document.querySelector(".create_form").style.display = "block";
    document.querySelector(".add_div").style.display = "none";
}

function add() {
    var task = document.querySelector(".task").value;
    var date = document.querySelector(".date").value;
    var status = document.querySelector(".status").value;

    var newId = data.length > 0 ? data[data.length - 1].id + 1 : 1;
    var newObj = { id: newId, task: task, date: date, status: status };
    data.push(newObj);

    document.querySelector(".create_form").style.display = "none";
    document.querySelector(".add_div").style.display = "block";

    readAll();
}

function edit(id) {
    document.querySelector('.update_form').style.display = "block";
    document.querySelector('.create_form').style.display = "none";

    var obj = data.find(rec => rec.id === id);
    document.querySelector('.utask').value = obj.task;
    document.querySelector('.udate').value = obj.date;
    document.querySelector('.ustatus').value = obj.status;
    document.querySelector('.id').value = obj.id;
}

function update() {
    var id = parseInt(document.querySelector('.id').value);
    var task = document.querySelector('.utask').value;
    var date = document.querySelector('.udate').value;
    var status = document.querySelector('.ustatus').value;

    var index = data.findIndex(rec => rec.id === id);
    data[index] = { id, task, date, status };

    document.querySelector('.update_form').style.display = "none";
    document.querySelector('.create_form').style.display = "none";
    document.querySelector(".add_div").style.display = "block";

    readAll();
}
