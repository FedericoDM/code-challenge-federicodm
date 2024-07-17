/* TODO: Flesh this out to connect the form to the API and render results
   in the #address-results div. */

   document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("address-form");
  
    form.addEventListener("submit", async function (e) {
      e.preventDefault();
  
      const address = document.getElementById("address").value;
      const url = "/api/parse/";
      const queryParams = new URLSearchParams({ address: address });
  
      try {
        const response = await fetch(`${url}?${queryParams}`, {
          method: 'GET'
        });
  
        const respData = await response.json();
  
        if (!response.ok) {
          throw new Error(respData.detail || 'An error occurred');
        }
  
        displayResults(respData);
      } catch (error) {
        displayError(error.message);
      }
    });
  
    function displayResults(data) {
      document.getElementById("error-results").style.display = "none";
      const resultsDiv = document.getElementById("address-results");
      resultsDiv.style.display = "block";
  
      document.getElementById("parse-type").textContent = data.address_type;
  
      const tableBody = document.querySelector("#address-results-table tbody");
      tableBody.innerHTML = '';
  
      for (const [key, value] of Object.entries(data.address_components)) {
        const row = document.createElement("tr");
        const partCell = document.createElement("td");
        const tagCell = document.createElement("td");
  
        partCell.textContent = key;
        tagCell.textContent = value;
  
        row.appendChild(partCell);
        row.appendChild(tagCell);
        tableBody.appendChild(row);
      }
    }
  
    function displayError(errorMessage) {
      document.getElementById("address-results").style.display = "none";
      const errorDiv = document.getElementById("error-results");
      errorDiv.style.display = "block";
      document.getElementById("parse-error").textContent = errorMessage;
    }
  });
  