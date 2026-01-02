// ================================
// PAGE LOAD EVENT
// ================================
document.addEventListener("DOMContentLoaded", function () {

  // ================================
  // GET FORM & BASIC ELEMENTS
  // ================================
  const form = document.getElementById("orderForm");
  if (!form) return;

  const msg = document.getElementById("message");
  const totalBox = document.getElementById("total");
  const cakeSelect = document.getElementById("cake");
  const qtyInput = document.getElementById("quantity");
  const summary = document.getElementById("summary");
  const thanks = document.getElementById("thanks");
  const resetBtn = document.getElementById("resetBtn");

  // ================================
  // AUTO LOAD SAVED ORDER (LocalStorage)
  // ================================
  const savedOrder = localStorage.getItem("cakeOrder");

  if (savedOrder) {
    const data = JSON.parse(savedOrder);

    summary.style.display = "block";
    summary.innerHTML = `
      <h3>Last Saved Order</h3>
      <p><strong>Name:</strong> ${data.name}</p>
      <p><strong>Cake:</strong> ${data.cake}</p>
      <p><strong>Quantity:</strong> ${data.quantity}</p>
      <p><strong>${data.total}</strong></p>
    `;

    thanks.innerText = "This order was loaded from saved data.";
  }

  // ================================
  // CALCULATE TOTAL PRICE
  // ================================
  function calculateTotal() {
    let price = 0;

    if (cakeSelect.value === "Chocolate Cake") price = 1500;
    else if (cakeSelect.value === "Vanilla Cake") price = 1200;
    else if (cakeSelect.value === "Strawberry Cake") price = 1300;

    if (cakeSelect.value && qtyInput.value > 0) {
      totalBox.innerText = "Total Bill: Rs " + (price * qtyInput.value);
    } else {
      totalBox.innerText = "";
    }
  }

  cakeSelect.addEventListener("change", calculateTotal);
  qtyInput.addEventListener("input", calculateTotal);

  // ================================
  // FORM SUBMIT + VALIDATION
  // ================================
  form.onsubmit = function (e) {
    e.preventDefault();

    const name = document.getElementById("name").value.trim();
    const namePattern = /^[A-Za-z\s]+$/;

    if (name === "" || cakeSelect.value === "" || qtyInput.value === "") {
      msg.innerText = "Please fill all fields";
      msg.style.color = "red";
      return;
    }

    if (!namePattern.test(name)) {
      msg.innerText = "Name should contain only letters";
      msg.style.color = "red";
      return;
    }

    if (qtyInput.value <= 0) {
      msg.innerText = "Quantity must be greater than 0";
      msg.style.color = "red";
      return;
    }

    // ================================
    // SUCCESS MESSAGE + SUMMARY
    // ================================
    msg.innerText = "Order placed successfully!";
    msg.style.color = "green";

    summary.style.display = "block";
    summary.innerHTML = `
      <h3>Order Summary</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Cake:</strong> ${cakeSelect.value}</p>
      <p><strong>Quantity:</strong> ${qtyInput.value}</p>
      <p><strong>${totalBox.innerText}</strong></p>
    `;

    thanks.innerText = "Thank you! Your order has been received.";

    // ================================
    // SAVE ORDER TO LOCAL STORAGE
    // ================================
    const orderData = {
      name: name,
      cake: cakeSelect.value,
      quantity: qtyInput.value,
      total: totalBox.innerText
    };

    localStorage.setItem("cakeOrder", JSON.stringify(orderData));
  };

  // ================================
  // RESET BUTTON FUNCTION
  // ================================
  resetBtn.onclick = function () {
    form.reset();
    msg.innerText = "";
    totalBox.innerText = "";
    summary.style.display = "none";
    thanks.innerText = "";
  };

});
