
(function () {

    const container = document.getElementById("my-custom-widget");
  
    if (!container) {
      console.error("Widget: container was not found by id='my-custom-widget'");
      return;
    }
  
    const widget = document.createElement("div");
    widget.style.cssText = `
      all: initial;
      font-family: Arial, sans-serif;
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 300px;
      background: white;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.15);
      padding: 16px;
      z-index: 9999;
    `;
  
    widget.innerHTML = `
      <div style="margin-bottom: 10px; font-weight: bold; font-size: 16px;">
        AI-Widget
      </div>
      <textarea id="widget-input" placeholder="Enter a message..." style="
        width: 100%;
        height: 60px;
        border: 1px solid #ccc;
        border-radius: 8px;
        padding: 8px;
        resize: none;
        font-size: 14px;
        box-sizing: border-box;
      "></textarea>
      <button id="widget-send" style="
        margin-top: 8px;
        width: 100%;
        padding: 10px;
        background-color: #4CAF50;
        color: white;
        border: none;
        border-radius: 8px;
        font-weight: bold;
        font-size: 14px;
        cursor: pointer;
      ">Отправить</button>
      <div id="widget-response" style="
        margin-top: 12px;
        font-size: 14px;
        color: #333;
      "></div>
    `;

    document.body.appendChild(widget);

    const input = widget.querySelector("#widget-input");
    const send = widget.querySelector("#widget-send");
    const response = widget.querySelector("#widget-response");
  
    send.addEventListener("click", async () => {
        const text = input.value.trim();
        if (!text) return;
    
        response.innerHTML = "⏳ Sending...";
        try {
            const res = await fetch("http://127.0.0.1:8000/api/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message: text }),
            });
        
            const data = await res.json();
            response.innerHTML = `<strong>Answer:</strong> ${data.response || "Response absent"}`;
            
            // clear input field
            input.value = "";
            } catch (e) {
                response.innerHTML = `<span style="color:red;">Connection error</span>`;
            }
        });
    })();
