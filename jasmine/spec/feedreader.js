/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */

         // Test to ensures that the allFeeds variable is defined and not empty
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


         //Test to ensures that each feed in the allFeeds  has a url and url is not empty
        it("URL is not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url.length).not.toBe(0);
            });
        });

         //Test to ensures that each feed in the allFeeds  has a name and name is not empty
        it("Name is not empty", function() {
            allFeeds.forEach(function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name.length).not.toBe(0);
            });
        });
    });


    //New test suites named "The menu"
    describe("The menu", function() {

       //Test to entries that the menu hidden by default
        it("the menu element hidden by default", function() {
            expect($('body').hasClass('menu-hidden')).toBeTruthy();
        });

        // Test to ensure that the menu appear and hidden.
        it('the menu changes visibility', function() {
         // Trigger event on menu
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeFalsy();
         // Trigger event on menu
            $('.menu-icon-link').trigger('click');
            expect($('body').hasClass('menu-hidden')).toBeTruthy();

        });
    });

    //A new test suites named "Initial Entries"
    describe("Initial Entries", function() {

       // Call loadFeed() for initial entries
        beforeEach(function(done) {
            loadFeed(0, done);
        });

       // Test to ensure there is at least a single .entry element within the .feed container.
        it('has been loaded', function(done) {
            expect($('.feed').children().length).toBeGreaterThan(0);
            done();
        });
    });


      // A new test suite named "New Feed Selection"
    describe("New Feed Selection", function(){
        var current;
        var after;

       //beforeEach wait for async calls to finish
        beforeEach(function(done) {
            //Load the first feed
            loadFeed(0 ,function() {
              //Save content of feed to variable
              current = $('.feed').html();
              //Load second feed
              loadFeed(1, function() {
                //Save contentof feed to variable
                after = $('.feed').html();
                done();
              });
            });
        });

        //Test to ensure that content are different
        it('changes content' , function(done) {
            expect(current != after).toBe(true);
            done();
        });
    });

}());