import { validatePresence } from 'ember-changeset-validations/validators';
import uniqueEmail from 'datafruits13/validators/unique-email';
import uniqueUsername from 'datafruits13/validators/unique-username';

export default {
  username: [validatePresence(true), uniqueUsername()],
  password: validatePresence(true),
  email: [validatePresence(true), uniqueEmail()],
};
