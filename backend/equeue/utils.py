
import numpy as np
import json


def random_wh():
    '''Returns working hours (from, to), 24h format.
    '''
    t1 = np.random.randint(1, 23)
    t2 = t1 + np.random.randint(1, 24 - t1)
    return t1, t2


def random_specs(filename="data/specialisations.json"):
    with open(filename, 'r') as f:
        specialisations = json.load(f)

    num_specs = np.random.randint(1, 7)
    specialisations = np.random.choice(specialisations, num_specs)
    ids = [array['ID'] for array in specialisations]
    ids_string = ' '.join(map(str,ids))
    return ids_string

def random_name(topnames_filename='data/topnames.txt', topsurnames_filename='data/topsurnames.txt'):
    with open(topnames_filename, 'r') as f:
        topnames = f.readlines()

    with open(topsurnames_filename, 'r') as f:
        topsurnames = f.readlines()

    topsurnames = [x.strip() for x in topsurnames]
    topnames = [x.strip() for x in topnames]

    return np.random.choice(topnames) + ' ' + np.random.choice(topsurnames)


# class Doctor:
#     def __init__(self):
#         self.name = random_name()
#         self.wh = random_wh()  # Working Hours.
#         self.specs = random_specs()
#
#     def __str__(self):
#         return self.name
#
#     def __repr__(self):
#         return "{name} - {specs}".format(name=self.name, specs=' | '.join([x['Name'] for x in self.specs]))
