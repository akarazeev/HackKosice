import json
import requests


class SymptomAPI:
    key = "09806a7f45msh0684f4e2c232e7fp10b513jsn574732c58034"
    url = "https://priaid-symptom-checker-v1.p.rapidapi.com/"
    lang = "en-gb"

    headers = {"X-RapidAPI-Key": key}
    
    # Sets the new language for responses. Can be:
    #     DE-CH, EN-GB, FR-FR, ES-ES, TR-TR,
    # case-insensitive.
    # Returns True if the language is valid, otherwise returns False.
    def set_language(self, new_lang):
        new_lang = new_lang.lower()
        valid = ["de-ch", "en-gb", "fr-fr", "es-es", "tr-tr"]
        if new_lang in valid:
            self.lang = new_lang
            return True
        else:
            return False

    # Returns a JSON object with IDs and Names of all possible symptoms.
    def get_symptoms(self):
        data = {"language": self.lang, "format": "json"}

        r = requests.get(self.url + "symptoms", 
                         headers=self.headers, 
                         params=data)

        return r.json()

    # Accepts a list of symptoms, gender (str) and year of birth (str or int).
    # Returns a JSON object with a possible diagnosis and it's probability.
    def get_diagnosis(self, symptoms, gender, year_of_birth):
        data = {"language": self.lang, "format": "json",
                "symptoms": json.dumps(symptoms), "gender": gender,
                "year_of_birth": str(year_of_birth)}

        r = requests.get(self.url + "diagnosis", 
                         headers=self.headers, 
                         params=data)

        return r.json()

    # Accepts a list of symptoms, gender (str) and year of birth (str or int).
    # Returns a JSON object with additional symptoms which might help
    # indentify the diagnosis with a higher probability.
    def get_proposed_symptoms(self, symptoms, gender, year_of_birth):
        data = {"language": self.lang, "format": "json",
                "symptoms": json.dumps(symptoms), "gender": gender,
                "year_of_birth": str(year_of_birth)}

        r = requests.get(self.url + "symptoms/proposed", 
                         headers=self.headers, 
                         params=data)

        return r.json()

    # Accepts a list of symptoms, gender (str) and year of birth (str or int).
    # Returns a JSON with a specialisation corresponding to the diagnosis.
    def get_specialisations(self, symptoms, gender, year_of_birth):
        data = {"language": self.lang, "format": "json",
                "symptoms": json.dumps(symptoms), "gender": gender,
                "year_of_birth": str(year_of_birth)}

        r = requests.get(self.url + "diagnosis/specialisations", 
                         headers=self.headers, 
                         params=data)

        return r.json()

    # Returns a JSON object with IDs and Names of body locations.
    def get_body_locations(self):
        data = {"language": self.lang, "format": "json"}

        r = requests.get(self.url + "body/locations", 
                         headers=self.headers, 
                         params=data)

        return r.json()

    # Accepts an ID of a body location.
    # Returns a JSON object with IDS and Names of body sublocations.
    def get_body_sublocations(self, body_location):
        data = {"language": self.lang, "format": "json", 
                "locationid": str(body_location)}

        r = requests.get(self.url + "body/locations/" + str(body_location), 
                         headers=self.headers, 
                         params=data)

        return r.json()

    # Returns possible symptoms for a given sublocation. Parameters:
    #   - subloc_id - ID of a body sublocation
    #   - status - "man", "woman", "boy", "girl". Child becomes Adult at 12.
    def get_symptoms_in_sublocation(self, subloc_id, status):
        data = {"language": self.lang, "format": "json"}

        r = requests.get(self.url + "symptoms/{}/{}".format(subloc_id, status),
                         headers=self.headers, 
                         params=data)

        return r.json()

    # If a symptom has a red flag, this function returns a text message for it.
    def get_red_flag_text(self, symptom_id):
        data = {"language": self.lang, "format": "json", 
                "symptomId": str(symptom_id)}

        r = requests.get(self.url + "redflag",
                         headers=self.headers, 
                         params=data)

        return r.json()
