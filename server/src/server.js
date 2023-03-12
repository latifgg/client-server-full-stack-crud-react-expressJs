import app from "./app.js"
const port = 3050 // default port to listen


app.listen(port, () => {
    console.log(`app listening on port ${port}`)
})