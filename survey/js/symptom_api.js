class SymptomAPI {
    constructor() {
        this.key = "09806a7f45msh0684f4e2c232e7fp10b513jsn574732c58034";
        this.url = "https://priaid-symptom-checker-v1.p.rapidapi.com/";
        this.lang = "en-gb";

        this.headers = {"X-RapidAPI-Key": this.key};
    }

    // Sets the new language for responses. Can be:
    //     DE-CH, EN-GB, FR-FR, ES-ES, TR-TR,
    // case-insensitive.
    // Returns True if the language is valid, otherwise returns False.
     set_language(new_lang) {
        new_lang = new_lang.toLowerCase()
        valid = ["de-ch", "en-gb", "fr-fr", "es-es", "tr-tr"];
        if (valid.includes(new_lang)) {
            this.lang = new_lang;
            return true;
        } else {
            return false;
        }
    }

    // Returns a JSON object with IDs and Names of all possible symptoms.
    show_symptoms(div_id) {
        var data = {"language": this.lang, "format": "json"};

        axios.get(this.url + "symptoms", {headers: this.headers, params: data})
             .then(response => {
                 display_data(response.data, div_id);
             });
    }

    // Accepts a list of symptoms, gender (str) and year of birth (str or int).
    // Returns a JSON object with a possible diagnosis and it's probability.
    get_diagnosis(symptoms, gender, year_of_birth, div_id) {
        var data = {"language": this.lang, "format": "json",
                "symptoms": JSON.stringify(symptoms), "gender": gender,
                "year_of_birth": year_of_birth.toString()}

        axios.get(this.url + "diagnosis", {headers: this.headers, params: data})
             .then(response => {
                 display_diagnosis(response.data, div_id);
             });


    }

    // Accepts a list of symptoms, gender (str) and year of birth (str or int).
    // Returns a JSON object with additional symptoms which might help
    // indentify the diagnosis with a higher probability.
    //get_proposed_symptoms(symptoms, gender, year_of_birth) {
        //data = {"language": this.lang, "format": "json",
                //"symptoms": json.dumps(symptoms), "gender": gender,
                //"year_of_birth": str(year_of_birth)}

        //r = requests.get(this.url + "symptoms/proposed", 
                         //headers=this.headers, 
                         //params=data)

        //return r.json()
    //}

    // Accepts a list of symptoms, gender (str) and year of birth (str or int).
    // Returns a JSON with a specialisation corresponding to the diagnosis.
    //get_specialisations(symptoms, gender, year_of_birth) {
        //data = {"language": this.lang, "format": "json",
                //"symptoms": json.dumps(symptoms), "gender": gender,
                //"year_of_birth": str(year_of_birth)}

        //r = requests.get(this.url + "diagnosis/specialisations", 
                         //headers=this.headers, 
                         //params=data)

        //return r.json()
    //}

    // Returns a JSON object with IDs and Names of body locations.
    show_body_locations(div_id) {
        var data = {"language": this.lang, "format": "json"};

        axios.get(this.url + "body/locations", {headers: this.headers, params: data})
             .then(response => {
                 display_data(response.data, div_id);
             });
    }

    // Accepts an ID of a body location.
    // Returns a JSON object with IDS and Names of body sublocations.
    show_body_sublocations(body_location, div_id) {
        var data = {"language": this.lang, "format": "json", "locationid": body_location.toString()};

        axios.get(this.url + "body/locations/" + body_location.toString(), 
             {headers: this.headers, params: data})
             .then(response => {
                 display_data(response.data, div_id);
             });
    }

    // Returns possible symptoms for a given sublocation. Parameters:
    //   - subloc_id - ID of a body sublocation
    //   - status - "man", "woman", "boy", "girl". Child becomes Adult at 12.
    show_symptoms_in_sublocation(subloc_id, status, div_id) {
        var data = {"language": this.lang, "format": "json"};

        axios.get(this.url + "symptoms/" + subloc_id.toString() + "/" + status,
             {headers: this.headers, params: data})
             .then(response => {
                 display_data(response.data, div_id);
             });
    }

    // If a symptom has a red flag, this  returns a text message for it.
    //get_red_flag_text(symptom_id) {
        //data = {"language": this.lang, "format": "json", 
                //"symptomId": str(symptom_id)}

        //r = requests.get(this.url + "redflag",
                         //headers=this.headers, 
                         //params=data)

        //return r.json()
    //}
}
