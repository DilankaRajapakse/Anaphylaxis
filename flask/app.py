from flask import Flask, request, jsonify
import pandas as pd
from sklearn.ensemble import RandomForestClassifier
import numpy as np
from flask_cors import cross_origin

app = Flask(__name__)


# Load your dataset and preprocess it (e.g., encoding labels, scaling features)
path = './DataAnaphylaxis.xlsx'
anaphylaxis = pd.read_excel(path)

# Select the features and target variable
features = ['Swelling of eyes', 'Hives', 'Itching of skin', 'Itching of mouth', 'Swelling of lips', 'Sneezing',
            'Wheezing', 'Difficulty of breathing', 'Vomiting', 'Fainting', 'Abdominal pain', 'Diarrhea',
            'Loss of consciousness', 'Other', 'Dizziness', 'Nasal Congestion', 'Fever', 'Cough', 'Rhinorrhea',
            'Dry Skin', 'Fatigue', 'Acid Reflux', 'Heart Burn']
target = 'Result'

X = anaphylaxis[features]
y = anaphylaxis[target]

# Create the Random Forest Classifier
model = RandomForestClassifier(random_state=42)

# Train the model
model.fit(X, y)

# Define the symptoms list
symptoms_list = features

# Suggested specialists based on symptoms
specialists = {
    'Dermatologist': ['Swelling of eyes', 'Hives', 'Itching of skin', 'Dry Skin'],
    'Immunologist': ['Swelling of lips'],
    'Respiratory Physician (Pulmonologist)': ['Sneezing', 'Wheezing', 'Difficulty of breathing', 'Nasal Congestion',
                                              'Cough', 'Rhinorrhea'],
    'Gastroenterologist': ['Vomiting', 'Abdominal pain', 'Diarrhea', 'Acid Reflux', 'Heart Burn'],
    'Cardiologist': ['Fainting'],
    'Neurologist': ['Loss of consciousness', 'Dizziness'],
    'General Medical Practitioner': ['Fever', 'Fatigue']
}


@app.route('/predict-anaphylaxis', methods=['POST'])
@cross_origin('*')
def predict_anaphylaxis():
    data = request.json

    age = data['age']
    weight = data['weight']
    symptoms = data['symptoms']

    symptoms_list = [1 if value == 'Yes' else 0 for value in symptoms.values()]
    input_data = np.array(symptoms_list).reshape(1, -1)

    result = model.predict(input_data)


    res = int(result[0])

    response = {
        'result':res,
    }

    if res == 1:
        response['specialists'] = []
        if int(age) > 12:
            response['msg'] = "Adrenaline 0.5 mg IM (0.5ml 1:1000 solution) / use adult epipen"
        else:
            adrenaline_dosage = int(weight) * 0.01
            response['msg'] = f"Adrenaline dosage for patients aged 12 or below: {adrenaline_dosage} mg"
    else:
        response['specialists'] = get_specialists(input_data)
        response['msg'] = "None"



    return jsonify(response)


def get_specialists(input_data):
    positive_symptoms = [symptoms_list[i] for i, value in enumerate(input_data[0]) if value == 1]
    needed_specialists = []

    for specialist, specialist_symptoms in specialists.items():
        if any(symptom in positive_symptoms for symptom in specialist_symptoms):
            needed_specialists.append(specialist)

    return needed_specialists

if __name__ == '__main__':
    app.run()
