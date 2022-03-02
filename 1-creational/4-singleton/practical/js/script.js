(function (win, $) {
  var CircleGeneratorSingleton = (function () {
    var instance;

    function init() {
      var _allCircles = [],
        _stage = $(".advert");

      function create(left, top) {
        var circle = $('<div class="circle"></div>');
        _position(circle, left, top);
        return circle;
      }

      function _position(circle, left, top) {
        circle.css("left", left);
        circle.css("top", top);
      }

      function add(circle) {
        _stage.append(circle);
        _allCircles.push(circle);
        console.log(_allCircles);
      }

      return {
        create,
        add,
      };
    }

    return {
      getInstance() {
        if (!instance) instance = init();

        return instance;
      },
    };
  })();

  $(win.document).ready(function () {
    $(".advert").click(function (e) {
      //   var circle = $('<div class="circle"></div>');
      //   circle.css("left", e.pageX - 25);
      //   circle.css("top", e.pageY - 25);
      //   $(".advert").append(circle);
      const generator = CircleGeneratorSingleton.getInstance();
      var circle = generator.create(e.pageX - 25, e.pageY - 25);
      generator.add(circle);
    });

    $(document).keypress(function (e) {
      if (e.key === "a") {
        const generator = CircleGeneratorSingleton.getInstance();
        var circle = generator.create(Math.random() * 600, Math.random() * 600);
        generator.add(circle);
      }
    });
  });
})(window, jQuery);
