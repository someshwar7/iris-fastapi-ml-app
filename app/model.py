from sklearn.datasets import load_iris
from sklearn.ensemble import RandomForestClassifier
import numpy as np

# Load dataset
iris = load_iris()

X = iris.data
y = iris.target

# Train model
model = RandomForestClassifier()

model.fit(X, y)

# Flower labels
flower_names = iris.target_names


def predict_iris(sepal_length, sepal_width, petal_length, petal_width):

    features = np.array([[
        sepal_length,
        sepal_width,
        petal_length,
        petal_width
    ]])

    prediction = model.predict(features)[0]

    return flower_names[prediction]