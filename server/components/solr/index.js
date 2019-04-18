/**
 * Created by Darshit.
 */

import Bluebird from 'bluebird';
import solrClient from 'solr-client';
import config from '../../config/environment';

const { host, port, core, path } = config.solr;

const S = {
  Solr: solrClient.createClient({
    host,
    port,
    core,
    path,
    get_max_request_entity_size: 8000,
    solrVersion: '5.1',
  }),
};

Bluebird.promisifyAll(Object.getPrototypeOf(S.Solr));

module.exports = S;
