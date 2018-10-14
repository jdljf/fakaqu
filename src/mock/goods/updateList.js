export default mock => {
  // post请求
  mock.onPost("/updateproduct").reply(
    200,
    {
      code: 1,
      msg: "更新成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onPost("/addproduct").reply(
    200,
    {
      code: 1,
      msg: "添加成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onPost("/deleteproduct").reply(
    200,
    {
      code: 1,
      msg: "删除成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/productsort").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/goodlist").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/goodsort").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onPost("/destory/list").reply(
    200,
    {
      code: 1,
      msg: "删除成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/rateList").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/complaints").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/wikipedia").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/Messagescontext").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/Messagessend").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onPost("/deleteMessages").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onPost("/deleteMessageswait").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onPost("/addMessageinfo").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onPost("/getIcomessss").reply(
    200,
    {
      code: 1,
      msg: "成功",
      total:9
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/getIcome").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  mock.onGet("/user/userinfo").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
   // 修改个人信息
   mock.onPost("/user/edit").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
   //获取商家信息
   mock.onGet("/bank/info").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  // 修改商户信息
   mock.onPost("/bank/edit").reply(
    200,
    {
      code: 1,
      msg: "成功"
    },
    {
      headers: {
        authorization: "hehe"
      }
    }
  );
  
};
