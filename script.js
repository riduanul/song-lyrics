const button = document.getElementById('button').addEventListener('click', function (){
    fetch(`https://api.lyrics.ovh/suggest/${input.value}`)
        .then(response => response.json())
        .then(data => lyricList(data))                            
    
        function lyricList(data){
        const lyricsList = document.getElementById('lyricsList');
        lyricsList.innerHTML = '';
        
        const dataInfo = data.data.slice(0,10);
        for (let i = 0; i < dataInfo.length; i++){
            const information = dataInfo[i];
            const artistName = information.artist.name;
            const songTitle = information.title;
            const albumName = information.album.title;
           
      lyricsList.innerHTML += ` <div class="single-result row align-items-center my-3 p-3">
                                <div class="col-md-9">
                                    <h3 class="lyrics-name">${songTitle}</h3>
                                    <p class="author lead"> by-${artistName}</p>
                                    <p class="author lead">Album:${albumName}</p>
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
            const lyric = document.getElementById('lyric');
            const songLyrics = data.lyrics;
            
            lyric.innerHTML += ` <h1 class="text-center">${title}</h1>
                                <h3 class="text-center">By-${artist}</h3>
                                <br>
                                <pre class="text-center text-white">${songLyrics}</pre>`;
        })
} 
