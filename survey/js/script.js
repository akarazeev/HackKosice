selected_entries = [];
currently_selecting = "body_locations";


function select_entry(id) {
    var entry = document.getElementById(id);

    if (currently_selecting == "body_locations") {
        currently_selecting = "body_sublocations";
        selected_entries = [];
        entry.className = 'entry-selected';
        symptom_api.show_body_sublocations(id, "symptoms-list");
        return;
    } else if (currently_selecting == "body_sublocations") {
        currently_selecting = "symptoms";
        selected_entries = [];
        entry.className = 'entry-selected';
        symptom_api.show_symptoms_in_sublocation(id, "man", "symptoms-list");
        return;
    }

    if (selected_entries.includes(id)) {
        entry.className = 'entry';
        for (let i = 0; i < selected_entries.length; ++i) {
            if (selected_entries[i] == id) {
                selected_entries.splice(i, 1);
            }
        }
    } else {
        entry.className = 'entry-selected';
        selected_entries.push(id);
    }
}

function make_entry(name, id) {
    var entry = document.createElement('div');
    entry.className = 'entry';
    entry.innerHTML = name;
    entry.onclick = function() { select_entry(id) };
    entry.id = id;

    return entry;
}

function display_data(data, div_id) {
    if (currently_selecting == "symptoms") {
        submit_button.style = "";
    }

    selected_entries = [];
    var list = document.getElementById(div_id);
    list.innerHTML = "";

    for (let i = 0; i < data.length; ++i) {
        list.appendChild(make_entry(data[i].Name, data[i].ID));
    }
}

function get_diagnosis() {
    var name = document.getElementById("name").value;
    var surname = document.getElementById("surname").value;
    var year_of_birth = document.getElementById("dateofbirth").value.split("-")[0];
    var gender = document.getElementById("gender_male").classList.contains("active") ? "male" : "female";

    symptom_api.get_diagnosis(selected_entries, gender, year_of_birth, "diagnosis-result");
    console.log("Submit");
}

function display_diagnosis(data, div_id) {
    document.getElementById(div_id).innerHTML = "Your diagnosis is: " + data[0].Issue.Name + " with probability " + data[0].Issue.Accuracy + "%.";
    document.getElementById("symptoms-list").style = "display: none;";
    submit_button.style = "display: none;";
}


function setup() {
    submit_button = document.getElementById("submit-button");
    submit_button.style = "display: none;";
    symptom_api = new SymptomAPI();

    symptom_api.show_body_locations("symptoms-list");
}
