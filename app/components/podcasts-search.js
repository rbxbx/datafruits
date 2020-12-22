import classic from 'ember-classic-decorator';
import { observes } from '@ember-decorators/object';
import { action, computed } from '@ember/object';
/* eslint ember/no-observers: 0 */
import Component from '@ember/component';
import { debounce } from '@ember/runloop';
import { isEmpty } from '@ember/utils';
import { isArray } from '@ember/array';
import { inject as service } from '@ember/service';
import { hash } from 'rsvp';
import App from '../app';

/* eslint-disable ember/no-observers */

@classic
export default class PodcastsSearch extends Component {
  @service
  store;

  init() {
    super.init(...arguments);
    this.selectedLabels = [];
    const selectedTags = this.selectedTags;
    if (!isEmpty(selectedTags)) {
      if (isArray(selectedTags)) {
        this.set('selectedLabels', this.selectedTags);
      } else {
        this.set('selectedLabels', this.selectedTags.split(','));
      }
    }
    const searchParams = this.searchParams;
    if (searchParams.query) {
      this.set('filterText', searchParams.query);
    }
  }

  filterText = '';

  @computed('labels')
  get labelNames() {
    return this.labels.map(function (label) {
      return label.get('name');
    });
  }

  @observes('filterText')
  observeQuery() {
    debounce(this, this.search, 500);
  }

  @observes('selectedLabels.[]')
  observeLabels() {
    debounce(this, this.search, 100);
  }

  search() {
    this.updateSearch(this.filterText, this.selectedLabels);
  }

  @action
  clearSearch() {
    this.set('filterText', '');
  }

  @action
  selectLabel(label) {
    this.selectedLabels.pushObject(label.get('name'));
  }

  @action
  nop() {}

  @action
  fetchPodcasts() {
    let query = this.searchParams;
    let podcastsPromise = this.store.queryRecord('podcast', query).then((podcast) => {
      return hash({
        tracks: podcast.get('tracks'),
        meta: App.storeMeta['podcast'],
        labels: this.store.findAll('label'),
      });
    });

    return podcastsPromise;
  }
}
