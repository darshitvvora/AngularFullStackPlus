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

S.SolrUtil = {
  select(type = 'email') {
    return (id, { attributes = [] } = {}) => {
      const query = S.Solr.createQuery();

      if(attributes && attributes.length) {
        query.fl(attributes.join(','));
      }

      query.q(`type_s:${type} AND id:${id}`);

      return S.Solr
        .getAsync('select', query)
        .then(({ response: { docs: [c] } }) => c);
    };
  },
};

module.exports = S;
