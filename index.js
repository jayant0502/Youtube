let btn=document.getElementById("menu-btn")
let sidebar=document.querySelector(".sidebar-container")
let container=document.querySelector(".main-container")
let filterContainer=document.querySelector(".filter-container")

btn.addEventListener('click',()=>{
    sidebar.classList.toggle("small-sidebar")   

    container.classList.toggle("large-container")
    filterContainer.classList.toggle("large-filter")
})

// ========================= fetch api data=====================

let apiKey="AIzaSyBeS4EIc8RW23VXAyWnx2vbk23vSAdQnsk";
let videoUrl="https://www.googleapis.com/youtube/v3/videos?";
let channelUrl="https://www.googleapis.com/youtube/v3/channels?";
let searchUrl="https://www.googleapis.com/youtube/v3/search?"

fetch(videoUrl+ new URLSearchParams({
    key: apiKey,
    part: 'snippet',
    chart:'mostPopular',
    maxResults:20,
    regionCode:'IN'

}
))
.then(res=>res.json())
.then(data=>{
    console.log(data);
    data.items.forEach(item => {

        getChannelIcon(item)

        
    });
})
.catch(err=>console.log(err))
// ===========channel icon=====================
const getChannelIcon=(videoData)=>{
    fetch(channelUrl+new URLSearchParams({
        key:apiKey,
        part:'snippet',
        id:videoData.snippet.channelId
    }))
    .then(res=>res.json())
    .then(data=>{
        videoData.channelThumbnail=data.items[0].snippet.thumbnails.default.url;
        // console.log(videoData)
        makeVideoCard(videoData)
    })
}

// ==================video to container====================
const videoCard=document.querySelector(".main-container")

const makeVideoCard=(data)=>{

    videoCard.innerHTML+=`
        <div class="video" onclick="location.href ='https://youtube.com/watch?v=${data.id}'">
         <img src="${data.snippet.thumbnails.high.url}" alt="" class="thumbnail">
            <div class="content">
                <img src="${data.channelThumbnail}" alt="" class="content-img">
                <div class="discription">
                <h4 class="title">${data.snippet.title}</h4>
                <p class="channel-name">${data.snippet.channelTitle}</p>
               </div>
            </div>
        </div> 
    `

}
// ========================search===================
const searchInp=document.querySelector(".search-inp")
const searchBtn=document.querySelector("#search-btn")

