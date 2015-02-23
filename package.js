Package.describe({
  name: 'logandk:iron-router-active',
  version: '1.0.0',
  summary: 'Meteor template helper for detecting the active iron:router route',
  git: 'https://github.com/logandk/meteor-iron-router-active',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@1.0');
  api.use(['check', 'templating', 'underscore', 'iron:router@1.0.0'], 'client');
  api.imply('iron:router');
  api.addFiles('helper.js', 'client');
});
