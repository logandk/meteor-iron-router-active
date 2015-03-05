Template.registerHelper('isActive', function(view) {
  if (!(view instanceof Spacebars.kw)) {
    throw new Error("isActive options must be key value pair such " +
                    "as {{isActive route='home'}}. You passed: " +
                    JSON.stringify(view));
  }

  var options = (view && view.hash) || {};
  var className = options.className || '';
  var regex = options.regex || false;
  var inverse = options.inverse || false;
  var route = options.route || '';
  var path = options.path || '';
  var data = _.extend({}, options.data || this);

  check(className, Match.Optional(String));
  check(regex, Match.Optional(Boolean));
  check(inverse, Match.Optional(Boolean));
  check(route, Match.Optional(String));
  check(path, Match.Optional(String));
  check(data, Match.Optional(Object));

  if (_.isEmpty(className)) {
    className = inverse ? 'disabled' : 'active';
  }

  if (_.isEmpty(route) && _.isEmpty(path)) {
    throw new Error("isActive requires a route or path to be specified, such " +
                    "as {{isActive route='home'}}. You passed: " +
                    JSON.stringify(view));
  }

  var controller = Router.current();
  if (!controller) return false;

  var current, pattern;

  if (route) {
    if (!controller.route) return false;
    current = controller.route.getName();
    pattern = route;
  } else {
    current = controller.location.get().path;
    pattern = path;
  }

  var test = false;

  if (regex) {
    var re = new RegExp(pattern, 'i');
    test = re.test(current);
  } else {
    test = (current == pattern);
  }

  if (!_.isEmpty(data) && controller.route && test) {
    _.each(controller.route.handler.compiledUrl.keys, function (keyConfig) {
      var key = keyConfig.name;
      if (_.has(data, key)) {
        if (test) test = (data[key] == controller.params[key]);
      }
    });
  }

  if ((!inverse && test) || (inverse && !test)) {
    return className;
  } else {
    return false;
  }
});
