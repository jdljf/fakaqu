import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import config from "../config/config";
import updateList from "./goods/updateList";
if (config.useMockData) {
  let mock = new MockAdapter(axios);
  updateList(mock);
  let res = [];
  for (let i = 0; i < 100; i++) {
    const obj = {
      id: 1,
      order_time: "2018-04-13 10:04:30",
      order_name: "DC847125E24FC173",
      card_info: "1502436061DEB6EPXGXFfg5QUc9I0KLQVDEMAG2qxU",
      order_price: "101.00",
      user_pay: "101.00",
      order_status: "订单完成"
    };
    res.push(obj);
  }
  // get请求
  mock.onGet("/ordernumber").reply(
    200,
    {
      results: [
        {
          id: 1,
          order_time: "2018-04-13 10:04:30",
          order_name: "DC847125E24FC173",
          card_info: "1502436061DEB6EPXGXFfg5QUc9I0KLQVDEMAG2qxU",
          order_price: "10.00",
          user_pay: "10.00",
          order_status: "订单完成"
        },
        {
          id: 1,
          order_time: "2018-04-13 10:04:30",
          order_name: "DC847125E24FC173",
          card_info: "1502436061DEB6EPXGXFfg5QUc9I0KLQVDEMAG2qxU",
          order_price: "10.00",
          user_pay: "10.00",
          order_status: "订单完成"
        },
        {
          id: 2,
          order_time: "2018-04-13 10:04:30",
          order_name: "DC847125E24FC173",
          card_info: "1502436061DEB6EPXGXFfg5QUc9I0KLQVDEMAG2qxU",
          order_price: "10.00",
          user_pay: "10.00",
          order_status: "订单完成"
        }
      ],
      status: true
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/orderphone").reply(
    200,
    {
      results: res,
      status: true
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  // post请求
  mock.onPost("/login").reply(
    200,
    {
      code: 1,
      id: 2,
      token: "AESEe1e",
      message: [{ id: 1, name: "John Smith", status }]
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  // 注册
  mock.onPost("/register").reply(
    200,
    {
      code: 1,
      msg: "OK"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
}
