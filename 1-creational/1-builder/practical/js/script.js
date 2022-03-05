(function (win, $) {
  // assume creating circle involves many steps => perfect use case for builder
  // todo: create Circle constructor, with getters, setters for color, position
  // todo: create RedCircleBuilder, BlueCircleBuilder, that provides interfaces for building circle in many steps

  var CircleFactory = function () {
    this.types = {}; // { type: cls }, exp: { red: RedCircle }

    this.create = function (type = "red") {
      if (type in this.types) {
        return new this.types[type]().create();
      }
      console.log(type + " is not registered yet!");
      return {};
    };

    this.register = function (type, cls) {
      if ("create" in cls.prototype) {
        this.types[type] = cls;
      } else {
        throw new Error(cls + " must contain create method!");
      }
    };
  };
  function RedCircle() {}
  RedCircle.prototype.create = function () {
    return $('<div class="circle"></div>');
  };
  function BlueCircle() {}
  BlueCircle.prototype.create = function () {
    return $('<div class="circle" style="background-color: blue;"></div>');
  };
  function GreenCircle() {}
  GreenCircle.prototype.create = function () {
    return $('<div class="circle" style="background-color: green;"></div>');
  };

  var CircleGeneratorSingleton = (function () {
    var instance;

    function init() {
      var _allCircles = [],
        _stage = $(".advert"),
        _circleFactory = new CircleFactory();

      // todo: register CircleBuilder instead
      _circleFactory.register("red", RedCircle);
      _circleFactory.register("blue", BlueCircle);
      _circleFactory.register("green", GreenCircle);

      function create(x, y, color) {
        // todo: expect circle here is instance of Circle instead, not jQuery object
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
        // todo: as circle returned from create() is Circle instance, fix below
        _stage.append(circle);
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
      var circleGenerator = CircleGeneratorSingleton.getInstance();
      var circle = circleGenerator.create(e.pageX - 25, e.pageY - 25, "red");
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
      } else if (e.key === "b") {
        var circleGenerator = CircleGeneratorSingleton.getInstance();
        var circle = circleGenerator.create(
          Math.random() * 600,
          Math.random() * 600,
          "green"
        );
        circleGenerator.add(circle);
      }
    });
  });
})(window, jQuery);
