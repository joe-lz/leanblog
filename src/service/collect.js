import AV from 'leancloud-storage'

export const createCollect = (params = {}) => {
  return new Promise((resolve, reject) => {
    const collects = new AV.Object('CMS_Collects')
    collects.set('user', AV.User.current())
    collects.set('article', params.article)
    // 将对象保存到云端
    collects.save().then(
      (res) => {
        resolve(res)
      },
      (error) => {
        // 异常处理
        reject(error)
      }
    )
  })
}

export const deleteCollect = (params = {}) => {
  return new Promise((resolve, reject) => {
    params.collect.destroy().then(() => {
      resolve()
    })
  })
}

export const countCollect = (params = {}) => {
  return new Promise((resolve, reject) => {
    const query = new AV.Query('CMS_Collects')
    query.equalTo('user', AV.User.current())
    query.equalTo('article', params.article)

    query.count().then((number) => {
      resolve(number)
    })
  })
}

export const getMyCollect = (params = {}) => {
  return new Promise((resolve, reject) => {
    const query = new AV.Query('CMS_Collects')
    query.equalTo('user', AV.User.current())
    query.equalTo('article', params.article)
    query
      .first()
      .then((res) => {
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
