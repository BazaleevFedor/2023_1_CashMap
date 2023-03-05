(function () {
  const template = Handlebars.template; const templates = Handlebars.templates = Handlebars.templates || {}
  templates.header = template({
    compiler: [8, '>= 4.3.0'],
    main: function (container, depth0, helpers, partials, data) {
      let helper; const alias1 = depth0 != null ? depth0 : (container.nullContext || {}); const alias2 = container.hooks.helperMissing; const alias3 = 'function'; const alias4 = container.escapeExpression; const lookupProperty = container.lookupProperty || function (parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName]
        }
        return undefined
      }

      return '<div class="search-area-wrap">\n    <div class="search-area">\n        <img src="static/img/search.svg" alt="">\n        <input class="search-input" placeholder="Найти">\n    </div>\n</div>\n\n<div class="notification-icon">\n    <img class="header-icon" src="static/img/noticeUnread.svg" alt="">\n</div>\n\n<div class="profile-icon">\n    <a href=' +
    alias4(((helper = (helper = lookupProperty(helpers, 'profileUrl') || (depth0 != null ? lookupProperty(depth0, 'profileUrl') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { name: 'profileUrl', hash: {}, data, loc: { start: { line: 13, column: 12 }, end: { line: 13, column: 28 } } }) : helper))) +
    '>\n        <img class="header-icon" src=' +
    alias4(((helper = (helper = lookupProperty(helpers, 'avatar') || (depth0 != null ? lookupProperty(depth0, 'avatar') : depth0)) != null ? helper : alias2), (typeof helper === alias3 ? helper.call(alias1, { name: 'avatar', hash: {}, data, loc: { start: { line: 14, column: 37 }, end: { line: 14, column: 49 } } }) : helper))) +
    '>\n    </a>\n</div>\n\n<div class="profile-menu-icon">\n    <img class="header-icon" src="static/img/menu.svg">\n</div>\n'
    },
    useData: true
  })
})()
