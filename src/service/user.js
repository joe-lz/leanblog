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

// 关注
export const userFollow = ({ userid }) => {
  return new Promise((resolve, reject) => {
    var query = AV.User.current().followeeQuery()
    // query.include('followee')
    query.count().then((number) => {
      if (number > 50) {
        reject('超过最大关注人数(50人)')
      } else {
        AV.User.current()
          .follow(userid)
          .then(
            (res) => {
              resolve(res)
            },
            (error) => {
              // 异常处理
              reject('关注失败')
            }
          )
      }
    })
  })
}

// 取消关注
export const userUnFollow = ({ userid }) => {
  return new Promise((resolve, reject) => {
    AV.User.current()
      .unfollow(userid)
      .then(
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

// 获取我关注的用户列表
export const userFolloweeList = () => {
  return new Promise((resolve, reject) => {
    if (!AV.User.current()) {
      reject([])
    } else {
      var query = AV.User.current().followeeQuery()
      query.include('followee')
      query.find().then((followees) => {
        //关注的用户列表 followees
        resolve(followees)
      })
    }
  })
}
