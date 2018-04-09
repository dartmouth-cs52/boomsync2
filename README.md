# BoomSync

A game to teach you asynchronous Javascript!

## How do I play?
Check it out at [http://boomsync.surge.sh/](http://boomsync.surge.sh/)!
![demo gif](./docs/demo.gif)

## Support

Please [open an issue](https://github.com/irenelfeng/boomsync/issues/new) for support.

## Local Setup

```bash
yarn
yarn start
```

## Deploying
Call `yarn build` to build, and use [surge](https://surge.sh) to deploy.

`yarn deploy`
Note that in order to support routers that use HTML5 pushState API, we use a 200.html in addition to index.html. This ensures that every URL falls back to that file.

## Contributing

Please contribute (add a level?) using [Github Flow](https://guides.github.com/introduction/flow/). Create a branch, add commits, and [open a pull request](https://github.com/timofei7/boomsync2/compare/).
