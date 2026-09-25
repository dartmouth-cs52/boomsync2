const levels = [
  {
    level: 0,
    hints: [
      'Type <code>throwBoomerang()</code> in the editor and hit Submit. That really is the whole level.',
      `Don't forget the parentheses: <code>throwBoomerang</code> on its own just names the function,
      <code>throwBoomerang()</code> actually calls it. Remember that difference, you'll need it next level.`,
    ],
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
    hints: [
      '<code>setTimeout</code> wants a function it can call <i>later</i>, not the result of calling one right now.',
      `<code>throwBoomerang()</code> runs immediately and hands <code>setTimeout</code> whatever it returns (<code>undefined</code>).
      <code>throwBoomerang</code> with no parentheses hands over the function itself.`,
      'So the shape is <code>setTimeout(____, 1000);</code> where the blank is the function name, no parentheses.',
    ],
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
    hints: [
      `You don't have to wait for the first boomerang to come back before throwing the second one.
      That's the whole point of async!`,
      'Throw one right away, then use <code>setTimeout</code> to throw the second one 500 ms later.',
      `The line after <code>throwBoomerang()</code> runs right away, it doesn't wait for the boomerang.
      Your <code>setTimeout</code> just <i>schedules</i> the second throw.`,
    ],
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
    hints: [
      `Throw right away for the first bird. The second bird needs a throw 3 s later,
      which is exactly when your boomerang gets back.`,
      '<code>throwBoomerang</code> calls whatever function you pass it once the boomerang returns.',
      `Pass it a function that throws again. <code>throwBoomerang(throwBoomerang)</code> works, and so does
      <code>throwBoomerang(() => throwBoomerang())</code>.`,
    ],
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
    hints: [
      `Try <code>throwBoomerang(alert('dinner!'))</code> first and watch when the alert pops up.
      Before the boomerang even leaves your hand, right?`,
      `<code>alert('dinner!')</code> runs the moment JavaScript reads it, same trap as
      <code>setTimeout(throwBoomerang(), 1000)</code> back in level 2.`,
      'Wrap it in a function so it runs later: <code>() => alert(\'dinner!\')</code>',
    ],
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
    hints: [
      `The first bird is a tough one and it breaks your boomerang. When the broken boomerang comes back,
      your callback gets an error as its first argument.`,
      'Inside <code>if (err) { }</code>, call <code>fixBoomerangs()</code> so it is ready to throw again.',
      `Then schedule the other two throws at the top level of your code, <i>not</i> inside the callback
      (that runs 3 s later, and your delays would start from there):
      <code>setTimeout(throwBoomerang, 2000)</code> and <code>setTimeout(throwBoomerang, 4000)</code>.`,
    ],
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
    hints: [
      `The wrapper is already written for you. <code>.then</code> runs when the promise resolves,
      which is when the boomerang comes back.`,
      'Put a <code>throwBoomerang()</code> inside the <code>.then</code> callback to throw again as soon as it lands.',
      `Notice <code>promiseBoomerang</code> here is a promise, not a function. It started the throw the moment
      it was created, and it only ever resolves once. You can't "call it again" to throw again.`,
    ],
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
    hints: [
      `This time <code>promiseBoomerang</code> is a function that returns a <i>new</i> promise every call,
      so each <code>promiseBoomerang()</code> throws a new boomerang. That fixes last level's one-shot promise.`,
      'Same birds as last level: throw again as soon as the first one comes back.',
      `Call <code>promiseBoomerang()</code> again inside the <code>.then</code>.
      Returning it (<code>.then(() => promiseBoomerang())</code>) lets you keep chaining.`,
    ],
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
    hints: [
      'The first bird breaks your boomerang, so the first promise rejects. <code>.catch</code> is where you handle that.',
      'The starter code already fixes the boomerang in <code>.catch</code>. You still need two more throws.',
      `Schedule them at the top level, like you did with callbacks (not inside the <code>.catch</code>):
      <code>setTimeout(promiseBoomerang, 2000)</code> and <code>setTimeout(promiseBoomerang, 4000)</code>.`,
    ],
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
    hints: [
      '<code>await promiseBoomerang()</code> pauses <code>hunt</code> until the boomerang is back. The next line runs 3 s later.',
      `Same birds as level 4, and a round trip takes 3 s.
      So the second throw should go the moment the first <code>await</code> finishes.`,
      'Add another <code>await promiseBoomerang();</code> before the <code>alert</code>.',
    ],
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
    hints: [
      'Every bird breaks a boomerang, so every throw needs a <code>.catch</code> that calls <code>fixBoomerangs()</code>.',
      'Write a little function that throws <i>and</i> handles its own error, then call it four times.',
      `Birds come every 2 s but a boomerang takes 3 s to come back, so you can't wait for each one to return.
      Schedule your function with <code>setTimeout</code> at 0, 2000, 4000 and 6000.`,
    ],
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
