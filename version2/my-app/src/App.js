import React, {useEffect, useState} from 'react';
import axios from "axios";

const AnaphylaxisPrediction = () => {
    // Define component state for age, weight, and symptoms
    const [age, setAge] = useState(0);
    const [weight, setWeight] = useState('');
    const [symptoms, setSymptoms] = useState({});

    // Handler for age input
    const handleAgeChange = (e) => {
        setAge(e.target.value);
    };

    // Handler for weight input
    const handleWeightChange = (e) => {
        setWeight(e.target.value);
    };

    // Handler for symptom radio buttons
    const handleSymptomChange = (symptom, value) => {
        setSymptoms((prevSymptoms) => ({
            ...prevSymptoms,
            [symptom]: value,
        }));
    };


    const [msg, setMsg] = useState('')
    const [result, setResult] = useState(0)
    const [specialists, setSpecialists] = useState([])

    useEffect(() => {

    }, [msg, result, specialists])

    // Define the list of symptoms
    const symptomsList = [
        'Swelling of eyes',
        'Hives',
        'Itching of skin',
        'Itching of mouth',
        'Swelling of lips',
        'Sneezing',
        'Wheezing',
        'Difficulty of breathing',
        'Vomiting',
        'Fainting',
        'Abdominal pain',
        'Diarrhea',
        'Loss of consciousness',
        'Other',
        'Dizziness',
        'Nasal Congestion',
        'Fever',
        'Cough',
        'Rhinorrhea',
        'Dry Skin',
        'Fatigue',
        'Acid Reflux',
        'Heart Burn'
    ];

    const buildInitSyn = () => {
        symptomsList.map((key) => {
            setSymptoms((prevSymptoms) => ({
                ...prevSymptoms,
                [key]: "No",
            }));
        })
    }

    useEffect(() => {
        buildInitSyn()
    }, [])

    const handlePredictionSubmit = () => {

        if (age == null || age <= 0) {
            alert("Please add a valid age")
            return
        }

        if (weight == null || weight <= 0) {
            alert("Please add a valid weight")
            return
        }
        // Prepare data for the API request

        const data = {
            "age": age,
            "weight": weight,
            "symptoms": symptoms,
        };


        axios
            .post("http://127.0.0.1:5000/predict-anaphylaxis", data)
            .then((response) => {
                console.log(response.data)
                setMsg(response.data.msg)
                setResult(response.data.result)
                setSpecialists(response.data.specialists)
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <div className="container">
            <div>

                <div className="card mt-3">
                    <div className="card-body bg-img">
                        <h1>Anaphylaxis Prediction</h1>

                        <div className="col-6">
                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Age</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="age"
                                    value={age}
                                    onChange={handleAgeChange}
                                />
                            </div>

                            <div className="form-group">
                                <label htmlFor="exampleFormControlInput1">Weight</label>
                                <input
                                    className="form-control"
                                    type="number"
                                    id="weight"
                                    value={weight}
                                    onChange={handleWeightChange}
                                />
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-4">Symptoms:</h3>
                            <div className="row row-cols-1 row-cols-sm-2 row-cols-md-4">
                                {symptomsList.map((symptom) => (
                                    <div key={symptom} className="col mb-3">
                                        <div className="card">
                                            <div className="card-body">
                                                <label className="form-label">{symptom}: &nbsp;</label>
                                                <br/>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name={symptom}
                                                        value="Yes"
                                                        checked={symptoms[symptom] === 'Yes'}
                                                        onChange={() => handleSymptomChange(symptom, 'Yes')}
                                                    />
                                                    <label className="form-check-label">Yes</label>
                                                </div>
                                                <div className="form-check form-check-inline">
                                                    <input
                                                        type="radio"
                                                        className="form-check-input"
                                                        name={symptom}
                                                        value="No"
                                                        checked={symptoms[symptom] === 'No'}
                                                        onChange={() => handleSymptomChange(symptom, 'No')}
                                                    />
                                                    <label className="form-check-label">No</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <button className="btn btn-sm btn-success" onClick={handlePredictionSubmit}>Search</button>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-body">
                        <div>
                            {msg != "None" &&
                            <p>Message : {msg}</p>
                            }
                            <p>Result : {result == 1 ? "Positive" : "Negative"}</p>
                            <p>specialists :
                                <ul>
                                    {specialists.map((key) => {
                                        return <li key={key}>{key}</li>
                                    })}
                                </ul>
                            </p>
                        </div>
                    </div>
                </div>

            </div>
            <div className="col-md-12">

                <div style={{display: "flex", justifyContent: "space-around"}}>
                    <div>
                        <span className="mr-2"><i className="fa-brands fa-facebook"></i></span>
                        <span className="mr-2"><i className="fa-brands fa-whatsapp"></i></span>
                        <span className="mr-2"><i className="fa-solid fa-envelope"></i></span>
                    </div>
                </div>
            </div>
            <div id="footer">
                <div className="container text-center">
                    <p>
                        &copy; 2023 All all right reserved
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AnaphylaxisPrediction;
