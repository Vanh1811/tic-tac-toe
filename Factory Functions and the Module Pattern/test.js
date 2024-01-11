function makeAdding (firstNumber) {
    // "first" is scoped within the makeAdding function
    const first = firstNumber;
    return function resulting (secondNumber) {
      // "second" is scoped within the resulting function
      const second = secondNumber;
      return first + second;
    }
  }
  // but we've not seen an example of a "function"
  // being returned, thus far - how do we use it?

  const add5 = makeAdding(5);
  console.log(add5(2)) // logs 7


  function createUser (name) {
    const discordName = "@" + name;
    return { name, discordName };
  }


  const nowFancyObject = { name, age, color };

  console.log({ name, age, color });

const obj = { a: 1, b: 2 };
const { a, b } = obj;

const array = [1, 2, 3, 4, 5];
const [ zerothEle, firstEle ] = array;

function createUser (name) {
    const discordName = "@" + name;

    let reputation = 0;
    const getReputation = () => reputation;
    const giveReputation = () => reputation++;

    return { name, discordName, getReputation, giveReputation };
  }

  const josh = createUser("josh");
  josh.giveReputation();
  josh.giveReputation();

  console.log({
    discordName: josh.discordName,
    reputation: josh.getReputation()
  });
  // logs { discordName: "@josh", reputation: 2 }