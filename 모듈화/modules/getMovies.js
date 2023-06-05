export { getMovies };

async function getMovies() {
    let movies

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2FkYjYyODBiMTQ5NWRjNzRlZTllYjVhNWIyZThhNiIsInN1YiI6IjY0NzQzMmViZGQ3MzFiMmQ3Y2Q3NmNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWmpvl-iikBq6Ep4YCQb825KVgbcgGvtvepH2haK-AM'
        }
    };
    try {
        movies = await fetch(`https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1`, options)
        // 패치로 가져온 데이터를 movies에 할당
    } catch (error) {
        alert('오류'); // 오류시 오류알림
    }
    return movies.json() // 받은 데이터를 json 형식으로 반환
}