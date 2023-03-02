

const fetchBillionaire = () => {
  fetch("./api json/Richest_People_API.json")
    .then((res) => res.json())
    .then((data) => {
      displayBillionaire(data);
    })
    .catch((err) => {
        console.log(err);
    })
};


const displayBillionaire = (data) =>{
    data = data.slice(0, 6);
    // console.log(data);
    const tableBodyContainer = document.getElementById("table-body-container");
    let total = 0;
    data.forEach((billionaire) => {
        // console.log(billionaire);
        // console.log(billionaire.naturalId);
        total += billionaire.finalWorth;
        const tr = document.createElement('tr');
        tr.innerHTML = `
        <td scope="row" data-bs-toggle="modal" data-bs-target="#exampleModal" onclick="loadSingleBillionaire(${billionaire.rank})" class="person-name">${billionaire.person.name} <i class="fa-solid fa-eye"></i>  </td>
        <td scope="">${billionaire.countryOfCitizenship}</td>
        <td scope="">${billionaire.industries[0]}</td>
        <td scope="">${billionaire.rank}</td>
        <td scope="">$${billionaire.finalWorth}</td>
        `;

        tableBodyContainer.appendChild(tr);
    })
    const tr = document.createElement("tr");
    tr.classList.add("table-group-divider");
    tr.innerHTML = `
    <th scope="row" colspan="4">Total</th>
      <th>$${total}</th>
    `;
    tableBodyContainer.appendChild(tr);
}


const loadSingleBillionaire = async (rank) => {
  // console.log(rank);
  fetch("./api json/Richest_People_API.json")
    .then((response) => response.json())
    .then((data) => {
      // const rankToFind = 5; // replace 5 with the rank you want
      const person = data.find((p) => p.rank === rank);
      if (person) {
        displaySinglePerson(person);
      } else {
        console.log(`No person found with rank ${rank}`);
      }
    })
    .catch((error) => console.error(error));
}


const displaySinglePerson = (person) =>{
  // console.log(person);
  // console.log(person.financialAssets[0].sharePrice);
  const exampleModalLabel = document.getElementById("exampleModalLabel");
  exampleModalLabel.innerText = `Personal Information`;
  const modalBody = document.getElementById("modal-body");

  let birthDate = new Date(
    person.birthDate
  ).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
  modalBody.innerHTML = `
  <h2 class="text-center modal-body-title">${person.personName}</h2>
  <p class="text-center modal-body-title-p">Biography</p>
  <p class="text-center">${person.bios[0]} ${person.bios[1]}</p>
  <div class="container">
  <div class="row">
  <div class="col-5 mx-auto">
  <img src="${person.squareImage}" class="img-fluid h-100" alt="${
    person.personName
  }">
  <p><strong>Source:</strong> ${person.source}</p>
  </div>
  <div class="col-5 mx-auto">
  <h5 class="font-inknut">General Information</h5>
  <hr/>
  <p class="modal-info-p"> <strong>Citizenship:</strong> ${
    person.countryOfCitizenship
      ? person.countryOfCitizenship
      : "No Citizenship found!"
  } </p>
  <p class="modal-info-p"> <strong>State:</strong> ${
    person.state ? person.state : "No State Found!"
  } </p>
  <p class="modal-info-p"> <strong>City:</strong> ${
    person.city ? person.city : "No city Found!"
  } </p>
  <p class="modal-info-p"> <strong>BirthDate:</strong> ${birthDate} </p>
  <p class="modal-info-p"> <strong>Gender:</strong> ${
    person.gender === "M" ? "Male" : "Female"
  } </p>


  <h5 class="font-inknut mt-5">Financial Information</h5>
  <hr/>
  <p class="modal-info-p"> <strong>Exchange:</strong> ${
    person.financialAssets[0].exchange
      ? person.financialAssets[0].exchange
      : "No exchange found!"
  } </p>
  <p class="modal-info-p"> <strong>Ticker:</strong> ${
    person.financialAssets[0].ticker ? person.financialAssets[0].ticker : "No ticker Found!"
  } </p>
  <p class="modal-info-p"> <strong>Total Shares:</strong> ${
    person.financialAssets[0].numberOfShares ? person.financialAssets[0].numberOfShares : "No Shares result Found!"
  } </p>
  <p class="modal-info-p"> <strong>Shares Price:</strong> $${
    person.financialAssets[0].sharePrice ? person.financialAssets[0].sharePrice : "No Shares Price result Found!"
  } </p>
  </div>
  </div>
  </div>
  `;
}



// Main Load
fetchBillionaire();



