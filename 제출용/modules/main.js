const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2FkYjYyODBiMTQ5NWRjNzRlZTllYjVhNWIyZThhNiIsInN1YiI6IjY0NzQzMmViZGQ3MzFiMmQ3Y2Q3NmNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWmpvl-iikBq6Ep4YCQb825KVgbcgGvtvepH2haK-AM'
    }
};
async function getMovies() {
    let movies
    try {
        movies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=4`, options)
        // 패치로 가져온 데이터를 movies에 할당
    } catch (error) {
        alert('오류'); // 오류시 오류알림
    }
    return movies.json() // 받은 데이터를 json 형식으로 반환
}

async function renderMovies() {  /* 패치로 가져온 데이터를 찍는 과정 */
    let { results: movies } = await getMovies(); // 객체구조분해할당 방식으로 변수저장을 해줘야한다. getMovie()로 가져온 데이터는 배열이기 때문에 객체로 변환
    setpage(movies) // movies 라는 객체를 받아서 화면에 출력하는 함수
}
//TypeError: movies.forEach is not a function : 배열이 아니여서 생기는 오류

renderMovies(); // 바로 실행 시켜 줌 으로써 html에 바로 출력

async function search() { //검색으로 새로 불러오는 데이터 
    let { results: movies } = await getMovies();
    let inputtext
    inputtext = document.getElementById("search-input").value.toUpperCase(); // 대문자 변환해서 입력받은 데이터 할당
    const searchData = movies.filter((x) => {
        let a = x.title.toUpperCase()
        return a.includes(inputtext)
    }) // title 도 대문자로 includes로 문자열이 포함되어있으면 serchData로 반환

    setpage(searchData)
}

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

const setpage = function (arr) { // 데이터를 찍는 함수
    let html = '';

    arr.forEach((x) => {
        let htmlSegment = `
        <div onclick="alert('영화 id : ' + ${x.id})" class="movie-card">
            <img src="https://image.tmdb.org/t/p/w500${x.poster_path}">
            <div>
                <h3>${x.title}</h5>
                <p>${x.overview}</p>
                <p>평점 : ${x.vote_average}</p>
            </div>
        </div>
    `;
        html += htmlSegment;
    });

    let container = document.querySelector('.card-list');
    container.innerHTML = html;
}
function onKeyUp() { // enter키 입력시 검색
    if (window.event.keyCode == 13)
        search();
}