import { module, test } from "qunit";
import { setupRenderingTest } from "ember-qunit";
import { render, find, waitUntil } from "@ember/test-helpers";
import hbs from "htmlbars-inline-precompile";

module("Integration | Component | video-cdn", function(hooks) {
  setupRenderingTest(hooks);

  test("can seek video from CDN", async function(assert) {
    await render(hbs`
    <video crossorigin="" playsinline="" poster="//images.unsplash.com/photo-1544985361-b420d7a77043?w=1920&amp;h=1080&amp;fit=crop&amp;crop=entropy&amp;cs=tinysrgb&amp;q=60&amp;fm=pjpg" preload="none" class="plyr_target" src="https://d2w6cdbrmkexx8.cloudfront.net/developer/View_From_A_Blue_Moon_Trailer-576p-22-to-29sec.webm">
      </video>
    `);

    let videoElement = find("video");

    videoElement.load();

    //seek to 6 seconds
    videoElement.currentTime = 6;

    await waitUntil(
      function() {
        //wait until there is enough content to play
        if (videoElement.readyState >= 3) {
          return true;
        }
      },
      { timeout: 5000 }
    );

    assert.equal(
      videoElement.currentTime,
      6,
      "seeking to 6 seconds was a success"
    );
  });
});
