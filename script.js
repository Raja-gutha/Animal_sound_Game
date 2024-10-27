const vehicleImages = {
  lorry: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlYdcra8WPEGOtjToH7VXz3ld4ymsr2VM3LdfTb7AJT_kupQEtqk9yg3o&s=10",
  car: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dd/Toyota_Corolla_%282018%29.jpg/800px-Toyota_Corolla_%282018%29.jpg",
  bike: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSPdGkLs7ir-ZHCguzpqibfUfmUf1SuQmsh7paajZLXX0YHnPm8Fn2XvdE&s=10", // Add your actual bike image URL
  truck: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrp4p4Y_cvUyTICcN52wihO9QvNPceFMwZxeEuwt7untcVCAs8kbjSSJIS&s=10", // Add your actual truck image URL
  bus: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/LT_471_%28LTZ_1471%29_Arriva_London_New_Routemaster_%2819522859218%29.jpg/1200px-LT_471_%28LTZ_1471%29_Arriva_London_New_Routemaster_%2819522859218%29.jpg", // Add your actual bus image URL
  van: "https://5.imimg.com/data5/SELLER/Default/2022/5/NC/YI/MA/81143335/tata-magic-express-10-seater-school-van.jpg", // Add your actual van image URL
  tractor: "https://images-cdn.ubuy.co.in/633ab7ae8ba2765198689934-peg-perego-john-deere-ground-force.jpg", // Add your actual tractor image URL
  scooter: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7-D0_dCCyD5nCvdQKdpiRbj5S-dXttXBWfmCr995YVeHEtGFv-ZfMTA&s=10", // Add your actual scooter image URL
  airplane: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTKvot6G45E9cDd-OpPQonh1Mfq8EzGBmJVRA&usqp=CAU", // Add your actual airplane image URL
  boat: "https://upload.wikimedia.org/wikipedia/commons/0/02/1910_Mathis_Launch.jpg" // Add your actual boat image URL
};

let recognition;
let isListening = false;

function setupRecognition() {
  recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.continuous = true; // Keep recognition running
  recognition.interimResults = true; // Get intermediate results
  recognition.lang = 'en-US'; // Set the language

  recognition.onstart = function() {
      console.log('Speech recognition started');
  };

  recognition.onresult = function(event) {
      let spokenWord = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
          spokenWord += event.results[i][0].transcript + ' ';
      }
      spokenWord = spokenWord.toLowerCase().trim();

      document.getElementById('display').innerHTML = <p>You said: <strong>${spokenWord}</strong></p>;

      // Clear previous images
      const displayArea = document.getElementById('display');
      const images = displayArea.getElementsByTagName('img');
      while (images.length > 0) {
          displayArea.removeChild(images[0]);
      }

      // Display corresponding image
      let imgElement;
      for (const [vehicle, imagePath] of Object.entries(vehicleImages)) {
          if (spokenWord.includes(vehicle)) {
              imgElement = document.createElement('img');
              imgElement.src = imagePath;
              imgElement.alt = vehicle.charAt(0).toUpperCase() + vehicle.slice(1);
              break;
          }
      }

      // Append the image if it exists
      if (imgElement) {
          displayArea.appendChild(imgElement);
      } else {
          displayArea.innerHTML += '<p>No image found for that word.</p>';
      }
  };

  recognition.onerror = function(event) {
      console.error(Recognition error: ${event.error});
      document.getElementById('display').innerHTML += <p>Error: ${event.error}</p>;
  };

  recognition.onend = function() {
      console.log('Speech recognition ended');
      document.getElementById('startStopBtn').innerText = 'Start Listening';
      document.getElementById('startStopBtn').classList.remove('stop');
      document.getElementById('startStopBtn').classList.add('start');
      isListening = false;
  };
}

function toggleListening() {
  const button = document.getElementById('startStopBtn');
  if (isListening) {
      recognition.stop();
  } else {
      recognition.start();
      button.innerText = 'Stop Listening';
      button.classList.remove('start');
      button.classList.add('stop');
  }
  isListening = !isListening;
}

// Initialize speech recognition
setupRecognition();
