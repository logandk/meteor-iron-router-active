Template.registerHelper('isActive', function(view) {
  if (!(view instanceof Spacebars.kw)) {
    throw new Error("isActive options must be key value pair such " +
                    "as {{isActive route='home'}}. You passed: " +
                    JSON.stringify(view));
  }

  var options = _.extend({
    className: '',
    regex: false,
    inverse: false,
    route: '',
    path: '',
    data: _.extend({}, this)
  }, view.hash);

  check(options, {
    className: Match.Optional(String),
    regex: Match.Optional(Boolean),
    inverse: Match.Optional(Boolean),
    route: Match.Optional(String),
    path: Match.Optional(String),
    data: Match.Optional(Object)
  });

  if (_.isEmpty(options.className)) {
    options.className = options.inverse ? 'disabled' : 'active';
  }

  if (_.isEmpty(options.route) && _.isEmpty(options.path)) {
    throw new Error("isActive requires a route or path to be specified, such " +
                    "as {{isActive route='home'}}. You passed: " +
                    JSON.stringify(view));
  }

  var controller = Router.current();
  if (!controller) return false;

  var current, pattern;

  if (options.route) {
    if (!controller.route) return false;
    current = controller.route.getName();
    pattern = options.route;
  } else {
    current = controller.location.get().path;
    pattern = options.path;
  }

  var test = false;

  if (options.regex) {
    var re = new RegExp(pattern, 'i');
    test = re.test(current);
  } else {
    test = (current == pattern);
  }

  if (!_.isEmpty(options.data) && controller.route && test) {
    _.each(controller.route.handler.compiledUrl.keys, function (keyConfig) {
      var key = keyConfig.name;
      if (_.has(options.data, key)) {
        if (test) test = (options.data[key] == controller.params[key]);
      }
    });
  }

  if ((!options.inverse && test) || (options.inverse && !test)) {
    return options.className;
  } else {
    return false;
  }
});
