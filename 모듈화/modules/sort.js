import { setpage } from "./setpage.js";
import { getMovies } from "./getMovies.js";

export { sort_date, sort_title, sort_vote, sort };

async function sort_title() { // 이름순 정렬
    let { results: movies } = await getMovies();
    const sort_data = movies.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);
    // 이름 비교하여 객체를 정렬, 객체자체가 바뀌기 때문에 위험할 수 있다. 
    // 하지만 함수마다 새롭게 데이터를 받아오기 때문에 그냥 사용

    setpage(sort_data)
}

async function sort_date() { // 출시일 기준 정렬
    let { results: movies } = await getMovies();
    const sort_data = movies.sort((a, b) => a.release_date > b.release_date ? -1 : 1); // sort_title과 동일

    setpage(sort_data)
}

async function sort_vote() { // 평점순 정렬 (평점이 같으면 투표 수가 많은 순)
    let { results: movies } = await getMovies();
    const sort_data = movies.sort((a, b) => { // 8.6 8.5
        if (a.vote_average > b.vote_average)
            return -1
        else if (a.vote_average < b.vote_average)
            return 1
        else if (a.vote_count > b.vote_count)
            return -1
        else if (a.vote_count < b.vote_count)
            return 1
    }); // 다중 조건을 걸어 평점 -> 표본의 수 를 통하여 평점이 같으면 표본수가 높은 순으로 정렬

    setpage(sort_data)
}

const sort = function () { // select 의 값을 받아와 그에 맞는 정렬함수를 실행
    let select = document.getElementById("select");
    let value = (select.options[select.selectedIndex].value);
    if (value === 'name')
        sort_title()
    else if (value === 'date')
        sort_date()
    else if (value === 'vote')
        sort_vote()
}
