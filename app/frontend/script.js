async function predictFlower() {
    const sepalLength = parseFloat(document.getElementById("sepalLength").value);
    const sepalWidth = parseFloat(document.getElementById("sepalWidth").value);
    const petalLength = parseFloat(document.getElementById("petalLength").value);
    const petalWidth = parseFloat(document.getElementById("petalWidth").value);

    const resultCard = document.getElementById("resultCard");
    const resultValue = document.getElementById("result-value");
    const predictBtn = document.getElementById("predictBtn");

    // Input Validation
    if (
        isNaN(sepalLength) ||
        isNaN(sepalWidth) ||
        isNaN(petalLength) ||
        isNaN(petalWidth)
    ) {
        resultCard.className = "result-card";
        resultValue.innerText = "Please fill in all measurements";
        resultValue.style.color = "#ef4444"; // Red error text
        return;
    }

    // Set Loading State
    predictBtn.disabled = true;
    const originalBtnText = predictBtn.innerHTML;
    predictBtn.innerHTML = `<div class="spinner"></div><span>Classifying...</span>`;
    
    // Clear previous specific class names
    resultCard.className = "result-card predicted";
    resultValue.innerText = "Processing...";
    resultValue.style.color = "";

    try {
        const response = await fetch("/predict", {
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

        if (!response.ok) {
            throw new Error("Server error");
        }

        const data = await response.json();
        const prediction = data.prediction.toLowerCase();
        
        // Update styling based on species
        resultCard.className = `result-card ${prediction}`;
        
        // Map species name to proper casing and add descriptor
        let displayName = "";
        let descriptor = "";
        
        if (prediction === "setosa") {
            displayName = "Iris Setosa";
            descriptor = "characterized by short, narrow petals and wider sepals.";
        } else if (prediction === "versicolor") {
            displayName = "Iris Versicolor";
            descriptor = "features moderate, balanced petal and sepal sizes.";
        } else if (prediction === "virginica") {
            displayName = "Iris Virginica";
            descriptor = "distinguished by long, large petals and sepals.";
        } else {
            displayName = data.prediction;
            descriptor = "species identified.";
        }

        resultValue.innerHTML = `
            <div style="font-size: 24px; font-weight: 700; margin-bottom: 4px;">${displayName}</div>
            <div style="font-size: 14px; font-weight: 300; opacity: 0.8; line-height: 1.4;">
                ${descriptor}
            </div>
        `;

    } catch (error) {
        console.error(error);
        resultCard.className = "result-card";
        resultValue.innerText = "Failed to connect to the model server.";
        resultValue.style.color = "#ef4444";
    } finally {
        // Reset Button State
        predictBtn.disabled = false;
        predictBtn.innerHTML = originalBtnText;
    }
}