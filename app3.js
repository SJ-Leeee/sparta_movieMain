const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2FkYjYyODBiMTQ5NWRjNzRlZTllYjVhNWIyZThhNiIsInN1YiI6IjY0NzQzMmViZGQ3MzFiMmQ3Y2Q3NmNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWmpvl-iikBq6Ep4YCQb825KVgbcgGvtvepH2haK-AM'
    }
};
async function getMovies() { // 객체를 가져오려면 then catch 말고 try catch 로 해야된다고 했다. 이유는 모르겠다.
    let movies
    try {
        movies = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    } catch (error) {
        console.log(movies);
    }
    return movies.json()
}
// async function getMoviesdata() {
//     return await getMovies()
// } // 왜 함수를 두번 만드는가? answer : 안만들고 바로 할당가능

// async function getPosters() {
//     let Posters
//     try {
//         Posters = await fetch('https://api.themoviedb.org/3/configuration', options)
//     } catch (error) {
//         console.log(Posters);
//     }
//     return Posters.json()
// }

// async function getPostersdata() {
//     return await getPosters()
// } 
async function renderMovies() {
    let { results: movies } = await getMovies(); // 객체구조분해할당
    // let { logo_sizes: posters } = await getPostersdata();
    console.log(movies);
    let html = '';
    movies.forEach((x) => {
        let htmlSegment = `<div class="col">
        <div class="card h-100">
            <img onclick="alert(${x.id})" src="https://image.tmdb.org/t/p/w500${x.poster_path}"
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">  ${x.title}</h5>
                <p class="card-text">${x.overview}</p>
                <p class="average">평점 : ${x.vote_average}</p>
            </div>
        </div>
    </div>`;
        // img onclick 에 alert() 를 바로 할당했다. 안될줄 알았다. 다른 함수를 새로 생성해 onclick 에 부여해보기
        html += htmlSegment;
    });

    let container = document.querySelector('#cards-box');
    container.innerHTML = html;
}
renderMovies();
// 비동기 동기
//TypeError: movies.forEach is not a function 배열 x