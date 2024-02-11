import Failure from "./failure.js"

let fail = 0, ran = 0

let filter = process.argv[2]

function run(tests) {
    console.log("tests: ", tests)
  for (let name in tests) {
    console.log("name: ", name)
    if (filter && name.indexOf(filter) == -1) continue
    ++ran
    try {
      tests[name]()
    } catch(e) {
      ++fail
      if (e instanceof Failure)
        console.log(name + ": " + e)
      else
        console.log(name + ": " + (e.stack || e))
    }
  }
}

import slice from "./test-slice.js"
run(slice)
import replace from "./test-replace.js"
run(replace)

console.log((fail ? "\n" : "") + ran + " test ran. " + (fail ? fail + " failures." : "All passed."))
process.exit(fail ? 1 : 0)
