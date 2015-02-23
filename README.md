# [Meteor](https://github.com/meteor/meteor) template helper for detecting the active [iron:router](https://github.com/eventedmind/iron-router) route
![Code Climate](https://img.shields.io/codeclimate/github/logandk/meteor-iron-router-active.svg)

This package is based on the excellent [zimme:iron-router-active](https://github.com/zimme/meteor-iron-router-active) package. After adding some features and modifying the original package, it ended up being mostly rewritten. I decided to release this as a separate package for people with similar use cases as myself.

A single template helper is exposed by this package: `isActive`. Check the usage instructions below.

## Install
```sh
meteor add logandk:iron-router-active
```

## Usage
Insert the `isActive` helper either inside a class attribute or an `#if` statement. Either a route or path must be specified.
```handlebars
{{isActive route='index'}}
```

## Options
The following options may be provided to the `isActive` helper.

### Route/path specifier (mandatory)

One of the `route`/`path` parameters must be specified. By default, the function will return `active` if there is a match.

```handlebars
{{isActive route='movies.all'}}
{{isActive path='/movies/all'}}
```

### Custom class name

Use the `className` parameter to override the default class name (`active`).

```handlebars
{{isActive route='movies.all' className='on'}}
```

### Regular expression matching

Set the `regex` parameter to `true` in order to enable regular expression matching.

```handlebars
{{isActive route='^movies' regex=true}}
```

### Inverted matching

Set the `inverse` parameter to `true` in order to invert matching. This change the default to return `disabled` if there is no match. This default can be changed using the `className` parameter.

```handlebars
{{isActive route='movies' inverse=true}}
{{isActive route='movies' className='off' inverse=true}}
```

### Data context

Just like the `pathFor` helper in `iron:router`, a data context can be specified. This will cause any parameters in the route url to be matched against the corresponding attributes of the context object. By default, the current template context is passed, so the first two examples below are identical.

```handlebars
{{isActive route='movies.show'}}
{{isActive route='movies.show' data=this}}
{{isActive route='movies.show' data=movie}}
```


## Example
```handlebars
<nav>
  <ul>
    <li class="{{isActive route='dashboard'}}">...</li>
    <li class="{{isActive path='/profile'}}">...</li>
    <li class="{{isActive route='^user' regex=true}}">...</li>
    {{#each users}}
      <li class="{{isActive route='user.show'}}">...</li>
    {{/each}}
    <li class="{{isActive route='products' className='on'}}">...</li>
    {{#if isActive route='index'}}
      <li>...</li>
    {{/if}}
    <li class="{{isActive route='dashboard' inverse=true}}">...</li>
  </ul>
</nav>
```

## License

MIT
