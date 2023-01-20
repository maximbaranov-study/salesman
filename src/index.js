import towns from "../data/towns.js";
import Salesman from "./Salesman.js";
import Tsp from "./tsp.js";
import Bf from "./Bf.js";

// ----- Brute force -----
new Salesman(new Bf).init(towns.TOWN_1, {
    idx: 0,
    log: true
});

// ----- Tsp (Little method) -----
// new Salesman(new Tsp).init(towns.TOWN_1, {
//     log: true
// });
