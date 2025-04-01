import {bootstrapApplication} from '@angular/platform-browser';
import {AppComponent} from './app/app.component';
import {config} from './app/app.config';

bootstrapApplication(AppComponent, config).then(app => {
    console.log('host application - bootstrapApplication', app);
});
