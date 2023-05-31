const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2FkYjYyODBiMTQ5NWRjNzRlZTllYjVhNWIyZThhNiIsInN1YiI6IjY0NzQzMmViZGQ3MzFiMmQ3Y2Q3NmNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWmpvl-iikBq6Ep4YCQb825KVgbcgGvtvepH2haK-AM'
    }
};
async function getMovies() { // fetch된 파일을 객체를 가져오려면 then catch 말고 try catch 로 해야된다고 했다. 이유는 모르겠다.
    let movies
    try {
        movies = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    } catch (error) {
        console.log(movies);
    }
    return movies.json()
}
// async function getMoviesdata() {
//     return await getMovies() } // 바로쓰면 되는데 왜 리턴하는가? 안만들고 바로 할당가능 일단 주석

async function renderMovies() {  /* 패치 된 내용을 찍는 과정 */
    let { results: movies } = await getMovies(); // 객체구조분해할당 방식으로 변수저장을 해줘야한다. getMovie()로 가져온 데이터는 배열이기 때문에 객체로 변환
    // let { logo_sizes: posters } = await getPostersdata();
    let html = '';
    movies.forEach((x) => {
        let htmlSegment = `
        <div onclick="alert(${x.id})" class="card h-100">
            <img src="https://image.tmdb.org/t/p/w500${x.poster_path}"
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${x.title}</h5>
                <p class="card-text">${x.overview}</p>
                <p class="average">평점 : ${x.vote_average}</p>
            </div>
        </div>`
        // div에 onclick=alert(${x.id}) 를 바로 할당했다. 안될줄 알았다. 다른 함수를 새로 생성해 onclick 에 부여해보기
        html += htmlSegment;
    });
    let container = document.querySelector('#cards-box');
    container.innerHTML = html;
}
// 비동기 동기 에 대한 이해가 없어서 오류가 발생했고, async awit으로 오류는 잡았다.
//TypeError: movies.forEach is not a function === 배열이 아니여서 생기는 오류

renderMovies(); // 바로 실행 시켜 줌 으로써 html에 바로 출력

async function serch() { /* 검색으로 새로 불러오는 데이터 */

    let { results: movies } = await getMovies(); // 객체구조분해할당 방식으로 변수저장을 해줘야한다. getMovie()로 가져온 데이터는 배열이기 때문에 객체로 변환
    let inputtext
    let html = '';
    inputtext = document.getElementById("serch").value.toUpperCase();
    const serchData = movies.filter((x) => {
        let a = x.title.toUpperCase()
        return a.includes(inputtext)
    }) // indexOf 는 안된다

    serchData.forEach((x) => {
        let htmlSegment = `
        <div onclick="alert(${x.id})" class="card h-100">
            <img src="https://image.tmdb.org/t/p/w500${x.poster_path}"
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${x.title}</h5>
                <p class="card-text">${x.overview}</p>
                <p>평점 : ${x.vote_average}</p>
            </div>
        </div>
    `;
        html += htmlSegment;
    });

    let container = document.querySelector('#cards-box');
    container.innerHTML = html;
}

async function sort_title() {
    let { results: movies } = await getMovies();
    const sort_data = movies.sort((a, b) => a.title.toLowerCase() < b.title.toLowerCase() ? -1 : 1);

    let html = '';

    sort_data.forEach((x) => {
        let htmlSegment = `
        <div onclick="alert(${x.id})" class="card h-100">
            <img src="https://image.tmdb.org/t/p/w500${x.poster_path}"
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${x.title}</h5>
                <p class="card-text">${x.overview}</p>
                <p>평점 : ${x.vote_average}</p>
            </div>
        </div>
    `;
        html += htmlSegment;
    });

    let container = document.querySelector('#cards-box');
    container.innerHTML = html;
}

async function sort_date() {
    let { results: movies } = await getMovies();
    const sort_data = movies.sort((a, b) => a.release_date > b.release_date ? -1 : 1);

    let html = '';

    sort_data.forEach((x) => {
        let htmlSegment = `
        <div onclick="alert(${x.id})" class="card h-100">
            <img src="https://image.tmdb.org/t/p/w500${x.poster_path}"
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${x.title}</h5>
                <p class="card-text">${x.overview}</p>
                <p>평점 : ${x.vote_average}</p>
            </div>
        </div>
    `;
        html += htmlSegment;
    });

    let container = document.querySelector('#cards-box');
    container.innerHTML = html;
}

async function sort_vote() {
    let { results: movies } = await getMovies();
    const sort_data = movies.sort((a, b) => {
        if(a.vote_average > b.vote_average) 
        return -1  
        else if(a.vote_average < b.vote_average) 
        return 1
        else if(a.vote_count > b.vote_count)
        return -1
        else if(a.vote_count < b.vote_count)
        return 1
});

    let html = '';

    sort_data.forEach((x) => {
        let htmlSegment = `
        <div onclick="alert(${x.id})" class="card h-100">
            <img src="https://image.tmdb.org/t/p/w500${x.poster_path}"
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${x.title}</h5>
                <p class="card-text">${x.overview}</p>
                <p>평점 : ${x.vote_average}</p>
            </div>
        </div>
    `;
        html += htmlSegment;
    });

    let container = document.querySelector('#cards-box');
    container.innerHTML = html;
}