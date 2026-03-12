const customerData = JSON.parse(localStorage.getItem("customerData"));

async function confermaOrdine() {
  if (!customerData || !customerData.email) {
    alert("Email cliente mancante");
    return;
  }

  const res = await fetch(`http://localhost:3000/ordine`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email: customerData.email })
  });

  const data = await res.json();
  if (res.ok) {
    alert(`Ordine confermato! ID ordine: ${data.ordineId}`);
    localStorage.removeItem("customerData");
  } else {
    alert("Errore invio ordine");
  }

}