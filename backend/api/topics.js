const bcrypt = require("bcrypt-nodejs");
const sp = require("synchronized-promise");

module.exports = app => {
  const { existsOrError, notExistsOrError } = app.api.validation;

  const save = async (req, res) => {
    let topic = { ...req.body.body };

    console.log(topic);
    if (req.params.id) topic.id = req.params.id;
    existsOrError(topic.title, "Título não informado");
    existsOrError(topic.content, "Conteudo não informado");
    existsOrError(topic.userId, "Usuário não informado");
    existsOrError(topic.topicCategory, "Categoria principal não informada");

    console.log(topic);
    console.log(!topic.categoriesTagged);
    topic.createAt = new Date();

    // Caso não exista Tags associadas
    const promiseSearchTopic = () => {
      return app
        .db("topics")
        .select()
        .where({ id: topic.id })
        .then(topicDB => {
          topic = topicDB[0];
          console.log(topic);
          promiseSearchTopicCategory();
        });
    };

    const promiseSearchTopicCategory = () => {
      return app
        .db("topicsCategories")
        .select()
        .where({ topicId: topic.id })
        .then(topicCategoryDB => {
          topic.categoriesTagged = topicCategoryDB;
          res.json(topic);
        })
        .catch(err => res.status(400).send(err));
    };

    if (!topic.categoriesTagged) {
      topic.categoriesTagged = [topic.topicCategory];
    }

    // Casos existam tags if (topic.id) {
    //Flowchart Guarde as tags -> delete todas do banco -> atualize o topic -> readicione as tags -> trate o json -> Envie o Json
    if (topic.id) {
      let categoriesTagged = topic.categoriesTagged;
      delete topic.categoriesTagged;

      const promiseDeleteTopicCategories = () => {
        return app
          .db("topicsCategories")
          .where("topicId", topic.id)
          .del()
          .then(resp => {
            promiseUpdateTopic();
          });
      };

      const promiseUpdateTopic = () => {
        return app
          .db("topics")
          .where("id", topic.id)
          .update(topic)
          .then(resp => {
            console.log(resp);
            promiseInsertTopicCategory();
          });
      };

      const promiseInsertTopicCategory = () => {
        let preQuerie =
          "INSERT INTO topicsCategories(topicId, categoriesId) VALUES ";
        categoriesTagged.forEach(category => {
          preQuerie = preQuerie.concat(`( ${topic.id} , ${category}  ),`);
        });

        preQuerie = preQuerie.substring(0, preQuerie.length - 1).concat(";");
        console.log(preQuerie);

        return app.db.raw(preQuerie).then(_ => promiseSearchTopic());
      };

      promiseDeleteTopicCategories();
    } else {
      console.log(topic);
      console.log(topic.categoriesTagged);
      let categoriesTagged = topic.categoriesTagged;
      delete topic.categoriesTagged;

      const promiseInsertTopic = () => {
        return app
          .db("topics")
          .insert(topic)
          .then(id => {
            topic.id = id[0];
            console.log("topic id = ", topic.id);
            console.log("id[0] =", id[0]);
            promiseInsertTopicCategory();
          })
          .catch(err => {
            console.log(err);
          });
      };

      const promiseInsertTopicCategory = () => {
        let preQuerie =
          "INSERT INTO topicsCategories(topicId, categoriesId) VALUES ";
        categoriesTagged.forEach(category => {
          preQuerie = preQuerie.concat(`( ${topic.id} , ${category}  ),`);
        });

        preQuerie = preQuerie.substring(0, preQuerie.length - 1).concat(";");
        console.log(preQuerie);

        return app.db.raw(preQuerie).then(_ => promiseSearchTopic());
      };

      promiseInsertTopic();
    }
  };

  const getById = (req, res) => {
    let topic = {};
    topic.id = req.params.id;

    const searchTopicsCategories = () => {
      return app
        .db("topicsCategories")
        .select()
        .where("topicId", topic.id)
        .then(resp => {
          topic.categoriesTagged = resp;
          res.json(topic);
        })
        .catch(res.status(500).send(err));
    };

    const searchTopics = () => {
      return app
        .db("topics")
        .select()
        .where({ id: topic.id })
        .then(resp => {
          console.log(resp[0]);
          topic = resp[0];
          searchTopicsCategories();
        })
        .catch(res.status(500));
    };

    searchTopics();
  };

  let limit = 12;
  const getMostRecent = (req, res) => {
    let page = parseInt(req.query.page) || 0;
    const offset = page => {
      return page * limit;
    };
    let settedOffset = offset(page);
    console.log("set offset: ", settedOffset);
    preQuerie = `SELECT * FROM topics ORDER BY createAt DESC LIMIT ${settedOffset} , ${limit};`;

    app.db
      .raw(preQuerie)
      .then(resp => {
        let data = {};
        data.page = page;
        data.data = resp[0];
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };

  const getMostReplyededs = (req, res) => {
    let page = parseInt(req.query.page) || 0;
    const offset = page => {
      return page * limit;
    };
    let settedOffset = offset(page);
    console.log("set offset: ", settedOffset);
    preQuerie = `SELECT * FROM topics ORDER BY numerOfReplies DESC LIMIT ${settedOffset}, ${limit};`;
    app.db
      .raw(preQuerie)
      .then(resp => {
        let data = {};
        data.page = page;
        data.data = resp[0];
        console.log(data);
        res.json(data);
      })
      .catch(err => {
        res.status(500).send(err);
      });
  };

  return { save, getById, getMostRecent, getMostReplyededs };
};
