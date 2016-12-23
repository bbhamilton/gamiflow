const express = require('express')
const passport = require('passport')
const app = express()

app.set('view engine', 'pug')
app.set('views', './templates')

app.get('/', (req, res) => {
  res.render('index', {
    title: 'to jest tytuł',
    message: 'a to treść'
  })
})

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!')
})

app.listen(7777, () => {
  console.log('Gamiflow is running...')
})
