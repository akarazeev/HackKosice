
import numpy as np
import json


def random_wh():
    '''Returns working hours (from, to), 24h format.
    '''
    t1 = np.random.randint(1, 23)
    t2 = t1 + np.random.randint(1, 24 - t1)
    return t1, t2


def random_specs(filename="equeue/data/specialisations.json"):
    with open(filename, 'r') as f:
        specialisations = json.load(f)

    num_specs = np.random.randint(1, 7)
    specialisations = np.random.choice(specialisations, num_specs)
    ids = [array['ID'] for array in specialisations]
    ids_string = ' '.join(map(str,ids))
    return ids_string

def random_name(topnames_filename='equeue/data/topnames.txt', topsurnames_filename='equeue/data/topsurnames.txt'):
    with open(topnames_filename, 'r') as f:
        topnames = f.readlines()

    with open(topsurnames_filename, 'r') as f:
        topsurnames = f.readlines()

    topsurnames = [x.strip() for x in topsurnames]
    topnames = [x.strip() for x in topnames]

    return np.random.choice(topnames) + ' ' + np.random.choice(topsurnames)

class DoctorG:
    def __init__(self):
        self.name = random_name()
        self.wh = random_wh()  # Working Hours.
        self.specs = list()
        self.specs_only = list()

    def update_specs(self):
        self.specs_only = [x['Name'] for x in self.specs]

    def __str__(self):
        return self.name

    def __repr__(self):
        return "{name} - {specs}".format(name=self.name, specs=' | '.join([x['Name'] for x in self.specs]))

def generate():
    ndoctors = 100
    doctors = [DoctorG() for _ in range(ndoctors)]

    filename="equeue/data/specialisations.json"
    with open(filename, 'r') as f:
        specialisations = json.load(f)

    for spec in specialisations:
        chosen_doctors = np.random.choice(np.arange(len(doctors)), np.random.randint(1, 5))
        for i in chosen_doctors:
            doctors[i].specs.append(spec)

    names = []
    whs = []
    specs = []
    for i in range(len(doctors)):

        names.append(doctors[i].name)

        whs.append(doctors[i].wh)

        specs.append(doctors[i].specs)
        # doctors[i].update_specs()
        # doctors[i].specs()
    return len(names), names, whs, specs
