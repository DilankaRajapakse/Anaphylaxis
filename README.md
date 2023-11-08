# Anaphylaxis Prediction Web Application

### Problem:
Anaphylaxis is a serious allergic reaction that can be life-threatening. It is caused by a rapid release of histamine and other chemicals into the bloodstream. Accurately diagnosing anaphylaxis can be a challenging task for healthcare professionals due to its unpredictable nature and the similarity of its symptoms to other allergic reactions. Conventional methods often rely on subjective assessments and past medical history, which can lead to misdiagnosis or delays in treatment. This can have severe consequences, as anaphylaxis can rapidly progress to a life-threatening condition if not promptly addressed.
The Anaphylaxis Prediction model offers a promising solution to this challenge by providing an objective and data-driven approach to anaphylaxis diagnosis. By analyzing patient symptoms the model can identify patterns that are associated with an increased risk of anaphylaxis. This information can then be used by healthcare professionals to make informed decisions about treatment and prevention, potentially reducing the risk of misdiagnosis and improving patient outcomes.

### Data Gathering
The first step in developing the Anaphylaxis Prediction model was to gather a comprehensive dataset of patient records. This dataset included information on patient symptoms and medication use. The data was gathered from various sources, including electronic health records, medical claims data, and research databases.

### ML Model Development
Once the data was gathered, it was cleaned and pre-processed to ensure its quality and consistency. Next, various machine learning algorithms were trained and evaluated on the dataset. The best performing algorithm was a random forest classifier, which achieved an accuracy of 98% on the test data.

### Front-end Development
A user-friendly web application was developed to allow users to easily access and use the Anaphylaxis Prediction model. The web application was designed using a responsive design approach. The application also includes features to help healthcare professionals interpret the model's predictions and make informed clinical decisions.
(Frontend - REACT
Backend - FLASK)

### Adrenalin and Specialist Recommendation System
When the system determines that a patient is positive for anaphylaxis, it provides guidance on the appropriate adrenaline volume to be administered. The calculation for this volume takes into account the patient's age and weight, ensuring a tailored and precise response.
Conversely, if the system identifies a patient as negative for anaphylaxis, it proceeds to offer recommendations for a suitable specialist based on the remaining symptoms exhibited by the patient. These specialist recommendations ensure that the patient receives the most relevant and targeted care for their specific health condition.

### Real-world Checking
The Anaphylaxis Prediction model was evaluated in a real-world setting to assess its performance in a clinical setting. The model was used to predict the risk of anaphylaxis in a cohort of patients with a history of allergic reactions. The model's predictions were compared to the actual outcomes of the patients, and the results showed that the model was able to accurately predict the risk of anaphylaxis.
