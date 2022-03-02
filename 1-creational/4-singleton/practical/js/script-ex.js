// TODO: 2 outstanding facts about singleton?
(function (win, $) {
  var CircleGeneratorSingleton = (function () {
    function init() {
      // TODO: internal datastructure to store all circles
      // TODO: store the container as well

      function create(left, top) {
        // TODO: implement
      }

      function add(circle) {
        // TODO: implement
      }

      // TODO: public interface of generator object is:
      // 1. create(): create a circle, position it
      // 2. add(circle): put circle into the container, store in generator's internal data structure
    }

    return {
      getInstance() {
        // Only when getInstance is called, then instance is initialized
        // TODO: add logic
      },
    };
  })();

  $(win.document).ready(function () {
    $(".advert").click(function (e) {
      //   var circle = $('<div class="circle"></div>');
      //   circle.css("left", e.pageX - 25);
      //   circle.css("top", e.pageY - 25);
      //   $(".advert").append(circle);
      // TODO: convert code above into singleton with below API
      //   const generator = CircleGeneratorSingleton.getInstance();
      //   var circle = generator.create(e.pageX - 25, e.pageY - 25);
      //   generator.add(circle);
    });

    $(document).keypress(function (e) {
      // TODO: get the singleton instance in another place of the APP
      // TODO: create circle and store it when keypress is 'a'
    });
  });
})(window, jQuery);
