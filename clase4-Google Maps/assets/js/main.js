window.initMap = () => {
  // The location of Uluru
  //const maimo = { lat: -34.78504, lng: -58.62823 };
  const example = { lat: -34.624921, lng: -58.424549 };

  // The map, centered at Uluru
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 12,
    center: example,
    styles: styles,
    streetViewControl: false,

    fullscreenControl: false,

    mapTypeControlOptions: {
      mapTypeIds: [],
    },

    zoomControlOptions: {
      position: google.maps.ControlPosition.LEFT_CENTER,
    },
  });
  fetchMarkers(map);

  // The marker, positioned at Uluru
  //const marker = new google.maps.Marker({position: maimo, map: map});
};

const addMarkers = () => {};

const fetchMarkers = async (map) => {
  try {
    const response = await fetch("assets/data/markers.json");

    const json = await response.json();

    json.forEach((marker) => {
      addMarker(map, marker);
    });
  } catch (error) {
    console.log(error);
  }
};

const addMarker = (map, marker) => {
  console.log(marker);
  const { lat, lng, website, name, type, description} = marker;
  const contentString = `<div><h2>${name}</h2><h3>${type}</h3><p>${description}</p><address><a href='${website}'>${website != "#" ? website : "Sin sitio web"}</a></address></div>`;
  var infowindow = new google.maps.InfoWindow({
    content: contentString,
  });
  const icons = {
      'Juegos': "assets/img/gaming.png",
      'Articulos': "assets/img/articles.png",
      'Cartas': "assets/img/cards.png"
  }

  const markerItem = new google.maps.Marker({
    position: { lat, lng },
    icon: icons[type],
    map: map,
  });
  markerItem.addListener("click", function () {
    infowindow.open(map, markerItem);
  });
  markerItem.setMap(map);
};
