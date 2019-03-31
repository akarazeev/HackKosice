selected_entries = [];

symptoms = [123];
symptoms_str = [];
diagnosis = "";

currently_selecting = "body_locations";

name = "This_name";
surname = "shouldnt_be_here";
phone = "";
year_of_birth = "0000";
gender = "male";
patient_id = "";
doctor_name = "";


function finish(queue_num) {
    document.getElementById("second-page").style = "display: none;";
    document.getElementById("third-page").style = "";

    var d = document.getElementById("final-message");

    var text = "Thank you for using our services! <strong>" + doctor_name + "</strong> will be notified about your appointment. <br> Currently there are <strong>" + (queue_num-1) + "</strong> people registered before you. You will receive an SMS notification once the doctor is free.<br><br>";
    text += "Please, remember your personal identification number: <strong>" + patient_id + "</strong>. You can use it to make your registration for the next appointment easier.<br>";
    text += "A bracelet with the QR code with your ID will now be printed. Please, show it to your doctor once you see him.";

    d.innerHTML = text;

}

function add_to_queue(patient_id, doctor_id) {
    console.log("Adding " + patient_id + " to " + doctor_id);

    var qrcode = new QRCode(document.getElementById("qrcode"), {
        text: patient_id.toString(),
        width: 200,
        height: 200,
        colorDark : "#000000",
        colorLight : "#ffffff"
    });

    axios.post("https://5d11ebed.ngrok.io/api/applies", 
        params={"patient_id": patient_id, "doctor_id": doctor_id, 
                "symptoms" : symptoms.join(" "), 
                "symptoms_str": symptoms_str.join("."),
                "diagnosis": diagnosis}).then(r => { 
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
        symptom_api.show_body_sublocations(id.slice(1, id.length), "symptoms-list");
    } else if (currently_selecting == "body_sublocations") {
        currently_selecting = "symptoms";
        selected_entries = [];
        entry.className = 'entry-selected';
        symptom_api.show_symptoms_in_sublocation(id.slice(1, id.length), "man", "symptoms-list");
    } else if (currently_selecting == "doctors") {
        doctor_name = entry.innerHTML;
        if (patient_id == "") {
            axios.post("https://5d11ebed.ngrok.io/api/patients/", 
                params={"name": name + " " + surname, "gender": gender, "year_of_birth": year_of_birth, "phone": phone})
                .then(r => { 
                    patient_id = r.data.id;
                    add_to_queue(r.data.id, entry.id);
                });
        } else {
            add_to_queue(patient_id, entry.id);
        }
    } else {
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
    var x = "";
    if (currently_selecting == "body_locations") {
        x = 'a';
    } else if (currently_selecting == "body_sublocations") {
        x = 'b';
    } else if (currently_selecting == "doctors") {
        x = 'c';
    } else if (currently_selecting == "symptoms") {
        x = 'd';
        submit_button.style = "";
    }

    selected_entries = [];
    var list = document.getElementById(div_id);
    list.innerHTML = "";

    for (let i = 0; i < data.length; ++i) {
        list.appendChild(make_entry(data[i].Name, x + data[i].ID));
    }
}

function get_diagnosis() {
    name = document.getElementById("name").value.trim();
    surname = document.getElementById("surname").value.trim();
    phone = document.getElementById("phone").value;
    year_of_birth = document.getElementById("dateofbirth").value;
    if (document.getElementById("gender_male").classList.contains("active")) {
        gender = "male";
    } else if (document.getElementById("gender_female").classList.contains("active")) {
        gender = "female";
    }
    patient_id = document.getElementById("person_id").value;

    symptoms = [];
    for (let i = 0; i < selected_entries.length; ++i) {
        symptoms.push(selected_entries[i].slice(1, selected_entries[i].length));
        symptoms_str.push(document.getElementById(selected_entries[i]).innerHTML);
    }
    console.log(symptoms_str);

    symptom_api.get_diagnosis(symptoms, gender, year_of_birth, "diagnosis-result");
    console.log("Submit");
}

function display_diagnosis(data, div_id) {
    console.log(data);

    document.getElementById("first-page").style = "display: none;";
    document.getElementById("second-page").style = "";

    diagnosis = "<strong>" + data[0].Issue.Name + "</strong> <i>(" + data[0].Issue.IcdName + ")</i>";
    var d = "Based on your symptoms, we are " + data[0].Issue.Accuracy + "% sure that you have: <br> <strong>" + data[0].Issue.Name + "</strong> <i>(" + data[0].Issue.IcdName + ")</i>. <br> You can schedule an appointment with one of our specialists in this area.";
    document.getElementById(div_id).innerHTML = d;


    var spec_id = data[0].Specialisation[0].ID;

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
                    document.getElementById("phone").value = r.data[0].phone;
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
    };

    qr_field.oninput = function() {
        init_button.innerHTML = "Proceed to symptoms";
    };
}
