import AV from 'leancloud-storage'

export const getMyUserInfo = (params = {}) => {
  return new Promise((resolve, reject) => {
    const query = new AV.Query('CMS_UserInfo')
    const curUser = AV.User.current()
    query.equalTo('user', curUser)
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
