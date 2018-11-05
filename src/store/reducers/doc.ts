import { DocSerializer } from './../../interface/interface';
import actionTypes from '../actionTypes';
import update from 'immutability-helper';

const { DOC } = actionTypes;

export interface DocStateInterface {
  docDetailMap: {
    [key: string]: {
      title: string;
      body: string;
    };
  };
  createdDocs: DocSerializer[];
}

const defaultState: DocStateInterface = {
  createdDocs: [],
  docDetailMap: {}
};

export default function doc(state = defaultState, action) {
  switch (action.type) {
    case DOC.INIT_CREATED_DOC_LIST: {
      return {
        ...state,
        createdDocs: action.playload.createdDocs
      };
    }
    case DOC.FETCH_DOCUMENT_DETAIL_SUCCESS: {
      const documentDetail = action.playload.documentDetail;
      const docDetailMap = update(state.docDetailMap, {
        [documentDetail.id]: {
          $set: {
            title: documentDetail.title,
            body: documentDetail.body
          }
        }
      });
      return {
        ...state,
        docDetailMap
      };
    }
    default: {
      return state;
    }
  }
}
