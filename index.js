import app from './src/config/app';

app.listen(app.get('port'), () => {
    console.log('running in port ' + app.get('port'))
})