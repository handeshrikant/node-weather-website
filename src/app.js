const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

 const app = express()

// define path for express
 const publicDirectoryPath = path.join(__dirname,'../public')
 const viewsPath = path.join(__dirname,'../templates/views')
 const partialPath = path.join(__dirname,'../templates/partials')

 //setup handlebar and view location
 app.set('view engine','hbs')
 app.set('views', viewsPath)
 hbs.registerPartials(partialPath)

 //setup static directory to serve
 app.use(express.static(publicDirectoryPath))

 app.get('',(req, res)=>{
     res.render('index',{
         title: 'Weather',
         name: 'Shrikant'
     })
 })

 app.get('/about',(req, res)=>{
     res.render('about',{
         title: 'About Page',
         name: 'Shrikant'
     })
 })

 app.get('/help',(req, res)=>{
     res.render('Help',{
         title: 'Help Page',
         message: 'YOu will get help here',
         name: 'Shrikant'
     })
 })

 app.get('/weather',(req, res)=>{
     if(!req.query.address){
        return res.send({
            error: 'You must provide an address'    
        })
     }
     geocode(req.query.address, (error , { latitude, longitude, location}={})=> {
        if(error){
            return res.send({error})
        }
    
        forecast(latitude, longitude, (error, forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                forecast: forecastData,
              location,
                address: req.query.address
           })
        })
    
    })    
 })

 app.get('/products',(req, res)=> {
     if(!req.query.search){
        return res.send({
            error:'you must provide a search term'
        })
     } 
     console.log(req.query.search)
     res.send({
         products: []
     })
 })
 
 app.get('/help/*',(req, res)=>{
     res.render('404',{
         title:'404',
         Name:'Shrikant',
         errorMessage:'Help Article not found'
     })
 })

 app.get ('*',(req, res)=>{
    res.render('404',{
        title: 404,
        name:'Shrikant',
        error: 'Page Not Found'
    })
 })

app.listen(3000, ()=> {
    console.log('Server is up on port 3000')
})