import requests


class SymptomAPI:
    key = "09806a7f45msh0684f4e2c232e7fp10b513jsn574732c58034"
    url = "https://priaid-symptom-checker-v1.p.rapidapi.com/"
    lang = "en-gb"

    
    def get_symptoms(self):
        headers = {"X-RapidAPI-Key": self.key}
        data = {"language": self.lang, "format": "json"}

        r = requests.get(self.url + "symptoms", headers=headers, params=data)

        return r.json()

    def set_language(self, new_lang):
        valid = ["de-ch", "en-gb", "fr-fr", "es-es", "tr-tr"]
        if new_lang in valid:
            self.lang = new_lang
            return True
        else:
            return False


s = SymptomAPI()
