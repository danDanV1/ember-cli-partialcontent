import { module, test } from "qunit";
import fetch from "fetch";

module("Unit | video-header", function(hooks) {
  // Replace this with your real tests.
  test("check response header from CDN", async function(assert) {
    const response = await fetch(
      "https://d2w6cdbrmkexx8.cloudfront.net/developer/View_From_A_Blue_Moon_Trailer-576p-22-to-29sec.webm",
      {
        headers: {
          range: "bytes=0-",
          "cache-control": "no-cache",
          pragma: "no-cache"
        }
      }
    )
      .then(function(response) {
        return response;
      })
      .catch(function(error) {});

    //log all the headers available
    for (var pair of response.headers.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    assert.equal(response.status, 206, "has 206 response");

    /*
    should contain the following headers:
    accept-ranges: bytes
    Content-Length: 2732878
    Content-Range: bytes 0-2732877/2732878
    status: 206 

    However, fetch is restricted to return only the following headers in a CORS request
    Cache-Control
    Content-Language
    Content-Type
    Expires
    Last-Modified
    Pragma
    */
  });

  test("check response header from localhost", async function(assert) {
    const response = await fetch(
      "assets/videos/View_From_A_Blue_Moon_Trailer-576p-22-to-29sec.webm",
      {
        headers: {
          range: "bytes=0-",
          "cache-control": "no-cache",
          pragma: "no-cache"
        }
      }
    )
      .then(function(response) {
        return response;
      })
      .catch(function(error) {});

    //log all the headers available
    for (var pair of response.headers.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    assert.equal(response.status, 206, "has 206 response");
    assert.equal(
      response.headers.get("accept-ranges"),
      "bytes",
      "has accept-ranges header"
    );
    assert.equal(
      response.headers.get("Content-Range"),
      "bytes 0-2732877/2732878",
      "has content-ranges header"
    );

    /*
    should contain:     
    accept-ranges: bytes
    Content-Length: 2732878
    Content-Range: bytes 0-2732877/2732878
    status: 206 

    Since this is local host, we should be able to test for them.
    */
  });
});
