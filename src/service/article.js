import AV from "leancloud-storage";

export const createArticle = (params) => {
  return new Promise((resolve, reject) => {
    const articles = new AV.Object("CMS_Articles");
    articles.set("status", 1);
    articles.set("user", AV.User.current());
    Object.keys(params).map((keyname) => {
      articles.set(keyname, params[keyname]);
    });
    // 将对象保存到云端
    articles.save().then(
      (res) => {
        resolve(res);
      },
      (error) => {
        // 异常处理
        reject(error);
      }
    );
  });
};

export const updateArticle = ({ articleItem, params }) => {
  return new Promise((resolve, reject) => {
    // articleItem.set("articleVal", articleVal);
    // articleItem.set("title", articleTitle);
    Object.keys(params).map((keyname) => {
      articleItem.set(keyname, params[keyname]);
    });
    articleItem.save().then(
      (res) => {
        resolve(res);
      },
      (error) => {
        // 异常处理
        reject(error);
      }
    );
  });
};

export const getArticleList = (params = {}) => {
  return new Promise((resolve, reject) => {
    const query = new AV.Query("CMS_Articles");
    query.descending("createdAt");
    query.limit(50);
    Object.keys(params).map((keyname) => {
      query.equalTo(keyname, params[keyname]);
    });
    query
      .find()
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

export const getArticleById = ({ id }) => {
  return new Promise((resolve, reject) => {
    const query = new AV.Query("CMS_Articles");
    query
      .get(id)
      .then((res) => {
        resolve(res);
      })
      .catch((err) => {
        reject(err);
      });
  });
};
