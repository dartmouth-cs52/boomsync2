const levels = [
  {
    level: 0,
    initialCode: '// write your code here',
    instructions: [
      `Welcome to <b>boomsync</b>! Learn async JavaScript by throwing boomerangs at birds.`,
      `Call <code>throwBoomerang()</code> to throw. You can optionally pass a callback: <code>throwBoomerang(callback)</code> which runs when the boomerang returns.`,
      `Try it now — call <code>throwBoomerang()</code> and click Submit!`,
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
    initialCode: 'setTimeout( /* write your code here */ );',
    instructions: [
      `Throwing immediately is too early! You need to wait <b>1000 ms</b>.`,
      `Use <code>setTimeout(callback, ms)</code> — it calls the callback function after the delay.`,
      `Pass <code>throwBoomerang</code> (without parentheses!) as the callback.`,
      `<b>Think:</b> Why does <code>setTimeout(throwBoomerang(), 1000)</code> throw immediately? What do the <code>()</code> do?`,
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
      `The power of async: do multiple things at once!`,
      `You have <b>2 boomerangs</b>. Throw one immediately, and use <code>setTimeout</code> to throw another after <b>500 ms</b>.`,
      `Both boomerangs are in the air simultaneously — that's async!`,
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
      `Now you only have <b>1 boomerang</b> — wait for it to return before throwing again.`,
      `Pass a callback to <code>throwBoomerang(callback)</code> that runs when it returns.`,
      `<i>Hint: Can you make it recursive?</i>`,
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
      `<b>Arrow functions:</b> <code>() => { ... }</code> creates an anonymous function inline.`,
      `Hit the bird, then trigger <code>alert('dinner!')</code> when the boomerang returns.`,
      `<b>Think:</b> Why can't we just pass <code>alert('dinner!')</code> directly as the callback?`,
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
      `<b>Error handling:</b> In async JS, callbacks receive <code>(err, data)</code> — error first!`,
      `The first bird will <b>break your boomerang</b>. Call <code>fixBoomerangs()</code> when <code>err</code> is truthy.`,
      `Birds at: <b>0 ms</b> (breaks!), <b>2000 ms</b>, <b>4000 ms</b>. Handle the error, then use <code>setTimeout</code> for the rest.`,
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
      `<b>Promises</b> make async code cleaner: <code>.then()</code> for success, <code>.catch()</code> for errors.`,
      `A Promise wraps an async operation. Call <code>resolve()</code> on success, <code>reject()</code> on error.`,
      `Study the code above — it wraps <code>throwBoomerang</code> in a Promise. Add a <code>throwBoomerang()</code> call inside <code>.then()</code> to hit the second bird.`,
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
    initialCode: `// This helper wraps throwBoomerang in a Promise
const promiseBoomerang = () => {
  return new Promise((resolve, reject) => {
    throwBoomerang((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

promiseBoomerang().then(() => {
  // throw another boomerang here
})`,
    instructions: [
      `<b>Reusable Promise wrapper:</b> A function that returns <code>new Promise(...)</code>.`,
      `Study <code>promiseBoomerang()</code> above — it wraps the callback pattern in a Promise.`,
      `Call it in <code>.then()</code> to throw another boomerang when the first resolves.`,
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
    initialCode: `const promiseBoomerang = () => {
  return new Promise((resolve, reject) => {
    throwBoomerang((err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

promiseBoomerang()
  .catch(() => fixBoomerangs())`,
    instructions: [
      `<b>Promise error handling:</b> Use <code>.catch()</code> instead of checking <code>err</code> in every callback.`,
      `Birds at <b>0 ms</b> (breaks!), <b>2000 ms</b>, <b>4000 ms</b>. Handle the break with <code>.catch()</code>, use <code>setTimeout</code> for the rest.`,
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
      `<b>async/await</b> makes Promises look like synchronous code!`,
      `Mark a function <code>async</code>, then use <code>await</code> to pause until a Promise resolves.`,
      `<code>promiseBoomerang()</code> is available. Add another <code>await promiseBoomerang()</code> to hit both birds.`,
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
    level: 10,
    instructions: [
      `<b>Final challenge!</b> Birds at <b>0, 2000, 4000, 6000 ms</b> — all break your boomerang!`,
      `Create a helper function that uses <code>promiseBoomerang()</code> with <code>.catch()</code> to fix errors. Good luck!`,
    ],
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
