import { search } from "./serch.js";
export { onKeyUp }

function onKeyUp(e) { // enter키 입력시 검색
    if (e.keyCode == 13) {
        search();
    }
}