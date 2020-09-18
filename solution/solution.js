//wait for HTML to load before running permutive script to ensure data is available.
window.addEventListener('load', function () {

//calculate height of rendered page to track scroll event
function getDocHeight() {
  let D = document;
  return Math.max(
      D.body.scrollHeight, D.documentElement.scrollHeight,
      D.body.offsetHeight, D.documentElement.offsetHeight,
      D.body.clientHeight, D.documentElement.clientHeight
  )
}
//Grab article title to pass in Pageview tracking:
function getTitle () {
  const titleClass = document.getElementsByTagName("h2")[0];
  let title = titleClass.innerText;
  return title;
};
//Grab article author to pass in Pageview tracking:
function getAuthor() {
  const authorElem = document.getElementsByTagName("b")[0];
  const authorText = authorElem.innerText;
  return authorText;
};
//use Segment module to check if user enters gamer segment configured in Dashboard
function setGamerSeg () {
  permutive.segment(6912, function(result) {
  if (result) {
    console.log(`2) Response returned in permutve.segment -if is gamer segment: ${result}`)
    getGamerAd();
  } else {
    console.log(`segment doesnt return gamer - served default`)
  }
});
};
//send first party attribute into DFP, passing key/value to fetch target add to render
function getGamerAd () {
  //google publisher tag
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  window.googletag.cmd.push(function () {
  window.googletag.pubads().setTargeting('permutive', 'gaming');
  googletag.enableServices();
  console.log( `3) pubads called with segment data `)
  });
}

//Use Track module to pass metadata to permutive (title, author, categories); then
//pass segment module to check against gamer profile.
//function trackPageview () {
const options = {
  success: function(event) {
    //console.log returns event data collected.
    console.log(`1) success callback in Permutive.track: ${JSON.stringify(event)}`)
    setGamerSeg();
  },
  error: function(errors) {
    console.log(`failure callback ${JSON.stringify(errors)}`)
  }
}
  permutive.track('Pageview', {
  title: getTitle(),
  author: getAuthor(),
  categories: ["gaming", "string2", "string3"]
}, options);
//};

function trackScroll (scrollVal) {
  const scrollOpt = {
    success: function() {
      console.log(`4) reached scrollval ${scrollVal/100}`)
    },
    error: function(errors) {
      console.log(`failure callback ${JSON.stringify(errors)}`)
    }
  }
  permutive.track('Scroll', {
    scroll_depth: (scrollVal/100)
  },scrollOpt)
}

function amountscrolled(){
  let winheight= window.innerHeight || (document.documentElement || document.body).clientHeight
  let docheight = getDocHeight()
  let scrollTop = window.pageYOffset || (document.documentElement || document.body.parentNode || document.body).scrollTop
  let trackLength = docheight - winheight
  let pctScrolled = Math.floor(scrollTop/trackLength * 100) // gets percentage scrolled (ie: 80 or NaN if tracklength == 0)
  if (pctScrolled % 25 == 0 && pctScrolled !== 0) {
    console.log(pctScrolled + '% scrolled')
    trackScroll(pctScrolled)
  }
}
window.addEventListener("scroll", function(){
  amountscrolled()
}, false)

}) // End of window.load
