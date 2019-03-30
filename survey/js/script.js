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
    console.log(data);

    document.getElementById("first-page").style = "display: none;";
    document.getElementById("second-page").style = "";

    var d = "Based on your symptoms, we are " + data[0].Issue.Accuracy + "% sure that you have <strong>" + data[0].Issue.Name + "</strong>. <br> You can schedule an appointment with one of our specialists in this area.";
    document.getElementById(div_id).innerHTML = d;


    var spec_id = data[0].Specialisation[0].ID;
    console.log(spec_id);

    var doctors = axios.get("https://5d11ebed.ngrok.io/api/doctors/?specialisation=" + spec_id)
        .then(response => { display_doctors(response.data, "doctors-list") });
}

function display_doctors(data, div_id) {
    console.log(data);
    var doc_div = document.getElementById(div_id);
    doc_div.innerHTML = "";

    for (let i = 0; i < data.length; ++i) {
        doc_div.appendChild(make_entry(data[i].name, data[i].id));
    }
}


function setup() {
    submit_button = document.getElementById("submit-button");
    submit_button.style = "display: none;";
    //symptom_api = new SymptomAPI();

    //symptom_api.show_body_locations("symptoms-list");

    var t = '[{"Issue":{"ID":80,"Name":"Cold","Accuracy":90,"Icd":"J00","IcdName":"Acute nasopharyngitis [common cold]","ProfName":"Common cold","Ranking":1},"Specialisation":[{"ID":1055,"Name":"General practice","SpecialistID":3}]},{"Issue":{"ID":11,"Name":"Flu","Accuracy":56.953125,"Icd":"J10;J11","IcdName":"Influenza due to other identified influenza virus;Influenza, virus not identified","ProfName":"Influenza","Ranking":2},"Specialisation":[{"ID":15,"Name":"General practice","SpecialistID":3},{"ID":19,"Name":"Internal medicine","SpecialistID":4}]},{"Issue":{"ID":368,"Name":"Flu-related rhinitis","Accuracy":42.1875,"Icd":"J00","IcdName":"Acute nasopharyngitis [common cold]","ProfName":"Infectious rhinitis","Ranking":3},"Specialisation":[{"ID":15,"Name":"General practice","SpecialistID":3},{"ID":32,"Name":"Otolaryngology","SpecialistID":49}]},{"Issue":{"ID":153,"Name":"Inflammation of the bronchi","Accuracy":11.71875,"Icd":"J20;J21","IcdName":"Acute bronchitis;Acute bronchiolitis with bronchospasm ","ProfName":"Acute bronchitis","Ranking":4},"Specialisation":[{"ID":15,"Name":"General practice","SpecialistID":3},{"ID":19,"Name":"Internal medicine","SpecialistID":4},{"ID":35,"Name":"Pulmonology","SpecialistID":6}]},{"Issue":{"ID":44,"Name":"Inflammation of the nose and throat","Accuracy":9.375,"Icd":"J02;J31.2","IcdName":"Acute pharyngitis;Chronic pharyngitis","ProfName":"Nasopharyngitis","Ranking":5},"Specialisation":[{"ID":15,"Name":"General practice","SpecialistID":3},{"ID":32,"Name":"Otolaryngology","SpecialistID":49}]}]';
    display_diagnosis(JSON.parse(t), "diagnosis-result");
}
