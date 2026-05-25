async function predictFlower() {

    const sepalLength = parseFloat(document.getElementById("sepalLength").value);
    const sepalWidth = parseFloat(document.getElementById("sepalWidth").value);
    const petalLength = parseFloat(document.getElementById("petalLength").value);
    const petalWidth = parseFloat(document.getElementById("petalWidth").value);

    if (
        isNaN(sepalLength) ||
        isNaN(sepalWidth) ||
        isNaN(petalLength) ||
        isNaN(petalWidth)
    ) {
        document.getElementById("result").innerText =
            "Please enter all values";
        return;
    }

    const response = await fetch("http://127.0.0.1:8000/predict", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            sepal_length: sepalLength,
            sepal_width: sepalWidth,
            petal_length: petalLength,
            petal_width: petalWidth
        })
    });

    const data = await response.json();

    document.getElementById("result").innerText =
        `Prediction: ${data.prediction}`;
}