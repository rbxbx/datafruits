import EmberRouter from '@ember/routing/router';
import config from './config/environment';

export default class Router extends EmberRouter {
  location = config.locationType;
  rootURL = config.rootURL;
}

Router.map(function () {
  this.route('home', { path: '/' }, function () {
    this.route('timetable');
    this.route('podcasts');
    this.route('about');
    this.route('subscribe');
    this.route('show', { path: '/shows/:id' });
    this.route('dj-inquiry');
    this.route('coc');
    this.route('djs');
    this.route('dj', { path: '/djs/:name' });
    this.route('chat');
    this.route('blogs.show', { path: '/blogs/:id' });
    this.route('user', function () {
      this.route('settings');
    });
    this.route('sign-up');
    this.route('password-reset');
  });
  this.route('container', function () {
    this.route('show', { path: '/shows/:id' });
  });
  this.route('not-found', { path: '/*path' });
});
