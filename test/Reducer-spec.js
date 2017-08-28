import { assert } from 'chai';
import {cookieDeletedCounterTotal, lists} from "../src/redux/Reducers";
import C from "../src/redux/Constants";

describe("Reducer", function() {
  describe("cookieDeletedCounterTotal", function() {
    const state = 5;

    it("should return 0", function() {
      const newState = cookieDeletedCounterTotal(state, {type: C.RESET_COOKIE_DELETED_COUNTER});
      assert.strictEqual(newState, 0);
    });
    it("should return 6", function() {
      const newState = cookieDeletedCounterTotal(state, {type: C.INCREMENT_COOKIE_DELETED_COUNTER});
      assert.strictEqual(newState, 6);
    });
    it("should return 10", function() {
      const newState = cookieDeletedCounterTotal(state, {type: C.INCREMENT_COOKIE_DELETED_COUNTER, payload: 5});
      assert.strictEqual(newState, 10);
    });
  });

  describe("lists with no stuff", function() {
    const state = {};

    it("should return google.com", function() {
      const newState = lists(state, {type: C.ADD_EXPRESSION, payload: {expression: "google.com", listType: "GREY"}});
      assert.propertyVal(newState["default"][0], "expression", "google.com");
      assert.propertyVal(newState["default"][0], "listType", "GREY");
      assert.property(newState["default"][0], "id");
      assert.property(newState["default"][0], "regExp");
    });
    it("should return youtube.com for firefox_container_2", function() {
      const newState = lists(state, {type: C.ADD_EXPRESSION, storeId: "firefox_container_2", payload: {expression: "youtube.com", listType: "GREY"}});
      assert.propertyVal(newState["firefox_container_2"][0], "expression", "youtube.com");
      assert.propertyVal(newState["firefox_container_2"][0], "listType", "GREY");
      assert.property(newState["firefox_container_2"][0], "id");
      assert.property(newState["firefox_container_2"][0], "regExp");
    });
    it("should return google.com with a default listType of WHITE", function() {
      const newState = lists(state, {type: C.ADD_EXPRESSION, payload: {expression: "google.com"}});
      assert.propertyVal(newState["default"][0], "expression", "google.com");
      assert.propertyVal(newState["default"][0], "listType", "WHITE");
    });
  });

  describe("lists with stuff", function() {
    const state = {
      default: [
        {
          "expression": "facebook.com*",
          "id": "B1eWwWRJOb",
          "regExp": "^facebook\\.com.*$",
          "listType": "GREY"
        },
        {
          "expression": "messenger.com*",
          "id": "SyZbDbC1dW",
          "regExp": "^messenger\\.com.*$",
          "listType": "WHITE"
        }
      ],
      "firefox_container_1": [
        {
          "expression": "facebook.com*",
          "id": "123",
          "regExp": "^facebook\\.com.*$",
          "listType": "GREY"
        },
        {
          "expression": "messenger.com*",
          "id": "456",
          "regExp": "^messenger\\.com.*$",
          "listType": "WHITE"
        }
      ]
    };

    it("should return youtube.com on default", function() {
      const newState = lists(state, {type: C.ADD_EXPRESSION, payload: {expression: "youtube.com", listType: "WHITE"}});
      assert.propertyVal(newState["default"][2], "expression", "youtube.com");
      assert.propertyVal(newState["default"][2], "listType", "WHITE");
      assert.property(newState["default"][2], "id");
      assert.property(newState["default"][2], "regExp");
    });
    it("should return youtube.com on firefox_container_1", function() {
      const newState = lists(state, {type: C.ADD_EXPRESSION, storeId: "firefox_container_1", payload: {expression: "github.com", listType: "GREY"}});
      assert.propertyVal(newState["firefox_container_1"][1], "expression", "github.com");
      assert.propertyVal(newState["firefox_container_1"][1], "listType", "GREY");
      assert.property(newState["firefox_container_1"][1], "id");
      assert.property(newState["firefox_container_1"][1], "regExp");
    });
    it("should return not return messenger.com on default", function() {
      const newState = lists(state, {type: C.REMOVE_EXPRESSION, payload: {id: "SyZbDbC1dW"}});
      assert.notExists(newState["default"][1]);
    });
    it("should return github.com and GREY for updated expression on default", function() {
      const newState = lists(state, {type: C.UPDATE_EXPRESSION, payload: {id: "SyZbDbC1dW", expression: "github.com", listType: "GREY"}});
      assert.propertyVal(newState["default"][1], "expression", "github.com");
      assert.propertyVal(newState["default"][1], "listType", "GREY");
      assert.property(newState["default"][1], "id");
      assert.property(newState["default"][1], "regExp");
    });
    it("should return github.com and GREY for updated expression on default", function() {
      const newState = lists(state, {type: C.UPDATE_EXPRESSION, storeId: "firefox_container_1", payload: {id: "123", expression: "google.com", listType: "WHITE"}});
      assert.propertyVal(newState["firefox_container_1"][0], "expression", "google.com");
      assert.propertyVal(newState["firefox_container_1"][0], "listType", "WHITE");
      assert.property(newState["firefox_container_1"][0], "id");
      assert.property(newState["firefox_container_1"][0], "regExp");
    });
  });
});
