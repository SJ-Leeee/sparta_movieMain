import { setpage } from "./setpage.js";
import { getMovies } from "./getMovies.js";
export { renderMovies }

async function renderMovies() {  /* 패치로 가져온 데이터를 찍는 과정 */
    let { results: movies } = await getMovies(); // 객체구조분해할당 방식으로 변수저장을 해줘야한다. getMovie()로 가져온 데이터는 배열이기 때문에 객체로 변환
    setpage(movies) // movies 라는 객체를 받아서 화면에 출력하는 함수
}