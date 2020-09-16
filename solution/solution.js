window.addEventListener('load', function () {


  //Grab article attributes to pass in Pageview tracking:
  function getTitle () {
    const titleClass = document.getElementsByTagName("h2")[0];
    console.log(`titleclass: ${titleClass}`)
    let title = titleClass.innerText;
    console.log(`Title returned: ${title}`)
    return title;
  };

  function getAuthor() {
    const authorElem = document.getElementsByTagName("b")[0];
    console.log(`author element: ${authorElem}`)
    const authorText = authorElem.innerText;
    console.log(`Author returned: ${authorText}`)
    return authorText;
  };

  const options = {
    success: function(event) {
      console.log(`success callback ${JSON.stringify(event)}`)
    },
    error: function(errors) {
      console.log(`failure callback ${JSON.stringify(errors)}`)
    }
  }

  // // Track an "EmailSubscription" event, with the property
  // // `newletter` set as `true`.
  permutive.track('Pageview', {
    title: getTitle(),
    author: getAuthor(),
    categories: ["string1", "string2", "string3"]
  }, options);

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

/*
  function segTest () {
    permutive.segment(6912, function(result) {
      if (result) {
        //call on trigger? to launch
        console.log(`user is in ${result}`)
      } else {
        console.log('else reached')
      }
    });
  }

  permutive.trigger(6912, "result", function(obj){
  if (obj.result) {
    $("#email-subscription-popup").show();
    permutive.track("ShownEmailSubscriptionPopup", {});
  }
});
*/


permutive.segment(6912, function(result) {
  if (result) {
    permutive.trigger(6912, "result", function(obj){
    if (obj.result) {
      getGamerAd()
      //TODO: FIND OUT ABOUT track in body:
      //permutive.track("ShownEmailSubscriptionPopup", {});
    }
  });    //console.log(`user is in ${result}`) 
  } else {
    console.log('else reached')
  }
});

  //GET THE PERMUTIVE ID:
  //console.log(localStorage.getItem("permutive-id"))

  //Test to get segment ID (6912);
  //console.log(`the permutive data in localStorage: ${(localStorage.getItem("permutive-data"))}`)

function getGamerAd (){
  //google publisher tag
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  window.googletag.cmd.push(function () {
  // set targeting here - Page-level targeting.
  window.googletag.pubads().setTargeting('permutive', 'gaming');
  googletag.enableServices();
  });
}


}) // End of window.load
