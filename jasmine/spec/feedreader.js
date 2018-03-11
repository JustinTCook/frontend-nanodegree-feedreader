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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
         it('contains url', function(){
           allFeeds.forEach( function(item){
             expect(item.url).toBeDefined();
             expect(item.url).not.toBe('');
           });
         });

        /* Test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
         it('has name', function(){
           allFeeds.forEach( function(item){
             expect(item.name).toBeDefined();
             expect(item.name).not.toBe('');
           });
         });
    });


    describe('The menu', function(){
      var body,
          menu;

      beforeEach(function(){
        body = $('body');
        menu = $('a.menu-icon-link');
      });

      /* Test that ensures the menu element is
       * hidden by default. You'll have to analyze the HTML and
       * the CSS to determine how we're performing the
       * hiding/showing of the menu element.
       */
       it('is hidden by default', function(){
         expect(body.attr('class')).toContain('menu-hidden');
       });

       /* Test that ensures the menu changes
        * visibility when the menu icon is clicked. This test
        * should have two expectations: does the menu display when
        * clicked and does it hide when clicked again.
        */
        it('visibility changes when clicked', function(){
          menu.click();
          expect(body.attr('class')).not.toContain("menu-hidden");

          menu.click();
          expect(body.attr('class')).toContain("menu-hidden");
        });
    });

    describe('Initial Entries', function(){

      beforeEach(function(done){
        loadFeed(0, function(){
          done();
        });
      });

        /* Test that ensures when the loadFeed
         * function is called and completes its work, there is at least a single entry*/
         it('has at least a single entry', function(done){
           var entries = $('.feed').find('.entry-link');

           expect(entries.length).toBeGreaterThan(0);
           done();
         });
    });

    /* TODO: Write a new test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
      var initialFeed;

      beforeEach(function(done){
        loadFeed(0, function(){
          intialFeed = $('.feed').html();

          loadFeed(1, done);
        });
      });

        /* Test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.*/
         it('changes when selection is made', function(){
           var newFeed = $('.feed').html();
           expect(newFeed).not.toBe(initialFeed);
         });
     });
}());
