function getMovies() {
    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2FkYjYyODBiMTQ5NWRjNzRlZTllYjVhNWIyZThhNiIsInN1YiI6IjY0NzQzMmViZGQ3MzFiMmQ3Y2Q3NmNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWmpvl-iikBq6Ep4YCQb825KVgbcgGvtvepH2haK-AM'
        }
    };

    fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
        .then(response => response.json())
        .then(data => {
            let movies = data;
            let html = '';
            data.result.forEach((i) => {
                let htmlSegment = `<div class="col">
        <div class="card h-100">
            <img src=""
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${i.title}</h5>
                <p class="card-text">${i.overview}</p>
                <p class="average">${i.vote_average}</p>
            </div>
        </div>
    </div>`;
                html += htmlSegment;
            });
            let container = document.querySelector('#cards-box');
            container.innerHTML = html;
        })
        .catch(err => console.error(err))
    }