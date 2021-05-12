import immutagen from 'immutagen';

type MonadParam = {
  pure: Function,
  bind: Function,
};

const Monad = ({ pure, bind }: MonadParam) => {
  const genConsume = gen => input => {
    const { value, next: nextGen } = gen(input);

    if(!nextGen)
      return pure(value);

    return bind(value, genConsume(nextGen));
  }

  return {
    Do(gen) {
      return genConsume(immutagen(gen))(null);
    }
  }
}

const arrayMonad = Monad({
  pure: x => [x],
  bind: (xs, f) => xs.map(f).reduce((a, b) => a.concat(b), [])
});

// [3,4,6,8]
console.log(arrayMonad.Do(function*() {
  const x = yield [1,2];
  const y = yield [3,4];

  return x*y;
}));

const maybeMonad = Monad({
  pure: x => x,
  bind: (x: any | null, f) => x === null ? null : f(x)
});

// null
console.log(maybeMonad.Do(function*() {
  const x = yield 1;
  const y = yield null;

  return x;
}));

const stateBind = (x, f) => {
  return state => {
    const { value: res, state: newState } = x(state);

    return f(res)(newState);
  }
}

const stateMonad = Monad({
  pure: a => s => ({ value: a, state: s }),
  bind: stateBind,
});

stateMonad.Do(function*() {

});