//map

//success on getting the location
function success(position) {
  const { latitude, longitude } = position.coords;
  const coords = [latitude, longitude];

  map = L.map("map").setView(coords, 13);

  L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  }).addTo(map);

  L.marker(coords).addTo(map).bindPopup("Jogging").openPopup();
}

//get current location
const currLocation = navigator.geolocation.getCurrentPosition(success, () =>
  alert("unable to get location")
);
