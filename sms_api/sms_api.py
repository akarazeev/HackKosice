import requests


def send_sms(number):

    auth = (
        'u2c5d19fe387471260edabc98ac4d7d48',
        'D34044DBD9662918696B0A7A1DE963AB'
        )

    fields = {
        'from': 'Healthcare system',
        'to': number,
        'message': 'You are next! Hurry up!'
        }

    response = requests.post(
        "https://api.46elks.com/a1/SMS",
        data=fields,
        auth=auth
        )

    print(response.text)