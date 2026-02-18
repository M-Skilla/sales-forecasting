const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function uploadCSV(file: File) {
  const formData = new FormData();
  formData.append("file", file);
  const res = await fetch(`${API_URL}/api/upload`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}

export async function getForecast(model: string, periods: number, frequency: string) {
  const res = await fetch(`${API_URL}/api/forecast`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ model, periods, frequency }),
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
