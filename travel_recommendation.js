    const report = document.getElementById("report");
    const btnSearch = document.getElementById('btnSearch');
    const btnReset = document.getElementById('btnReset');
    const recommendations = [];

         function resetForm() {
          document.getElementById("keywordInput").value = "";
        }

        function searchKeyword() {
        const input = document.getElementById('keywordInput').value.toLowerCase();
        console.log(input);
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';

        fetch('travel_recommendation_api.json')
          .then(response => response.json())
          .then(data => {
            const recommendation = data.countries.find(item => item.name.toLowerCase() === input);

            if (recommendation) {
              const name = recommendation.name.join(', ');
              const imageurl = recommendation.imageUrl.join(', ');
              const description = recommendation.description;

              resultDiv.innerHTML += `<h2>${recommendation.name}</h2>`;
              resultDiv.innerHTML += `<img src="${recommendation.imageUrl}" alt="hjh">`;

              resultDiv.innerHTML += `<p><strong>Description:</strong> ${description}</p>`;
    
            } else {
              resultDiv.innerHTML = 'No recommendation found.';
            }
          })
          .catch(error => {
            console.error('Error:', error);
            resultDiv.innerHTML = 'An error occurred while fetching data.';
          });
      }
    
      btnSearch.addEventListener('click', searchKeyword);
      btnReset.addEventListener('click', resetForm);