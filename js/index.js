const URL = "http://localhost:3000/tweets";

const onEnter = (e) => {
    if(e.key == "Enter") {
        getTwitterData()
    }
}
 
/**
 * Retrive Twitter Data from API
 */
const getTwitterData = () => {
    document.querySelector('.tweets-list').innerHTML = ""
    const user_search_input = document.getElementById('user-search-input').value
    if(!user_search_input) return
    const encoded_query = encodeURIComponent(user_search_input)
    fetch(`${URL}?q=${encoded_query}&count=10`).then((response) => {
        return response.json()
    }).then((data) => {
        buildTweets(data.statuses, 1)
    })
}

/**
 * Save the next page data
 */
const saveNextPage = (metadata) => {
}

/**
 * Handle when a user clicks on a trend
 */
const selectTrend = (e) => {
    document.getElementById('user-search-input').value = e.innerText
    getTwitterData()
}

/**
 * Set the visibility of next page based on if there is data on next page
 */
const nextPageButtonVisibility = (metadata) => {
}

/**
 * Build Tweets HTML based on Data from API
 */
const buildTweets = (tweets, nextPage) => {
    let tweetsContent = ""
    tweets.map((tweet) => {
        tweetsContent += `
        <div class="tweet-container">
            <div class="tweet-user-info">
                <div class="tweet-user-profile" style="background-image:url('${tweet['user']['profile_image_url']}')">
                    
                </div>
                <div class="tweet-user-name-container">
                    <div class="tweet-user-fullname">${tweet['user']['name']}</div>
                    <div class="tweet-user-username">${tweet['user']['screen_name']}</div>
                </div>
            </div>
        `
        if(tweet['entities']['media']) {
            tweetsContent += `<div class="tweet-media-container">`
            tweet['entities']['media'].map((mediatype) => {
                if(mediatype.type == "photo") {
                    tweetsContent += buildImages(mediatype)
                } else if (mediatype.type == "video") {

                }
            })
            tweetsContent += buildImages(tweet.entities.media)
            tweetsContent += `</div>`
        }

        tweetsContent += `<div class="tweet-text-container">
                ${tweet['full_text']}
            </div>
            <div class="tweet-date-container">
                20 hours ago
            </div>
        </div>
        `
    })
    document.querySelector('.tweets-list').innerHTML += tweetsContent
}

/**
 * Build HTML for Tweets Images
 */
const buildImages = (mediaList) => {
    let tweetsContent = ""
    tweetsContent += `<div class="tweet-image" style="background-image:url('${mediaList['media_url']}')"></div>`
    return tweetsContent
}

/**
 * Build HTML for Tweets Video
 */
const buildVideo = (mediaList) => {

}
