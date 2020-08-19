const lyricsList = document.getElementById('lyricsList');
const title = document.getElementById('title-name');
const artist = document.getElementById('artist-name');
const album = document.getElementById('album-name');
const input = document.getElementById('input');

const button = document.getElementById('button').addEventListener('click', function (){
    fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
        .then(response => response.json())
        .then(data => lyricList(data))                            
    
        function lyricList(data){
        const dataInfo = data.data.slice(0,10);
        const lyricsList = document.getElementById('lyricsList');
        lyricsList.innerHTML = '';
        for (let i = 0; i < dataInfo.length; i++){
            const information = dataInfo[i];
        const artistName = information.artist.name;
        const songTitle = information.title;
        const albumName = information.album.title;
           
      lyric.innerHTML += ` <div class="single-result row align-items-center my-3 p-3">
                                <div class="col-md-9">
                                    <h3 class="lyrics-name" id="title-name">${songTitle}</h3>
                                    <p class="author lead"> by <span id="artist-name">${artistName}</span></p>
                                    <p class="author lead">Album: <span id="album-name">${albumName}</span></p>
                                </div>
                                <div class="col-md-3 text-md-right text-center">
                                    <button onclick="getLyrics('${artistName}','${songTitle}')" class="btn btn-success">Get Lyrics</button>
                                </div>
                                </div>`;
        
        
        }
          
    }

    
})

function getLyrics(artist,title){
    fetch(`https://api.lyrics.ovh/v1/${artist}/${title}`)
        .then(res => res.json())
        .then(data =>{
            const songLyrics = data.lyrics;
            lyric.innerHTML += ` <h1 class="text-center">${title}</h1>
                                <h3 class="text-center">By-${artist}</h3>
                                <br>
                                <pre class="text-center text-white">${songLyrics}</pre>`;
        })
} 
