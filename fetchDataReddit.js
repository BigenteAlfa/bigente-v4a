import snoowrap from 'snoowrap';
import config from './config.js';

// Configura la instancia de snoowrap con tus credenciales
const reddit = new snoowrap({
    userAgent: config.reddit.userAgent,
    clientId: config.reddit.clientID,
    clientSecret: config.reddit.clientSecret,
    username: config.reddit.username,
    password: config.reddit.password
});

// Función para obtener datos de Reddit
async function fetchDataReddit(subreddits) {
    const outputData = [];
    try {
        for (const subreddit of subreddits) {
            const posts = await reddit.getHot(subreddit, { limit: 10 });
            const mappedPosts = posts.map(post => ({
                id: post.id,
                title: post.title,
                subreddit: post.subreddit.display_name,
                selftext: post.selftext,
                thumbnail: post.thumbnail = 'self' ? '' : thumbnail,
                score: post.score,
                url: post.url,
                created_utc: new Date(post.created_utc * 1000)
            }))

            outputData.push(mappedPosts);
        }
        return outputData;
    } catch (error) {
        console.error('Error al obtener datos de Reddit:', error);
        throw error;
    }
}

export { fetchDataReddit };