# start

- curl: -X POST https://leancloud.cn/1.1/engine/groups/web/production/version?gitTag=${{ github.sha }}&token=${{ secrets.DEPLOY_TOKEN }}
- https://github.com/marketplace/actions/dispatch-action