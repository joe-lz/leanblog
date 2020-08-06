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


export const updateUserInfo = ({ userinfoItem, params }) => {
  return new Promise((resolve, reject) => {
    Object.keys(params).map((keyname) => {
      userinfoItem.set(keyname, params[keyname])
    })
    userinfoItem.save().then(
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
