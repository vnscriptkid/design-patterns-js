(function (win, $) {
  function Circle() {
    this.item = $('<div class="circle"></div>');
  }

  Circle.prototype.tint = function (clr) {
    this.item.css("background-color", clr);
  };

  Circle.prototype.move = function (x, y) {
    this.item.css("left", x);
    this.item.css("top", y);
  };

  Circle.prototype.get = function () {
    return this.item;
  };

  function RedCircleBuilder() {
    this.item = new Circle();
    this.init();
  }

  RedCircleBuilder.prototype.init = function () {
    // NOTHING, RED BY DEFAULT
  };

  RedCircleBuilder.prototype.get = function () {
    return this.item;
  };

  function BlueCircleBuilder() {
    this.item = new Circle();
    this.init();
  }

  BlueCircleBuilder.prototype.init = function () {
    this.item.tint("blue");
  };

  BlueCircleBuilder.prototype.get = function () {
    return this.item;
  };

  function GreenCircleBuilder() {
    this.item = new Circle();
    this.init();
  }

  GreenCircleBuilder.prototype.init = function () {
    this.item.tint("green");
  };

  GreenCircleBuilder.prototype.get = function () {
    return this.item;
  };

  var CircleFactory = function () {
    this.types = {}; // { type: cls }, exp: { red: RedCircle }

    this.create = function (type = "red") {
      if (type in this.types) {
        return new this.types[type]().get();
      }
      console.log(type + " is not registered yet!");
      return {};
    };

    this.register = function (type, cls) {
      if ("init" in cls.prototype && "get" in cls.prototype) {
        this.types[type] = cls;
      } else {
        throw new Error(cls + " must contain init() and get() method!");
      }
    };
  };

  var CircleGeneratorSingleton = (function () {
    var instance;

    function init() {
      var _allCircles = [],
        _stage = $(".advert"),
        _circleFactory = new CircleFactory();

      _circleFactory.register("red", RedCircleBuilder);
      _circleFactory.register("blue", BlueCircleBuilder);
      _circleFactory.register("green", GreenCircleBuilder);

      function create(x, y, color) {
        var circle = _circleFactory.create(color);
        _position(circle, x, y);
        return circle;
      }

      function _position(circle, x, y) {
        circle.move(x, y);
      }

      function add(circle) {
        _allCircles.push(circle);
        _stage.append(circle.get());
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
