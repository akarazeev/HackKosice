function show_history(data, div_id) {
    var list = document.getElementById(div_id);
    list.innerHTML = "";
    var name = document.createElement('div');
    name.innerHTML = data.name;
    var gender = document.createElement('div');
    gender.innerHTML = data.gender;
    var year = document.createElement('div');
    year.innerHTML = data.year_of_birth;
    list.appendChild(name);
    list.appendChild(gender);
    list.appendChild(year);
    for (let i = 0; i < data.applies.length; ++i) {
        var apply = document.getElementById("div");
        //apply.innerHTML = "Apply";
        var date = document.getElementById("div");
        date.innerHTML = data.applies[i].date;
        var symptoms = document.getElementById("div");
        symptoms.innerHTML = data.applies[i].symptoms;
        var diagnosis = document.getElementById("div");
        diagnosis.innerHTML = data.applies[i].diagnosis;
    }
}

function get_patient_info(div_id) {
    var patient_id = document.getElementById('patient_id').value;
    /*axios.get("https://5d11ebed.ngrok.io/api/patients_history?id=" + patient_id).then(
        response => {
            show_history(response.data, div_id);
        });*/
    show_history({"id":1,"name":"Alexander Smirnov","gender":"female","year_of_birth":2000,"applies":[{"date":"2019-03-30","time":"23:59:47.265702","symptoms":"13 15 95","diagnosis":"<strong>Cold</strong> <i>(Acute nasopharyngitis [common cold])</i>"}]}, "patient-info");
}