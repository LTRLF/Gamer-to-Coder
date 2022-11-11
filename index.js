async function getDataFromAPI() {
  const minigames = await fetch(
    "https://gamertocoder.garena.co.th/api/minigames"
  )
    .then((response) => {
      if (response.status !== 200) {
        return response.status;
      }
      return response.json();
    })
    .then((data) => {
      if (typeof data == "number") {
        alert(data);
      } else {
        return data;
      }
    });
  const minigameLinks = await fetch("./minigame_link.json")
    .then((response) => {
      if (response.status !== 200) {
        return response.status;
      }
      return response.json();
    })
    .then((data) => {
      if (typeof data == "number") {
        alert(data);
      } else {
        return data;
      }
    });
  showMinigames(minigames, minigameLinks);

  const assets = await fetch("https://gamertocoder.garena.co.th/api/assets")
    .then((response) => {
      if (response.status !== 200) {
        return response.status;
      }
      return response.json();
    })
    .then((data) => {
      if (typeof data == "number") {
        alert(data);
      } else {
        return data;
      }
    });
}

getDataFromAPI();

function showMinigames(data, links) {
  for (let i = 0; i < data.length; i++) {
    const currentData = data[i];
    const filteredLink = links.filter(
      (value) => value.name === currentData.name
    );
    // console.log(filteredLink);
    if (filteredLink.length == 1) {
      var currentLink = filteredLink[0].link;
    } else {
      var currentLink = null;
    }
    // console.log(currentLink);
    const newListItem = document.createElement("li");
    newListItem.classList.add("card");
    const genre_array = currentData.genre;
    let genre_string = genre_array[0];
    if (genre_array.length > 1) {
      for (let j = 1; j < genre_array.length; j++) {
        genre_string = genre_string + ", " + genre_array[j];
      }
    }
    if (currentLink == null) {
      var html =
        '<div class="name" onclick="changeName(' +
        currentData.name +
        ')"> ชื่อ: ' +
        currentData.name +
        "</div>" +
        '<img src="' +
        currentData.icon +
        '"/>' +
        "<div>ประเภท: " +
        genre_string +
        "</div>" +
        '<div class="detail">' +
        currentData.description +
        "</div>";
    } else {
      var html =
        '<div class="name" onclick="changeName(' +
        currentData.name +
        ')"> ชื่อ: ' +
        currentData.name +
        "</div>" +
        '<img src="' +
        currentData.icon +
        '"/>' +
        "<div>ประเภท: " +
        genre_string +
        "</div>" +
        '<div class="detail">' +
        currentData.description +
        "</div>" +
        '<a href="' +
        currentLink +
        '">link</a>';
    }

    html.trim();
    newListItem.innerHTML = html;
    document.getElementById("minigames-list").appendChild(newListItem);
  }
}
