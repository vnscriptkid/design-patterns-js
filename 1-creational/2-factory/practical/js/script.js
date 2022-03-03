(function (win, $) {
  var RedCircle = function () {
      this.item = $('<div class="circle"></div>');
    },
    BlueCircle = function () {
      this.item = $(
        '<div class="circle" style="background-color: blue;"></div>'
      );
    },
    CircleFactory = function () {
      this.create = function (color) {
        if (color === "red") {
          return new RedCircle().item;
        } else if (color === "blue") {
          return new BlueCircle().item;
        } else {
          throw new Error("Unsupported color.");
        }
      };
    };

  var CircleGeneratorSingleton = (function () {
    var instance;

    function init(color) {
      var _allCircles = [],
        _stage = $(".advert"),
        _circleFactory = new CircleFactory();

      function create(x, y, color = "red") {
        var circle = _circleFactory.create(color);
        _position(circle, x, y);
        return circle;
      }

      function _position(circle, x, y) {
        circle.css("left", x);
        circle.css("top", y);
      }

      function add(circle) {
        _allCircles.push(circle);
        _stage.append(circle);
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
      // var circle = $('<div class="circle"></div>');
      // circle.css("left", e.pageX - 25);
      // circle.css("top", e.pageY - 25);
      // $(".advert").append(circle);
      var circleGenerator = CircleGeneratorSingleton.getInstance();
      var circle = circleGenerator.create(e.pageX - 25, e.pageY - 25);
      circleGenerator.add(circle);
    });

    $(document).keypress(function (e) {
      if (e.key === "a") {
        var circleGenerator = CircleGeneratorSingleton.getInstance();
        var circle = circleGenerator.create(
          Math.random() * 600,
          Math.random() * 600,
          "blue"
        );
        circleGenerator.add(circle);
      }
    });
  });
})(window, jQuery);
