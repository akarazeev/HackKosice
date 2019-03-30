import json
import requests


class SymptomAPI:
    key = "09806a7f45msh0684f4e2c232e7fp10b513jsn574732c58034"
    url = "https://priaid-symptom-checker-v1.p.rapidapi.com/"
    lang = "en-gb"

    headers = {"X-RapidAPI-Key": key}
    
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
    # Returns a JSON with a specialisation corresponding to the diagnosis.
    def get_specialisations(self, symptoms, gender, year_of_birth):
        data = {"language": self.lang, "format": "json",
                "symptoms": json.dumps(symptoms), "gender": gender,
                "year_of_birth": str(year_of_birth)}

        r = requests.get(self.url + "diagnosis/specialisations", 
                         headers=self.headers, 
                         params=data)

        return r.json()


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

