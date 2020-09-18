
  How would you go about investigating the issue?

  > There are several ways to diagnose potential problems.
  A simple console log can display the sequence of calls/responses and the payloads as shown below:

  ![Console log responses](../assets/img/PermConsoleLog.png)

  >Additionally, a waterfall view of network response times will show a trace of request made, duration for each, responses and status codes.
  We can drill down and validate expected behaviors are taking place. ie. Correct segment ID are captured, validate headers, the right schema is passed to Permutive, etc.
  With a network trace we can try to reproduce the issue and see the time it takes for permutive to finish its tracking function, pass the data to segment and finally pass segment tags to the DFP ad server.`

  ![Network Responses](../assets/img/PermNetworkResp.png)

  What factors could cause Permutive to load more slowly than DFP ads?

  >While Permutive loads asyncronously to optimize data processing, certain function calls may add to the response time. Data may have to be calculated, parsed and passed to permutive before a response is returned, if this does not happen quickly enough, the first party data will not be passed. As an example, segment data is checked against a profile that was configured in the Permutive Dashboard, that journey to POST/GET may be slower than fetching DFP ads. For this same reason bandwidth and payload size might have on impact on load speeds.

  Are there things the publisher may be able to change with their website/deployment, to improve the situation?
  > Ultimately the goal is to have the segment rendered and ready to pass into DFP before the default ad gets triggered, there is potential for the publisher to prioritize script placement or by adding preload and prefetch tags. (https://developer.mozilla.org/en-US/docs/Web/HTML/Preloading_content). Additionally optimizing heavier resources like images or implementing async / non -blocking scripts can be an option.

  Are there things we may be able to change on our end, to make Permutive load faster?
  >Assuming there are no outside constraints, Permutive can take measures to cache data where possible to avoid extra API calls over the network. (The trade-off here is memory allocation on the client side can degrade experience.)
  As an async based services, execution of calls should happen as quickly as possible. Further compression on JSON objects can reduce the payload size.
  On the backend, resources like databases should be optimized for latency.
