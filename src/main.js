import plugin from '../plugin.json';

class AcodePlugin {

  async init() {
    // plugin initialisation 
  }

  async destroy() {
    // plugin clean up
  }
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(plugin.id, async (baseUrl, $page, { cacheFileUrl, cacheFile }) => {
    if (!baseUrl.endsWith('/')) {
      baseUrl += '/';
    }
    acodePlugin.baseUrl = baseUrl;
    await acodePlugin.init($page, cacheFile, cacheFileUrl);
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}

(function () {    
    let alertBox = document.createElement("div");    
    document.body.appendChild(alertBox);    
    
    let controlBox = document.createElement("div");    
    document.body.appendChild(controlBox);  
    
    let messageTextarea = document.createElement("textarea");
	messageTextarea.style.width = "100%";
	messageTextarea.style.height = "80px";
	messageTextarea.style.marginTop = "10px";
	messageTextarea.style.padding = "5px";
	messageTextarea.style.fontSize = "14px";
	
	let messageLabel = document.createElement("span");
	messageLabel.innerText = "Edit Alert Text (separate with new line):";
	messageLabel.style.color = "#fff";
	messageLabel.style.fontSize = "14px";
	messageLabel.style.display = "block";
	messageLabel.style.marginTop = "10px";
	
	let saveMessageButton = document.createElement("button");
	saveMessageButton.innerText = "Save Teks";
	saveMessageButton.style.marginTop = "5px";
	saveMessageButton.style.padding = "5px 10px";
	saveMessageButton.style.fontSize = "14px";
	saveMessageButton.style.cursor = "pointer";
	saveMessageButton.style.border = "none";
	saveMessageButton.style.background = "#28a745";
	saveMessageButton.style.color = "#fff";
	saveMessageButton.style.borderRadius = "3px";
	
	controlBox.appendChild(messageLabel);
	controlBox.appendChild(messageTextarea);
	controlBox.appendChild(saveMessageButton);
    
    let toggleButton = document.createElement("button");    
    toggleButton.innerHTML = "&#9881;";    
    toggleButton.style.position = "fixed";    
    toggleButton.style.top = "20px";    
    toggleButton.style.left = "50%";    
    toggleButton.style.transform = "translateX(-50%)";    
    toggleButton.style.background = "#2c2c2c";    
    toggleButton.style.color = "#fff";    
    toggleButton.style.border = "none";    
    toggleButton.style.padding = "8px 12px";    
    toggleButton.style.borderRadius = "50%";    
    toggleButton.style.cursor = "pointer";    
    toggleButton.style.fontSize = "20px";    
    toggleButton.style.zIndex = "1100";    
    
    document.body.appendChild(toggleButton);    
    
    let isControlVisible = false;    
    toggleButton.addEventListener("click", function () {    
        isControlVisible = !isControlVisible;    
        controlBox.style.display = isControlVisible ? "block" : "none";    
    });    
    
    let inputField = document.createElement("input");    
    inputField.type = "number";    
    inputField.min = "5";    
    inputField.value = localStorage.getItem("timerInterval") || "10";    
    inputField.style.width = "50px";     
    inputField.style.padding = "5px";    
    inputField.style.fontSize = "14px";    
    inputField.style.marginBottom = "10px";    
    
    let inputLabel = document.createElement("span");    
    inputLabel.innerText = "Interval Teks (detik): ";    
    inputLabel.style.color = "#fff";    
    inputLabel.style.fontSize = "14px";    
    
    let colorPicker = document.createElement("input");    
    colorPicker.type = "color";    
    colorPicker.value = localStorage.getItem("timerBgColor") || "#000000";     
    
    let colorLabel = document.createElement("span");    
    colorLabel.innerText = "Background Timer color:";    
    colorLabel.style.color = "#fff";    
    colorLabel.style.fontSize = "14px";    
    colorLabel.style.marginLeft = "10px";    
    
    let alertColorPicker = document.createElement("input");    
    alertColorPicker.type = "color";    
    alertColorPicker.value = localStorage.getItem("alertBgColor") || "#ff0000";    
    
    let alertColorLabel = document.createElement("span");    
    alertColorLabel.innerText = "Background alert color:";    
    alertColorLabel.style.color = "#fff";    
    alertColorLabel.style.fontSize = "14px";    
    alertColorLabel.style.marginLeft = "10px";    
    
    let textColorPicker = document.createElement("input");    
    textColorPicker.type = "color";    
    textColorPicker.value = localStorage.getItem("alertTextColor") || "#ffffff";    
    
    let textColorLabel = document.createElement("span");    
    textColorLabel.innerText = "Teks alert color:";    
    textColorLabel.style.color = "#fff";    
    textColorLabel.style.fontSize = "14px";    
    textColorLabel.style.marginLeft = "10px";    
    
    controlBox.appendChild(inputLabel);    
    controlBox.appendChild(inputField);    
    controlBox.appendChild(document.createElement("br"));    
    controlBox.appendChild(colorLabel);    
    controlBox.appendChild(colorPicker);    
    controlBox.appendChild(document.createElement("br"));    
    controlBox.appendChild(alertColorLabel);    
    controlBox.appendChild(alertColorPicker);    
    controlBox.appendChild(document.createElement("br"));    
    controlBox.appendChild(textColorLabel);    
    controlBox.appendChild(textColorPicker);    
    
    controlBox.style.position = "fixed";    
    controlBox.style.top = "50px";    
    controlBox.style.left = "50%";    
    controlBox.style.transform = "translateX(-50%)";    
    controlBox.style.background = "rgba(0, 0, 0, 0.9)";    
    controlBox.style.padding = "10px";    
    controlBox.style.borderRadius = "5px";    
    controlBox.style.color = "#fff";    
    controlBox.style.fontFamily = "Arial, sans-serif";    
    controlBox.style.zIndex = "1200";    
    controlBox.style.display = "none";    
    
    let messageInterval = parseInt(inputField.value, 10);    
    inputField.addEventListener("change", function () {    
        messageInterval = parseInt(inputField.value, 10) || 10;    
        localStorage.setItem("timerInterval", messageInterval);    
    });    
    
    function saveTheme() {    
        localStorage.setItem("timerBgColor", colorPicker.value);    
        localStorage.setItem("alertBgColor", alertColorPicker.value);    
        localStorage.setItem("alertTextColor", textColorPicker.value);    
    }    
    
    colorPicker.addEventListener("input", function () {    
        alertBox.style.background = colorPicker.value;    
        saveTheme();    
    });    
    
    alertColorPicker.addEventListener("input", function () {    
        alertBox.style.background = alertColorPicker.value;    
        saveTheme();    
    });    
    
    textColorPicker.addEventListener("input", function () {    
        alertBox.style.color = textColorPicker.value;    
        saveTheme();    
    });    
    
    function setTimerStyle() {    
        alertBox.style.position = "fixed";    
        alertBox.style.top = "60px";    
        alertBox.style.left = "50%";    
        alertBox.style.transform = "translateX(-50%)";    
        alertBox.style.background = localStorage.getItem("timerBgColor") || "#000000";    
        alertBox.style.color = "#fff";    
        alertBox.style.padding = "10px 20px";    
        alertBox.style.borderRadius = "5px";    
        alertBox.style.fontSize = "16px";    
        alertBox.style.fontWeight = "bold";    
        alertBox.style.fontFamily = "Arial, sans-serif";    
        alertBox.style.zIndex = "1000";    
    }    
    
    function setMessageStyle() {    
        alertBox.style.position = "fixed";    
        alertBox.style.top = "50%";    
        alertBox.style.left = "50%";    
        alertBox.style.transform = "translate(-50%, -50%)";    
        alertBox.style.background = localStorage.getItem("alertBgColor") || "#ff0000";    
        alertBox.style.color = localStorage.getItem("alertTextColor") || "#ffffff";    
        alertBox.style.padding = "20px 40px";    
        alertBox.style.borderRadius = "10px";    
        alertBox.style.fontSize = "32px";    
        alertBox.style.fontWeight = "bold";    
        alertBox.style.textAlign = "center";    
        alertBox.style.fontFamily = "Arial, sans-serif";    
        alertBox.style.zIndex = "2000";    
    }    
    
    let startTime = Math.floor(Date.now() / 1000);    
    let elapsedTime = 0;    
    let isMessageDisplayed = false;    
    
	let storedMessages = localStorage.getItem("alertMessages");
	let messages = storedMessages ? JSON.parse(storedMessages) : [
	    "Alert Successfully Displayed!",
	    "This is the default message from TimeZap, click the gear icon above the timer to add text/delete/edit"
	];
	
	// Tampilkan teks alert dalam textarea
	messageTextarea.value = messages.join("\n");
	
	// Fungsi untuk menyimpan teks alert baru
	saveMessageButton.addEventListener("click", function () {
	    let newMessages = messageTextarea.value.split("\n").map(m => m.trim()).filter(m => m !== "");
	    localStorage.setItem("alertMessages", JSON.stringify(newMessages));
	    messages = newMessages;
	    alert("Alert text successfully updated!");
	});

	function updateClock() {
	    if (!isMessageDisplayed) {
	        elapsedTime = Math.floor(Date.now() / 1000) - startTime;
	        alertBox.innerText = `it's been ${elapsedTime}s`;
	        setTimerStyle();
	    }
	
	    if (elapsedTime % messageInterval === 0 && elapsedTime !== 0 && !isMessageDisplayed) {
	        isMessageDisplayed = true;
	        let randomMessage = messages[Math.floor(Math.random() * messages.length)];
	        alertBox.innerText = randomMessage;
	        setMessageStyle();
	
	        setTimeout(() => {
	            isMessageDisplayed = false;
	            startTime += 3;
	            alertBox.innerText = `it's been ${elapsedTime + 3}s`;
	            setTimerStyle();
	        }, 3000);
	    }
	}

    setInterval(updateClock, 1000);    
    updateClock();    
})();
