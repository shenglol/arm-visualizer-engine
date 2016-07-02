/// <reference path='../typings/index.d.ts' />

import { Greeter } from '../src/greeter';

describe('greeter', function () {
  it('should greet with message', () => {
    var greeter = new Greeter('friend');
    expect(greeter.greet()).toBe('Bonjour, friend!');
  });
});
