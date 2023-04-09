let datePicker = document.querySelector('.datePicker');
let media = document.querySelector('.media');
let picTitle = document.querySelector('.picTitle');
let picDate = document.querySelector('.picDate');
let explanation = document.querySelector('.explanation');

let date = new Date();
let year = date.getFullYear();
let month = String(date.getMonth() + 1).padStart(2, '0');
let day = String(date.getDate()).padStart(2, '0');
let datePattern = `${year}-${month}-${day}`;
document.querySelector('.datePicker').value = datePattern;

let currentDay = new Date().toISOString().slice(0, 10);
datePicker.min = '1995-06-16';
datePicker.max = currentDay;

datePicker.addEventListener('input', e => {
    e.preventDefault();
    displayChosenData();
});

let image = 
`
<a class='hdPic' href='' target='-blank'>
    <div class='pictureDiv'>
        <img class='pictureByDate' src='' alt='nasa-picture'>
    </div>
</a>
`;

let video = 
`
    <div class='videoDiv'>
        <iframe class='videoByDate' src='' frameborder='0'></iframe>
    </div>
`;

let baseUrl = 'https://api.nasa.gov/planetary/apod?api_key=';
let apiKey = 'pH78dG7t86A3kH2OntHiSjry3LqfcTQjmMtqe2el';

const displayTodaysData = async() => {
    let currentDaysUrl = await fetch(baseUrl + apiKey + '&date=' + currentDay);
    let data = await currentDaysUrl.json();
    console.log(data);
    picTitle.innerHTML = data.title;
    if (data.media_type === 'image') {
        media.innerHTML = image;
        document.querySelector('.hdPic').href = data.hdurl;
        document.querySelector('.pictureByDate').src = data.url;
    };
    if (data.media_type === 'video') {
        media.innerHTML = video;
        document.getElementById('videoByDate').src = data.url;
    };
    picDate.innerHTML = data.date;
    explanation.innerHTML = data.explanation;
};
displayTodaysData();

const displayChosenData = async () =>  {
    let actualDaysData = await fetch(baseUrl + apiKey + '&date=' + datePicker.value);
    let data = await actualDaysData.json();
    picTitle.innerHTML = data.title;
    if (data.media_type === 'image') {
        media.innerHTML = image;
        document.querySelector('.hdPic').href = data.hdurl;
        document.querySelector('.pictureByDate').src = data.url;
    };
    if (data.media_type === 'video') {
        media.innerHTML = video;
        document.querySelector('.videoByDate').src = data.url;
    };
    picDate.innerHTML = data.date;
    explanation.innerHTML = data.explanation;
};
