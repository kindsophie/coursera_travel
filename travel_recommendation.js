    const report = document.getElementById("report");
    const btnSearch = document.getElementById('btnSearch');
    const btnReset = document.getElementById('btnReset');
    const recommendations = [];

         function resetForm() {
            document.getElementById("keywordInput").value = "";
            const resultDiv = document.getElementById('result');
            resultDiv.innerHTML = '';
        }

        function searchKeyword() {
        const input = document.getElementById('keywordInput').value.toLowerCase();
        console.log(input);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        fetch('travel_recommendation_api.json')
          .then(response => response.json())
        .then(data => {
            let found = false;

            // Suche in Ländern
            data.countries.forEach(country => {
                if (country.name.toLowerCase() === input) {
                    found = true;
                    displayCountry(country, resultDiv);
                }

                // Suche in Städten innerhalb des Landes
                country.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(input)) {
                        found = true;
                        displayCity(city, resultDiv);
                    }
                });
            });

            // Suche in Tempeln
            data.temples.forEach(temple => {
                if (temple.name.toLowerCase().includes(input)) {
                    found = true;
                    displayItem(temple, resultDiv);
                }
            });

            // Suche in Stränden
            data.beaches.forEach(beach => {
                if (beach.name.toLowerCase().includes(input)) {
                    found = true;
                    displayItem(beach, resultDiv);
                }
            });

            if (!found) {
                resultDiv.innerHTML = 'No recommendation found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

function displayCountry(country, resultDiv) {
    resultDiv.innerHTML += `<h3>${country.name}</h3>`;
    country.cities.forEach(city => {
        resultDiv.innerHTML += `
            <h4>${city.name}</h4>
            <img src="${city.imageUrl}" alt="${city.name}">
            <p><strong>Description:</strong> ${city.description}</p>
        `;
    });
}

function displayCity(city, resultDiv) {
    resultDiv.innerHTML += `
        <h4>${city.name}</h4>
        <img src="${city.imageUrl}" alt="${city.name}">
        <p><strong>Description:</strong> ${city.description}</p>
    `;
}

function displayItem(item, resultDiv) {
    resultDiv.innerHTML += `
        <h4>${item.name}</h4>
        <img src="${item.imageUrl}" alt="${item.name}">
        <p><strong>Description:</strong> ${item.description}</p>
    `;
}
    
      btnSearch.addEventListener('click', searchKeyword);
      btnReset.addEventListener('click', resetForm);