function getCurrencies() {
    deleteTable();
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://www.cbr-xml-daily.ru/daily_json.js");
    xhr.onload = () => {
        if (xhr.status == 200) {
            var response = JSON.parse(xhr.responseText);
            var currencies = [];
            try {
                for (var valute in response.Valute) {
                    currencies.push({
                        name: response.Valute[valute].Name,
                        value: response.Valute[valute].Value,
                    });
                }
                createTable(currencies);
            } catch (error) {}
        } else {
            console.log(xhr.status);
        }
    };
    xhr.send();
}

async function getMicrosoftCourses() {
    deleteTable();
    const response = await fetch("https://learn.microsoft.com/api/learn/catalog?locale=ru-ru");
    if (response.ok) {
        var coursesAll = await response.json();
        var courses = [];
        try {
            coursesAll.courses.forEach((element) => {
                courses.push({ name: element.title, value: element.duration_in_hours });
            });
            createTable(courses);
        } catch (error) {}
        createTable();
    } else {
        console.log(response.status);
    }
}

function deleteTable() {
    try {
        var el = document.getElementById("myTable");
        el.remove();
    } catch (error) {}
}

function createTable(obj) {
    if (obj) {
        let div = document.getElementById("formQuery");
        let table = document.createElement("table");
        let tbody = document.createElement("tbody");

        table.id = "myTable";
        div.appendChild(table);
        table.appendChild(tbody);
        table.setAttribute("class", "table");

        let row_1 = document.createElement("tr");
        let heading_1 = document.createElement("td");
        heading_1.innerHTML = "Name";
        let heading_2 = document.createElement("td");
        heading_2.innerHTML = "Value";

        row_1.setAttribute("class", "table-head");
        row_1.appendChild(heading_1);
        row_1.appendChild(heading_2);
        tbody.appendChild(row_1);

        for (var i in obj) {
            let row_2 = document.createElement("tr");
            let row_2_data_1 = document.createElement("td");
            row_2_data_1.innerHTML = obj[i].name;
            let row_2_data_2 = document.createElement("td");
            row_2_data_2.innerHTML = obj[i].value;

            row_2.appendChild(row_2_data_1);
            row_2.appendChild(row_2_data_2);
            tbody.appendChild(row_2);
        }
    }
}

document.getElementById("btnCurrency").addEventListener("click", getCurrencies);
