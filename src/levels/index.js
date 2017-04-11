const levels = [
  {
    "level": 0,
    "initialCode": "// write your code here",
    "instructions": [
      `Welcome to boomsync, where we will learn how to
      program asynchronously in Javascript by throwing boomerangs at birds.
      We are avid bird hunters and need your help. `,
      `To throw a boomerang, call <code>throwBoomerang()</code>.
      You can optionally include a callback parameter <code>throwBoomerang(callback)</code>,
      which will be executed once the boomerang returns.`,
      `For now, just give <code>throwBoomerang()</code> a try in the code editor
      below and click 'Submit' to knock down a bird!`
    ],
    "events": [
      {
        "type": "bird",
        "time": 1000
      }
    ]
  },
  {
    "level": 1,
    "initialCode": "chill(1000, () => {\n// write your code here\n});",
    "instructions": [
      `For this level, if you throw the boomerang right away you'll be too early.`,
      `You'll need to throw a boomerang in <b>1000</b> ms.`,
      `We've provided you a second function called <code>chill</code>.
      <code>chill(waitTime, callback)</code>
      takes in two parameters: the first is how long to wait in milliseconds before
      the function in the second parameter is called.`,
      `This is called a <i> callback </i> function.`,
      `The optional parameter we can give to <code>throwBoomerang()</code> is also a callback.
      Callbacks are everywhere in asynchronous Javascript`,
      `In the editor below, try chilling for <b>1000</b> ms and putting
      <code>throwBoomerang</code> in the callback.`,
      `Note: <code>chill(1000, throwBoomerang())</code> will throw the boomerang immediately`
    ],
    "events": [
      {
        "type": 'bird',
        "time": 2000
      }
    ]
  },
  {
    "level": 2,
    "initialCode": "throwBoomerang()\n//write your code here",
    "instructions": [
      `Great job! However, this code did not take full advantage of the power of
      asynchronous execution, which is that while you're waiting for something
      to return, you can work on something else.`,
      `In this level, you'll need to throw a second boomerag before the first one returns.
      The first bird is coming so that if you throw one boomerang right away, you'll get it.`,
      `To hit the second one, you'll need to wait 500 ms before throwing.`
    ],
    "events": [
      {
        "type": 'bird',
        "time": 1000
      },
      {
        "type": 'bird',
        "time": 1500
      },

    ]
  },
  {
    "level": 3,
    "initialCode": "const promiseThrow = bluebird.promisify(throwBoomerang)\npromiseThrow().then(() => throwBoomerang())",
    "instructions": [
      `Awesome job! Next: Promises. A Promise is an object representing some asynchronous
      operation, and it can be either pending, fullfilled, or rejected. If a promise is fullfilled,
      it resolves (optionally with a particular value). If a promise fails (rejects), it
      is rejected with an error.`,
      `In this example, you can use a library called <code>bluebird</code> to convert
      a function that takes a callback to a function that returns a promise. Once you have
      a promise, you register what it should resolve and reject with <code>.then</code>
      and <code>.catch</code>.`,
      `We've done this one for you while you're getting used to promises, so just press
      submit and give it a go.`
    ],
    "events": [
      {
        "type": 'bird',
        "time": 1000
      },
      {
        "type": 'bird',
        "time": 4000
      },

    ]
  },
  {
    "level": 4,
    "initialCode": "const promiseThrow = bluebird.promisify(throwBoomerang)\npromiseThrow()\n\t.catch(fixBoomerangs)",
    "instructions": [
      `Whew! This is fun. But our boomerangs are taking a beating after killing so many birds. Our boomerangs might break at a random time!
      We need to do something in case this happens, i.e. if the promise returned from <code>throwBoomerang()</code> rejects.`,
      `Instead of a <code>.then()</code>, let's add a <code>.catch()</code> function to our function that will repair the boomerang if it breaks.
      The function we call in our catch is <code>fixBoomerangs()</code> `,
      `There are 3 birds in this round: one you can kill immediately, one you can kill after chilling for 2000 ms,
      and one you can kill after chilling for 4000 ms. (we've programmed that the one you kill immediately will break your boomerang, but
      in the real hunting world, and coding world, you never know when tragedy will strike: best practice if you catch for all three!)`,
    ],
    "events" : [
      {
        "type": 'brokenbird',
        "time": 1000,
      },
      {
        "type": 'bird',
        "time": 3000,
      },
      {
        "type": 'bird',
        "time": 5000,
      },
    ]
  },
  {
    "level": 5,
    "initialCode": "",
    "instructions": [
      `Aren't promises lovely? You know what else is lovely?
      Love! (Love)Birds are coming in pairs this time, so we need to throw two boomerangs at a time.`,
      `Throw two pairs of boomerangs at a time: one `,
      `Love is also very unexpected, so now there are a random number of birds `
    ]
  }

]


export default levels
