const options = {
    method: 'GET',
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzM2FkYjYyODBiMTQ5NWRjNzRlZTllYjVhNWIyZThhNiIsInN1YiI6IjY0NzQzMmViZGQ3MzFiMmQ3Y2Q3NmNkYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.wWmpvl-iikBq6Ep4YCQb825KVgbcgGvtvepH2haK-AM'
    }
};

async function getUsers() {
    let users
    try {
        users = await fetch('https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1', options)
    } catch (error) {
        console.log(users);
    }
    return users.json()
}

async function getUsersdata() {
    return await getUsers()
}


async function renderUsers() {
    let users = await getUsersdata();
    let html = '';
    users.forEach(users => {
        let htmlSegment = `<div class="col">
        <div class="card h-100">
            <img src="${users.poster_path}"
                class="card-img-top">
            <div class="card-body">
                <h5 class="card-title">${users.title}</h5>
                <p class="card-text">${users.overview}</p>
                <p class="average">${users.vote_average}</p>
            </div>
        </div>
    </div>`;

        html += htmlSegment;
    });

    let container = document.querySelector('#cards-box');
    container.innerHTML = html;
}
renderUsers()