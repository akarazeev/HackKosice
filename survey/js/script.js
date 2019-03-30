selected_entries = [];

symptoms = [123];
diagnosis = [456];

currently_selecting = "body_locations";

name = "This name";
surname = "shouldn't be here";
year_of_birth = "0000";
gender = "male";
patient_id = "";


function finish(queue_num) {
    console.log(queue_num)
}

function add_to_queue(patient_id, doctor_id) {
    console.log("Adding " + patient_id + " to " + doctor_id);
    axios.post("https://5d11ebed.ngrok.io/api/applies", 
        params={"patient_id": patient_id, "doctor_id": doctor_id, 
                "symptoms" : symptoms.join(" "), 
                "diagnosis": diagnosis.join(" ")}).then(r => { 
                    axios.get("https://5d11ebed.ngrok.io/api/applies?patient_id=" + patient_id)
                        .then(r => {finish(r.data.queue)}) 
                });
}

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
    } else if (currently_selecting == "doctors") {
        if (patient_id == "") {
            axios.post("https://5d11ebed.ngrok.io/api/patients/", 
                params={"name": name + " " + surname, "gender": gender, "year_of_birth": year_of_birth})
                .then(r => { 
                    add_to_queue(r.data.id, entry.id);
                });
        } else {
            add_to_queue(patient_id, entry.id);
        }
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
    name = document.getElementById("name").value;
    surname = document.getElementById("surname").value;
    year_of_birth = document.getElementById("dateofbirth").value;
    gender = document.getElementById("gender_male").classList.contains("active") ? "male" : "female";
    patient_id = document.getElementById("person_id").value;

    symptom_api.get_diagnosis(selected_entries, gender, year_of_birth, "diagnosis-result");
    console.log("Submit");
}

function display_diagnosis(data, div_id) {
    console.log(data);

    document.getElementById("first-page").style = "display: none;";
    document.getElementById("second-page").style = "";

    var d = "Based on your symptoms, we are " + data[0].Issue.Accuracy + "% sure that you have: <br> <strong>" + data[0].Issue.Name + "</strong> <i>(" + data[0].Issue.IcdName + ")</i>. <br> You can schedule an appointment with one of our specialists in this area.";
    document.getElementById(div_id).innerHTML = d;


    var spec_id = data[0].Specialisation[0].ID;
    console.log(spec_id);

    var doc_url = "https://5d11ebed.ngrok.io/api/";
    var doctors = axios.get(doc_url + "doctors/?specialisation=" + spec_id)
        .then(response => { display_doctors(response.data, "doctors-list") });

    currently_selecting = "doctors";
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

    qr_field = document.getElementById("person_id");
    init_button = document.getElementById("init-button");
    init_button.onclick = function() {
        if (qr_field.value != "") {
            patient_id = qr_field.value;

            axios.get("https://5d11ebed.ngrok.io/api/patients?id=" + patient_id)
                .then(r => {
                    document.getElementById("name").value = r.data[0].name.split(" ")[0];
                    document.getElementById("surname").value = r.data[0].name.split(" ")[1];
                    document.getElementById("dateofbirth").value = r.data[0].year_of_birth;
                    if (r.data[0].gender == "male") {
                        document.getElementById("gender_male").classList.add("active");
                    } else {
                        document.getElementById("gender_female").classList.add("active");
                    }
                });

        }
        document.getElementById("zero-page").style = "display: none;";
        document.getElementById("first-page").style = "";

        symptom_api = new SymptomAPI();
        symptom_api.show_body_locations("symptoms-list");
        return;

        var t = '[{"Issue":{"ID":80,"Name":"Cold","Accuracy":90,"Icd":"J00","IcdName":"Acute nasopharyngitis [common cold]","ProfName":"Common cold","Ranking":1},"Specialisation":[{"ID":1055,"Name":"General practice","SpecialistID":3}]},{"Issue":{"ID":11,"Name":"Flu","Accuracy":56.953125,"Icd":"J10;J11","IcdName":"Influenza due to other identified influenza virus;Influenza, virus not identified","ProfName":"Influenza","Ranking":2},"Specialisation":[{"ID":15,"Name":"General practice","SpecialistID":3},{"ID":19,"Name":"Internal medicine","SpecialistID":4}]},{"Issue":{"ID":368,"Name":"Flu-related rhinitis","Accuracy":42.1875,"Icd":"J00","IcdName":"Acute nasopharyngitis [common cold]","ProfName":"Infectious rhinitis","Ranking":3},"Specialisation":[{"ID":15,"Name":"General practice","SpecialistID":3},{"ID":32,"Name":"Otolaryngology","SpecialistID":49}]},{"Issue":{"ID":153,"Name":"Inflammation of the bronchi","Accuracy":11.71875,"Icd":"J20;J21","IcdName":"Acute bronchitis;Acute bronchiolitis with bronchospasm ","ProfName":"Acute bronchitis","Ranking":4},"Specialisation":[{"ID":15,"Name":"General practice","SpecialistID":3},{"ID":19,"Name":"Internal medicine","SpecialistID":4},{"ID":35,"Name":"Pulmonology","SpecialistID":6}]},{"Issue":{"ID":44,"Name":"Inflammation of the nose and throat","Accuracy":9.375,"Icd":"J02;J31.2","IcdName":"Acute pharyngitis;Chronic pharyngitis","ProfName":"Nasopharyngitis","Ranking":5},"Specialisation":[{"ID":15,"Name":"General practice","SpecialistID":3},{"ID":32,"Name":"Otolaryngology","SpecialistID":49}]}]';
        display_diagnosis(JSON.parse(t), "diagnosis-result");

    };

    qr_field.oninput = function() {
        init_button.innerHTML = "Proceed to symptoms";
    };

}
