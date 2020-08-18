const lyricsList = document.getElementById('lyricsList');
const lyric = document.getElementById('lyric');
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
        let htmlTemplate = '';
        for (let i = 0; i < dataInfo.length; i++){
            const information = dataInfo[i];
            htmlTemplate.concat(information);
        
        const name = data.data[i].artist.name;
        const titleName = data.data[i].title;
        const albumName = data.data[i].album.title;
        
            
      lyricsList.innerHTML += ` <div class="single-result row align-items-center my-3 p-3">
                                <div class="col-md-9">
                                    <h3 class="lyrics-name" id="title-name">${titleName}</h3>
                                    <p class="author lead"> by <span id="artist-name">${name}</span></p>
                                    <p class="author lead">Album: <span id="album-name">${albumName}</span></p>
                                </div>
                                <div class="col-md-3 text-md-right text-center">
                                    <button onclick="lyrics(${titleName},${name})" class="btn btn-success">Get Lyrics</button>
                                </div>
                                </div>`;
                                
        fetch(`https://api.lyrics.ovh/v1/'${titleName}'/'${name}'`)
        .then(response => response.json())
        .then(data =>  lyrics(data))
        console.log(data);
        function lyrics (title,artist){
            const lyricData = data.lyrics;
            lyric.innerHTML += `<h3 class="text-center">${titleName}</h3>
                                <h4 class="text-center">${name}</h4>
                                <pre class="text-center">${lyricData}</pre>`;
            }
                                
        }  
    }

})