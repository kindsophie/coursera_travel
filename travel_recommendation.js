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

            // Spezielle Suchbegriffe überprüfen
            if (input === 'beach' || input === 'beaches') {
                found = true;
                displayBeaches(data.beaches, resultDiv);
            } else if (input === 'temple' || input === 'temples') {
                found = true;
                displayTemples(data.temples, resultDiv);
            } else if (input === 'city' || input === 'cities') {
                found = true;
                displayCities(data.countries, resultDiv);
            } else if (input === 'country' || input === 'countries') {
                found = true;
                displayCountries(data.countries, resultDiv);
            } else {
                // Standard-Suche nach Ländern und Städten
                data.countries.forEach(country => {
                    // Wenn die Eingabe mit dem Ländernamen übereinstimmt, zeige nur die Städte des Landes an
                    if (country.name.toLowerCase() === input) {
                        found = true;
                        displayCountry(country, resultDiv);
                    } else {
                        // Suche nach Städten im Land
                        country.cities.forEach(city => {
                            if (city.name.toLowerCase().includes(input)) {
                                found = true;
                                displayCity(city, resultDiv);
                            }
                        });
                    }
                });

                data.temples.forEach(temple => {
                    if (temple.name.toLowerCase().includes(input)) {
                        found = true;
                        displayItem(temple, resultDiv);
                    }
                });

                data.beaches.forEach(beach => {
                    if (beach.name.toLowerCase().includes(input)) {
                        found = true;
                        displayItem(beach, resultDiv);
                    }
                });
            }

            if (!found) {
                resultDiv.innerHTML = 'No recommendation found.';
            }
        })
        .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
        });
}

// Funktion zur Anzeige eines Landes und seiner Städte (wenn ein Land explizit gesucht wird)
function displayCountry(country, resultDiv) {
    resultDiv.innerHTML += `<h3>${country.name}</h3>`;
    country.cities.forEach(city => {
        displayCity(city, resultDiv);
    });
}

// Funktion zur Anzeige einer Stadt
function displayCity(city, resultDiv) {
    resultDiv.innerHTML += `
        <h4>${city.name}</h4>
        <img src="${city.imageUrl}" alt="${city.name}">
        <p><strong>Description:</strong> ${city.description}</p>
    `;
}

// Funktion zur Anzeige von Tempeln
function displayTemples(temples, resultDiv) {
    resultDiv.innerHTML += `<h3>Temples</h3>`;
    temples.forEach(temple => {
        displayItem(temple, resultDiv);
    });
}

// Funktion zur Anzeige von Stränden
function displayBeaches(beaches, resultDiv) {
    resultDiv.innerHTML += `<h3>Beaches</h3>`;
    beaches.forEach(beach => {
        displayItem(beach, resultDiv);
    });
}

// Funktion zur Anzeige aller Städte in allen Ländern
function displayCities(countries, resultDiv) {
    resultDiv.innerHTML += `<h3>Cities</h3>`;
    countries.forEach(country => {
        country.cities.forEach(city => {
            displayCity(city, resultDiv);
        });
    });
}

// Funktion zur Anzeige aller Länder
function displayCountries(countries, resultDiv) {
    resultDiv.innerHTML += `<h3>Countries</h3>`;
    countries.forEach(country => {
        resultDiv.innerHTML += `<h4>${country.name}</h4>`;
    });
}

// Funktion zur Anzeige eines allgemeinen Elements (Tempel, Strand, etc.)
function displayItem(item, resultDiv) {
    resultDiv.innerHTML += `
        <h4>${item.name}</h4>
        <img src="${item.imageUrl}" alt="${item.name}">
        <p><strong>Description:</strong> ${item.description}</p>
    `;
}
    
      btnSearch.addEventListener('click', searchKeyword);
      btnReset.addEventListener('click', resetForm);