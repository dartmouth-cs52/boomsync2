const levels = [
  {
    level: 0,
    initialCode: '// write your code here',
    instructions: [
      `Welcome to boomsync, where we will learn how to
      program asynchronously in Javascript by throwing boomerangs at birds.
      We are avid bird hunters and need your help. `,
      `To throw a boomerang, call <code>throwBoomerang()</code>.
      You can optionally include a callback parameter <code>throwBoomerang(callback)</code>,
      which will be executed once the boomerang returns.`,
      `For now, just give <code>throwBoomerang()</code> a try in the code editor
      below and click 'Submit' to knock down a bird!`,
    ],
    events: [
      {
        type: 'bird',
        time: 1000,
      },
    ],
  },
  {
    level: 1,
    before: 'chill(1000, () => {\n// write your code here\n});',
    initialCode: 'setTimeout( /* write your code here */ );',
    instructions: [
      'For this level, if you throw the boomerang right away you\'ll be too early.',
      'You\'ll need to throw a boomerang in <b>1000</b> ms.',
      `Javascript has a function <code>setTimeout(callback, delayTimeInMilliSeconds)</code>.
      It takes in two parameters: the first is a <i>function</i> to be called later
      and the second parameter is the number if ms to wait.`,
      'Welcome to <i>callback</i> functions.',
      `The optional parameter we can give to <code>throwBoomerang()</code> is also a callback.
      Callbacks are everywhere in asynchronous Javascript`,
      `In the editor below, try waiting for <b>1000</b> ms and putting
      <code>throwBoomerang</code> as the callback.`,
      'Note: <code>setTimeout(throwBoomerang(), 1000)</code> will throw the boomerang immediately',
      'Why might that be?  Hint: What does <code>functioname()</code> do?',
    ],
    events: [
      {
        type: 'bird',
        time: 2000,
      },
    ],
  },
  {
    level: 2,
    initialCode: 'throwBoomerang()\n//write your code here',
    instructions: [
      `Great, now you've used your first callback!
      However, this code did not take full advantage of the power of
      asynchronous execution, which is that while you're waiting for something
      to return, you can work on something else.`,
      `In this level you have 2 boomerangs,
      you'll need to throw a second boomerag before the first one returns.
      The first bird is coming so that if you throw one boomerang right away, you'll get it.`,
      'To hit the second one, you\'ll need to wait 500 ms before throwing.',
    ],
    events: [
      {
        type: 'bird',
        time: 1000,
      },
      {
        type: 'bird',
        time: 1500,
      },

    ],
  },
  {
    level: 3,
    initialCode: 'throwBoomerang( /* write your code here */ );',
    instructions: [
      `What if you want to trigger something when the function completes?
      This is a perfect use for a callback.
      `,
      `The optional parameter we can give to <code>throwBoomerang()</code> is also a callback.
      <code>throwBoomerang</code> will run that callback function when it is done.
      `,
      `In this scenario pretend you only have 1 boomerang so you have to wait for it come back before
      you throw it again. It so happens the bird timing is just right... <i> hint: it can be recursive</i>`,

    ],
    events: [
      {
        type: 'bird',
        time: 1000,
      },
      {
        type: 'bird',
        time: 4000,
      },
    ],
  },

  {
    level: 4,
    initialCode: 'throwBoomerang( () => { \n//your code here \n});',
    instructions: [
      `You may have noticed a different notation sometimes used for creating functions in JS.
      Something that looks like: <code>(args) => { /* do something /* }</code>`,
      'This is called arrow notation for creating an anonymous function.',
      `In this level there is just one bird,
      but you want to triggger an <code>alert('dinner!')</code>
      when the function completes. `,
      'What would have happened if we just put the alert in as a callback without wrapping it in an anonymous function?',
    ],
    events: [
      {
        type: 'bird',
        time: 1000,
      },
    ],
  },

  {
    level: 5,
    initialCode: 'throwBoomerang((err) => {\n\tif (err) {\n\t\t// write your code here\n\t}\n})',
    instructions: [
      'Great use of an anonymous function!',
      `But our boomerangs are taking a beating after killing so many birds.
      Our boomerangs might break at a random time!
      The conventional way we deal with errors in asynchronous javascript is that if an error occurs during the execution of a function,
      the error will return in the first parameter of the callback (with data optionally in the second).
      You could get the value of the data by giving your arrow function <code>(err, data)</code> parameters).`,
      `There are 3 birds in this round, but you only have 2 boomerangs.
      One you can kill immediately, one you can kill after waiting for 2000 ms,
      and one you can kill after chilling for 4000 ms.`,
      `The first one will break your boomerang, but in the real hunting world,
      and coding world, you never know when tragedy will strike: best practice obviously is to handle errors always!`,
      'We\'ve written out part of the first throwBoomerang function for you: call <code>fixBoomerangs()</code> to handle potential errors.',
    ],
    events: [
      {
        type: 'brokenbird',
        time: 1000,
      },
      {
        type: 'bird',
        time: 3000,
      },
      {
        type: 'bird',
        time: 5000,
      },
    ],
  },
  {
    level: 6,
    initialCode: `const promiseBoomerang = new Promise((resolve,reject) => {
throwBoomerang((error, result) => {
    if (error) {
      reject(error);
    } else {
      resolve(result);
    }
  });
});
promiseBoomerang.then(() => {
   //write code here
})
.catch(error => fixBoomerangs());`,
    instructions: [
      'Awesome job! Next: Promises.',
      'Promises help us write more legible asynch code using <code>.then()</code> notation.',
      `A Promise is an object representing some asynchronous
      operation, and it can be either pending, fullfilled, or rejected. If a promise is fullfilled,
      it resolves (optionally with a particular value). If a promise fails (rejects), it
      is rejected with an error. The wrapping of our function in an object allows us to separate errors from successes.`,
      `To make a promise, we construct a Promise object which takes in one parameter:
      a function with two callbacks, a resolve and reject. The function should be asynchronous that
      resolves on success and rejects with some kind of error.
      We can handle successes by calling <code>.then</code> on the Promise object, and errors with <code>.catch</code>.`,
      `To throw a boomerang right after the promise fulfills and we get our boomerang back,
      make another anonymous function that calls <code>throwBoomerang()</code> within <code>.then</code>.`,
    ],
    events: [
      {
        type: 'bird',
        time: 1000,
      },
      {
        type: 'bird',
        time: 4000,
      },

    ],
  },
  {
    level: 7,
    initialCode: `const promiseBoomerang = bluebird.promisify(throwBoomerang)
promiseBoomerang().then(() =>{\n\t \n})`,
    instructions: [
      'Awesome job! Promises are really great, but they can take a lot of code to create wrappers if you already have a function that uses the usual <code>(err, callback)</code> format.',
      `In this example, you can use a library called <code>bluebird</code> to convert
      a function that takes a callback to a promise. Once you create that object using <code>.promisify(fn)</code>,
      You register what it should resolve with <code>.then</code>
      and reject with <code>.catch</code> as usual.`,
      'The birds come at the same time as the previous level, so throw a boomerang right when the promise from the first boomerang resolves.',
    ],
    events: [
      {
        type: 'bird',
        time: 1000,
      },
      {
        type: 'bird',
        time: 4000,
      },

    ],
  },
  {
    level: 8,
    initialCode: 'const promiseBoomerang = bluebird.promisify(throwBoomerang)\npromiseBoomerang()\n\t.catch(() => fixBoomerangs())',
    instructions: [
      'Can we replicate some error catching code that we did with callbacks, but with promises? Sure thing: if the promise returned from <code>throwBoomerang()</code> rejects,',
      'we can add a <code>.catch()</code> function to our function to do some error handling.',
      `There are 3 birds in this round: one you can kill immediately, one you can kill after chilling for 2000 ms,
      and one you can kill after chilling for 4000 ms.`,
    ],
    events: [
      {
        type: 'brokenbird',
        time: 1000,
      },
      {
        type: 'bird',
        time: 3000,
      },
      {
        type: 'bird',
        time: 5000,
      },
    ],
  },
  {
    level: 9,
    instructions: [
      'There is another way that in some cases looks cleaner than promises',
      'async/await!',
      'with async/await you can use the keyword <code>async</code> to mark a function as being asynchronous',
      'and then you can use <code>await</code> to "wait" on promises',
      'rather than using <code>.then</code> notation',
      'in this example we\'ll have the <code>promiseBoomerang</code> function already available',
      'Note how each line the async function runs after the previous await finishes.',
    ],
    events: [
      {
        type: 'bird',
        time: 1000,
      },
      {
        type: 'bird',
        time: 4000,
      },

    ],
    initialCode: `
async function hunt(){
  await promiseBoomerang();
  // your code here
  alert('done');
}

hunt();`,
  },
  {
    level: 11,
    instructions: [`Out of levels! Nice bird hunting. In this level there are birds at: immediately, 2000, 4000, 6000
      and they are all tough birds, breaking your boomerang every time. Good luck.`],
    initialCode: '// write your code here',
    solution: `
const bp = () => {
  promiseBoomerang().catch((err) => {
    if (err) fixBoomerangs();
  });
}
bp();
setTimeout(bp, 2000);
setTimeout(bp, 4000);
setTimeout(bp, 6000);`,
    events: [
      {
        type: 'brokenbird',
        time: 1000,
      },
      {
        type: 'brokenbird',
        time: 3000,
      },
      {
        type: 'brokenbird',
        time: 5000,
      },
      {
        type: 'brokenbird',
        time: 7000,
      },

    ],
  },

];


export default levels;
