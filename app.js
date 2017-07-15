const express = require('express')
const fs = require('fs')
const app = express()

// Error handling
app.use(function (err, req, res, next) {
  console.error(err.stack)
  res.status(500).send('Something broke!')
})

// Static files
app.use(express.static('public'))

// GET Index
app.get('/', function (req, res) {
  res.sendFile(__dirname + '/index.html')
})

// GET Login
app.get('/login', function (req, res) {
  res.sendFile(__dirname + '/login.html')
})

// GET Dashboard
app.get('/dashboard', function (req, res) {
  res.sendFile(__dirname + '/dashboard.html')
})

// GET About
app.get('/about', function (req, res) {
  res.sendFile(__dirname + '/about.html')
})

// GET About
app.get('/demo', function (req, res) {
  res.sendFile(__dirname + '/demo.html')
})

// 404: Not Found
app.use(function (req, res, next) {
  res.status(404).send("Sorry can't find that!")
})

// Start Server
app.listen(3000, function () {
  console.log('Voice Coach listening on port 3000!')
})