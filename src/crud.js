/**
 * Create, Read, Update and Delete class for MPAT REST API
 * 
 * @author Jean-Philippe Ruijs
 */

import axios from 'axios';

export default class CRUD {
  constructor(restRootUrl) {
    this.restRootUrl = restRootUrl;
    axios.defaults.headers.common['X-WP-Nonce'] = window.wpApiSettings.nonce;
  }

  get(onSuccess, onError) {
    axios.get(this.restRootUrl, {})
      .then((v) => {
        //FIXME because there may be irrelevant wordpress errors prefixing the response, so we strip them
        let w = v.data;
        try {
          if (w.indexOf('>') > -1) {
            let li = w.lastIndexOf('>');
            w = w.substr(li + 1);
            console.log('stripping alert');
          }
        } catch (err) { }
        if (typeof w === 'string') {
          w = JSON.parse(w);
        }
        //console.log(this.restRootUrl, 'data', w);
        onSuccess.call(null, w);
      })
      .catch((e) => {
        onError.call(null, e);
        if (e.response) {
          console.log('Error', e.response.status);
          console.log(e.response.data.message);
        } else {
          console.log('Error', e.message);
        }
      });
  }

  remove(pageId, onSuccess, onError) {
    axios.delete(`${this.restRootUrl}/${pageId}`).then(onSuccess).catch((e) => {
      onError.call(null, e);
      if (e.response) {
        console.log('Error', e.response.status);
        console.log(e.response.data.message);
      } else {
        console.log('Error', e.message);
      }
    });
  }

  post(newPage, onSuccess, onError) {
    axios.post(this.restRootUrl, newPage).then(onSuccess).catch((e) => {
      onError.call(null, e);
      if (e.response) {
        console.log('Error', e.response.status);
        console.log(e.response.data.message);
      } else {
        console.log('Error', e.message);
      }
    });
  }
}