# Trantor Challenge

This exercise is used to help us evaluate Solution Architects looking to join Permutive.  We hope a take-home exercise offers you a fairer shot at demonstrating your ability: you'll be more relaxed than in an interview situation, and you'll be able to look-up things online - something we all do when working in the real world!

### Completing the tasks

Please create a pull-request into the `master` branch with your solution. For your solution you'll need to update two files:
- `solution/solution.js`
- `solution/notes.md`

In your pull request, please add notes including a brief explanation of your solution describing the decisions you've made, along with any assumptions. We like to give people a week, but if you feel you're finished before that please let us know!

> We don't expect people to know the answers to all of these questions. We fully expect you to use Google, Stackoverflow and all of the tools you normally would to solve problems like these. There are also *very* few right and wrong answers. Not knowing those answers doesn't make you bad at your job, in fact, not knowing the answer and then asking for help is one of the most positive signs for an engineer we know of 💖

## Tasks

### Notes for tasks 1. - 3.
  - Clone this repo and run the demo site locally. We suggest you use Python for this, for example by running `python -m SimpleHTTPServer 1234` (Python 2.x) or `python -m http.server 1234` (Python 3.x) from the website's root directory
  - Please submit your solution inside `solution/solution.js`
  - Note that our API enforces schema validation to prevent erroneous data being collected, so every event must conform to an event schema - otherwise the API will return a 400 error (you can take a look at the network response). Typically these schemas are configured in the Permutive dashboard, however we've already set up the event schemas for the `Pageview` and `Scroll` event types.

### 1. Track Pageview Events

  - Write some JavaScript to implement basic event tracking on every page, for `Pageview` events. These events should have properties for `title` (string), `author` (string) and `categories` (array of strings), whenever this information is available. If necessary, feel free to use a third-party library like jQuery to help with this.

### 2. Track Scroll Events [Optional]

  - Write some code to track a `Scroll` event. This event should fire as a user scrolls down the page, in 25% increments. For example, if a user scrolls to the bottom of a page, we'd expect 4 events to fire (at 25%, 50%, 75% and 100%).
  - The event should have a single property, `scroll_depth`, which should be represented as a fraction. For example, a `scroll_depth` of `0.5` indicates that the user has scrolled down half the page.

### 3. Implement a simple integration with a third-party

Using Permutive segments to target advertisements is a very common use case, which many of our customers use our platform for. An ad-server which is commonly used by publishers is DoubleClick For Publishers (DFP). This is Google's ad-server. Our demo website has DoubleClick installed on it, and you'll notice some ads being pulled in from DFP.

In this part of the challenge, you'll write an simple integration with DoubleClick for sending Permutive targeting data into DoubleClick ad-server alongside ad-requests. You're able to interact with DoubleClick's SDK JavaScript from the page, by making calls to the PubAdsService (`window.googletag.pubads()`). We suggest you use Google's [PubAdsService documentation](https://developers.google.com/doubleclick-gpt/reference#googletagpubadsservice) for this task.

What we've done:
  - We've set up a key-value in our DFP account, which targets a gaming ad whenever a specific key-value pair is sent as targeting data on the ad-request. The key we've configured is `permutive`, and the targeting value is `gaming`.
  - We've set up an ad slot on every article page on the demo publisher website. There is a default ad which is configured to be shown when no specific targeting data is present.
  - We've also set up a Permutive segment for `Gamers`, with segment ID *6912*. This segment consists of users who have at least one `Pageview` event where the `categories` list contained `gaming`.

What you'll need to do:
  - We'd like you to set up an integration with DFP, to ensure that our gaming key-value pair is passed into the ad-server as targeting data, whenever the user is in the `Gamers` Permutive segment. You may want to make use of JavaScript functions like [`permutive.segment`](https://developer.permutive.com/page/the-permutive-javascript-sdk#retrieving-individual-segments) and [`permutive.trigger`](https://developer.permutive.com/page/the-permutive-javascript-sdk#realtime-triggers) to retrieve a segment's current state or detect when a segment changes state.
  - To make sure `window.googletag.pubads()` is available at the time you run your code, you can set the key-value targeting inside the `window.googletag.cmd` callback. Copy the below snippet and set the targeting inside the callback function:
  ```javascript
  window.googletag = window.googletag || {};
  window.googletag.cmd = window.googletag.cmd || [];
  window.googletag.cmd.push(function () {
    // set targeting here
  });
  ```

### 4. Investigate Permutive loading time

The advertisement scenario described above is a very common use case for Permutive. Since Permutive keeps track of segment states in real-time, we're able to target users while they are on-site, even if it's their first visit.

Many of our customers even want to be able to target users from their very first pageview, i.e. to target ads served on the current page, using information about the current page.  For example, say we have a Permutive segment which is configured to target users who have "at least one Pageview event where `categories` property contains `Gaming`". This means that the Permutive script must load, a `Pageview` event must be tracked and segments must be updated *before* ad requests are made to the DoubleClick ad-server. If everything runs quickly enough, before ad-requests are made, the publisher will be able to target gaming-related ads to a user in the case where they've just arrived on a gaming article and it's their first time visiting the site.

Imagine a scenario where we've just deployed Permutive for a new publisher. Event tracking is set up and our DFP integration appears to be working, however the publisher tells us that they suspect we are not targeting users on their first pageview the majority of the time.

Inside `solution/notes.md` write a couple of paragraphs describing:
- How would you go about investigating the issue?
- What factors could cause Permutive to load more slowly than DFP ads?
- Are there things the publisher may be able to change with their website/deployment, to improve the situation?
- Are there things we may be able to change on our end, to make Permutive load faster?
