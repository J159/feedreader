/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

// $() function ensures DOM is loaded before tests run.
$(function() {
    // Test Suite "RSS Feeds"
    describe('RSS Feeds', function() {
      // Test: Ensures allFeeds object is defined and not 0.
      it('are defined', function() {
          expect(allFeeds).toBeDefined();
          expect(allFeeds.length).not.toBe(0);
      });

      // Test: Loop through each feed in allFeeds object and ensures it has a URL defined. URL length must not be 0.
      it('has a url', function() {
        for(let feed of allFeeds) {
          expect(feed.url).toBeDefined();
          expect(feed.url.length).not.toBe(0);
        }
      });

      // Test: Loops through each feed in allFeeds object and ensures it has a name defined. Feed length must not be 0.
      it('has a name', function() {
        for(let feed of allFeeds) {
          expect(feed.name).toBeDefined();
          expect(feed.name.length).not.toBe(0);
        }
      });
    });

    // Test Suite "The menu"
    describe('The menu', function() {
      // Test: Checks whether menu element is hidden by default, must contain 'menu-hidden' class.
      it('is hidden by default', function() {
        let menuHidden = document.body.classList.contains('menu-hidden');
        expect(menuHidden).toBe(true);
      });

      // Test: Menu changes visibility when menu icon is clicked.
      it('changes visibility when menu icon is clicked', function() {
        let body = document.querySelector('body');
        let menu = document.querySelector('.menu-icon-link');

        // first click reveals menu
        menu.click();
        expect(body.classList.contains('menu-hidden')).toBe(false);

        // second click hides menu
        menu.click();
        expect(body.classList.contains('menu-hidden')).toBe(true);
      });
    });


    // Test Suite "Initial Entries"
    describe('Initial Entries', function() {
      // Test: Verify feed container has at least one entry. Feed's children length will be greater than 0. Note: LoadFeed() is asynchronous.
      beforeEach(function(done) {
        loadFeed(0, done);
      });

      it('has at least one entry within the feed container', function() {
        let feed = document.querySelectorAll('.feed .entry');
        expect(feed.length).toBeGreaterThan(0);
      });
    });

    // Test Suite "New Feed Selection"
    describe('New Feed Selection', function() {
      // Test that ensures a new feed is loaded and content actually changes. Expects feed1 to be different from feed2. Note: loadFeed() is asynchronous
      let feed1, feed2;

      beforeEach(function(done) {
        loadFeed(0, function() {
          feed1 = document.querySelector('div.feed').innerHTML;
          loadFeed(1, function() {
            feed2 = document.querySelector('div.feed').innerHTML;
            done();
          });
        });
      });

      it('loads a new feed', function() {
        expect(feed1).not.toBe(feed2);
      });
    });

}());
