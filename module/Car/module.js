const AutoModel = require('./model/autoModel');
const AutoController = require('./controller/autoController');
const AutoRepository = require('./repository/autoRepository');
const AutoService = require('./service/autoService');

function init(app, container) {
  const controller = container.get('AutoController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  AutoModel,
  AutoController,
  AutoRepository,
  AutoService,
};
