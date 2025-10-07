// Fetch count when page loads
window.onload = async () => {
  const res = await fetch("/api/count");
  const data = await res.json();
  document.getElementById("count").innerText = data.count;
};

async function updateCount(change) {
  const current = parseInt(document.getElementById("count").innerText);
  const newCount = Math.max(current + change, 0); // prevent negative count

  const res = await fetch("/api/count", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count: newCount }),
  });

  const data = await res.json();
  document.getElementById("count").innerText = data.count;
}

async function resetCount() {
  const res = await fetch("/api/count", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ count: 0 }),
  });

  const data = await res.json();
  document.getElementById("count").innerText = data.count;
}
