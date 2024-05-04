const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile').development);
const cookieParser = require('cookie-parser');
const session = require('express-session');

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public')); //zeby css dzialal
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(session({
    secret: 'verySecretValue',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));


app.get('/', async (req, res) => {
    const posts = await knex('posts')
        .join('users', 'posts.userId', '=', 'users.id')
        .select('posts.*', 'users.nickname')


    const success= req.query.success;
    const theme = req.cookies['theme']
    console.log(theme)

    res.render('pages/index', { posts: posts, success: success, userName: getLoggedUsername(req), theme: getTheme(req) });
});

app.get('/register', async(req, res) => {
    res.render('pages/register')
});

app.post('/register', async (req,res) => {
    const {nickname, email, password} = req.body
    try {
        await knex('users').insert({nickname, email, password})
        res.redirect("/?success=Rejestracja%20zako%C5%84czona%20pomy%C5%9Blnie")
    } catch (error) {
        console.log(error)
        res.status(500).send("Nie udalo sie zarejestrowac")
    }
});

app.get('/login', async (req, res) => {
    res.render('pages/login')
});

app.post('/login', async (req, res) => {
    const {username, password} = req.body

    let userPassword
    try {
        userPassword = await knex('users').select('password').where('nickname','=',username)
    } catch (err) {
        res.status(500, "Nie udalo sie zalogowac")
    }

    if (userPassword[0] && userPassword[0].password == password) {
        req.session.user = username; // Przechowaj nazwę użytkownika w sesji
        res.cookie('username', username, { maxAge: 900000, httpOnly: true }); // Ustaw ciasteczko
        res.redirect('/?success=Zalogowano%20pomyślnie');
    } else {
        res.status(500).send("Nie udało sie zalogować")
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) {
            console.error('Błąd podczas niszczenia sesji', err);
            return res.status(500).send('Nie udało się wylogować');
        }
        res.clearCookie('username'); // Usuń ciasteczko z nazwą użytkownika
        res.clearCookie('connect.sid'); // Usuń ciasteczko sesji
        res.redirect('/');
    });
});

app.get('/post/:postId', async (req, res) => {
    const postId = req.params.postId;
    const post = await knex('posts')
        .select('posts.*', 'users.nickname')
        .where('posts.id', '=', postId)
        .join('users', 'users.id', '=', 'posts.userId');

    const comments = await knex('comments')
        .select('comments.*')
        .join('posts', 'comments.postId', '=', 'posts.id')
        .where('comments.postId', '=', postId)

    res.render('pages/post', {post:post[0], userName: getLoggedUsername(req), comments: comments, theme: getTheme(req)});
});

app.post('/post/:postId/addComment', async (req, res) => {
    const postId = req.params.postId;
    const {comment} = req.body;
    const username = getLoggedUsername(req);

    if(username && username !== "Nieznajomy") {
        await knex('comments').insert({postId: postId, content: comment, nickname: username});
    }

    res.redirect('/post/' + postId);
});

app.post('/post/:postId/editPost', async (req, res) => {
    const postId = req.params.postId;
    const {content, title} = req.body;
    const username = getLoggedUsername(req);

    if(username && username !== "Nieznajomy") {
        await knex('posts').update({content: content, title: title}).where('posts.id', '=', postId);
    }

    res.redirect('/post/' + postId);
});

app.get('/post/:postId/deletePost', async (req, res) => {
    const postId = req.params.postId;
    const username = getLoggedUsername(req);

    if(username && username !== "Nieznajomy") {
        await knex('posts').where('posts.id', '=', postId).del()
    }

    res.redirect('/');
});

app.post('/addPost', async (req, res) => {
    const {content, title} = req.body;
    const username = getLoggedUsername(req);

    console.log(username)

    if(username && username !== "Nieznajomy") {
        const userId = await knex('users').select('id').where('nickname', '=', username);
        await knex('posts').insert({content: content, title: title, userId: userId[0].id});
    }

    res.redirect('/');
});

app.get('/changeTheme', async (req, res) => {
    const username = getLoggedUsername(req);
    const cookieValue = req.cookies['theme'];

    if (cookieValue && cookieValue === "night") {
        res.cookie('theme', 'day', { maxAge: 900000, httpOnly: true });
    } else if(cookieValue && cookieValue === "day") {
        res.cookie('theme', 'night', { maxAge: 900000, httpOnly: true });
    } else {
        res.cookie('theme', 'night', { maxAge: 900000, httpOnly: true });
    }

    res.redirect('/');
});

app.listen(3000, () => console.log('Server running on port 3000'));

function getLoggedUsername(req) {
    let userName = 'Nieznajomy'; // Domyślna wartość, jeśli nie ma sesji ani ciasteczka
    if (req.session.user) {
        userName = req.session.user; // Użyj nazwy z sesji, jeśli dostępna
    } else if (req.cookies.username) {
        userName = req.cookies.username; // Użyj nazwy z ciasteczka, jeśli sesja nie istnieje
        req.session.user = userName; // Odtwórz sesję z ciasteczka
    }

    return userName
}

function getTheme(req) {
    return req.cookies['theme'] || 'day'
}
