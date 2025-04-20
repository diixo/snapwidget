
(function () {
    const apiUrl = "http://127.0.0.1:8000/api/search";
  
    const container = document.createElement("div");
    container.style.border = "1px solid #ccc";
    container.style.padding = "10px";
    container.style.margin = "10px";
    container.style.maxWidth = "300px";
  
    container.innerHTML = `
      <input id="my-widget-input" type="text" placeholder="Enter text request" />
      <button id="my-widget-btn">Search</button>
      <div id="my-widget-result" style="margin-top:10px;"></div>
    `;
  
    document.body.appendChild(container);
  
    const input = container.querySelector("#my-widget-input");
    const button = container.querySelector("#my-widget-btn");
    const result = container.querySelector("#my-widget-result");
  
    button.onclick = async () => {
      const text = input.value.trim();
      if (!text) return;
  
      result.textContent = "Загрузка...";
  
      try {
        const response = await fetch(apiUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ query: text })
        });
  
        const data = await response.json();
        result.innerHTML = data.results.map(r => `<div>${r}</div>`).join("");
      } catch (e) {
        result.textContent = "Ошибка запроса.";
      }
    };
  })();
  