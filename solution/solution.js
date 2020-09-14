//Grab article attributes to pass in Pageview tracking:
function getTitle () {
  const titleClass = document.getElementsByTagName("h2");
  console.log(`titleclass: ${titleClass}`)
  const title = titleClass.innerText;
  console.log(`property returned: ${title}`)
  return title;
};

  // const titleClass = document.getElementsByClassName("content");
  // const title = titleClass.querySelector("h2").textContent

function getAuthor() {
  const authorElem = document.getElementsByTagName("b");
  console.log(`author element: ${authorElem}`)
  const authorText = authorElem.innerText;
  console.log(`property returned: ${authorText}`)
  return authorText;
};

// const options = {
//   success: function(event) {
//     console.log("Tracked a new " + event.name + " event.");
//     console.log(event)
//   },
//   error: function(errors) {
//   }
// }
//
// // Track an "EmailSubscription" event, with the property
// // `newletter` set as `true`.
// permutive.track('Pageview', {
//   title: getTitle(),
//   author: getAuthor(),
//   categories: ["string1", "string2", "string3"]
// },options);

/* API Fetch:
fetch ('https://api.permutive.com/v2.0/events', {
    method: 'POST',
    headers: {
        'X-API-Key': '0a1c1596-66d2-4939-9955-3c04dab4b0e2',
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      "user_id": "8cc26071-25a7-4033-b2c6-ff0fcb5e04a3",
      "name": "EmailSubscription",
      "properties": {
        "email": "mark@facebook.com",
        "subscriptions": {
          "newsletter": true,
          "updates": false
        }
      }
    })
});
*/

permutive.segments(function(segments) {
  for (var idx in segments) {
    // The user is currently in this segment
    console.log("User is currently in Permutive segment: " + segments[idx]);
  }
});
//GET THE PERMUTIVE ID:
console.log(localStorage.getItem("permutive-id"))


//google publisher tag
//window.googletag.pubads()
