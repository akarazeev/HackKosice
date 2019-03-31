function show_history(data, div_id) {
    var list = document.getElementById(div_id);
    list.innerHTML = "";
    list.style = "font-size: 16pt";

    var general = document.createElement('div');
    general.innerHTML = "<strong>" + data.name + "</strong>, " + data.gender + ", " + data.year_of_birth + " year of birth.<br><br>";

    var applied_on = document.createElement('div');
    applied_on.innerHTML = "Patient applied " + data.applies.length + " time" + (data.applies.length == 1 ? "" : "s") + ": ";

    list.appendChild(general);
    list.appendChild(applied_on);

    console.log(data);

    var applies = document.createElement('ol');
    var text = "";

    for (let i = 0; i < data.applies.length; ++i) {
        text += "<li>" + data.applies[i].date + " " + data.applies[i].time + "<br>";
        text += "<strong> Diagnosis</strong>: " + data.applies[i].diagnosis + "<br>";

        text += "<strong> Symptoms: </strong><br> ";
        text += "<ul>";
        var sympts = data.applies[i].symptoms.split(" ");
        var symptst = data.applies[i].symptoms_str.split(".");
        for (let j = 0; j < sympts.length; ++j) {
            var sid = sympts[j];
            text += "<li>" + symptst[j] + "</li>";
        }

        text += "</ul></li>";
    }
    applies.innerHTML = text;

    list.appendChild(applies);
}

function get_patient_info(div_id) {
    var patient_id = document.getElementById('patient_id').value;
    axios.get("https://5d11ebed.ngrok.io/api/patients_history?id=" + patient_id).then(
        response => {
            show_history(response.data, div_id);
        });
}
