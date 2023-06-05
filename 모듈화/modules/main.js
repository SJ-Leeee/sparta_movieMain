import { getMovies } from "./getMovies.js";
import { renderMovies } from "./renderMovies.js";
import { sort_date, sort_title, sort_vote, sort } from "./sort.js";
import { search } from "./serch.js";
import { onKeyUp } from "./onKeyup.js";

renderMovies(); // 동작
// Uncaught ReferenceError: search is not defined
//     at HTMLButtonElement.onclick 

document.querySelector('#search-btn').addEventListener('click', search)
document.querySelector('#search-btn2').addEventListener('click', sort)
document.addEventListener('keydown', onKeyUp)
