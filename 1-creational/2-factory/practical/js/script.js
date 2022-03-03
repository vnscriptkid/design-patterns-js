(function (win, $) {
  function RedCircle() {}

  RedCircle.prototype.create = function () {
    this.item = $('<div class="circle"></div>');
    return this;
  };

  function BlueCircle() {}

  BlueCircle.prototype.create = function () {
    this.item = $('<div class="circle" style="background-color: blue;"></div>');
    return this;
  };

  var CircleFactory = function () {
    this.types = {};

    this.create = function (type) {
      return new this.types[type]().create();
    };
    this.register = function (type, cls) {
      if (cls.prototype.create) {
        console.log("Registered: ", type, cls);
        this.types[type] = cls;
      }
    };
  };

  var CircleGeneratorSingleton = (function () {
    var instance;

    function init(color) {
      var _allCircles = [],
        _stage = $(".advert"),
        _circleFactory = new CircleFactory();

      _circleFactory.register("red", RedCircle);
      _circleFactory.register("blue", BlueCircle);

      function create(x, y, color = "red") {
        var circle = _circleFactory.create(color).item;
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
