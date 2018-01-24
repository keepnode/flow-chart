Chart.ready(function() {
    const basicX = 150;
    const startY = 20;
    const endY = 350;
    const newX = 50;
    const newY = 50;
    //请求数据的地址
    const dataUrl='http://192.168.1.228:5656/Components/WorkflowDesigner/WFDesignerHandler.ashx';
    //是否是模拟数据
    const isMock=true;
    let _current = null; // 当前选择节点id

    const _showNodeInfo = function(data) {
        if (!data) {
            return;
        }

        let infoPanel = $(".right");
        infoPanel.find("#hidId").val(data.nodeId); //结点ID
        infoPanel.find('#inputTitle').val(data.name || ''); //结点名称
        infoPanel.find('#inputRemark').text(data.description || ''); //结点备注
        infoPanel.find("#ddlOperate").val(data.operate||''); //结点操作
        infoPanel.find("#inputLimit").val(data.limittime||'0'); //限制时间
        infoPanel.find("#inputCreator").val(data.creatorid||''); //创建人
        infoPanel.find("#inputCreateTime").val(data.createtime|| ''); // 创建时间
        // flag 标志(1表示起点，2表示终点，默认为0)
    };

    const _hideNodeInfo = function() {
        _showNodeInfo({
            name: '',
            description: '',
            operate: '',
            limittime: '',
            creatorid: '',
            createtime: '',
            flag:0
        });
    };

    const _createChart = function() {
        return new Chart($("#demo-chart"), {
            onNodeClick (data) { // 点击节点时触发
                _showNodeInfo(data);
                _current = data.nodeId;
            },
            onNodeDel (data) {
                console.log(data);
                _hideNodeInfo();
            }
        })
    };

    let chart = _createChart();
    //初始化节点
    const initNode=function () {
        //添加开始节点
        const nodeStart = chart.addNode('起点', basicX, startY, {
            class: 'node-start',
            removable: false,
            data: {
                name: '起点',
                flag: 1,
                limittime:-1
            }
        });
        nodeStart.addPort({
            isSource: true
        });

        //添加结束节点
        const nodeEnd = chart.addNode('终点', basicX, endY, {
            class: 'node-end',
            removable: false,
            data: {
                name: '终点',
                flag: 2,
                limittime:-1
            }
        });
        nodeEnd.addPort({
            isTarget: true,
            position: 'Top'
        });
    };
    // 获取URL参数
    const getQueryString=function(name) {
        const reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
        const r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
    };
    //加载数据
    const loadData=function () {
        const id=getQueryString("id");

        if(id!==undefined&&id>0){
            bindTemplateData(id);
        }else{
           initNode();
        }
    };

    const bindTemplateData=function (id) {
        const templateData=getTemplateInfo(id);
        $("#inputTemplateName").val(templateData.name); // 模板名称
        $("#textTemplateDescription").text(templateData.description); //模板备注
        $("#inputTemplateCreatorId").val(templateData.creatorid); //创建人
        $("#inputTemplateCreateTime").val(templateData.createtime); //创建时间

        bindTemplateNodeData(templateData);
    };
    const getRandom=function (n,m){
        let c = m-n+1;
        return Math.floor(Math.random() * c + n);
    };
    const getRandomNodeId=function () {
        return "0"+(new Date).valueOf()+getRandom(1000,9999);
    };
    const getNodeClass=function (flag) {
        let result="";
        switch(flag){
            case 1:
                result="node-start";
                break;
            case 2:
                result="node-end";
                break;
            case 0:
                result="node-process";
                break;
        }
        return result;
    };

    const getNodeRemoveAble=function (flag) {
        let result=true;
        switch(flag){
            case 1:
                result=false;
                break;
            case 2:
                result=false;
                break;
        }
        return result;
    };
    //绑定模板结点数据
    const bindTemplateNodeData=function (json) {
        const nodes=json.nodes;//所有的结点数据
        const connections=json.connections; //所有的连线数据
        let result={nodes:[],connections:[]};

        //结点遍历重新组装
        nodes.forEach(function (node) {
            node.nodeId=node.id;
            node.className=getNodeClass(node.flag);
            node.removable=getNodeRemoveAble(node.flag);
            result.nodes.push(node);
        });
        let newConnect={};
        connections.forEach(function (connect) {
           newConnect={};
           newConnect.pageSourceId=connect.sourceId;
           newConnect.pageTargetId=connect.targetId;
           result.connections.push(newConnect);
        });
        chart.fromJson(JSON.stringify(result));
    };
    //获取模板信息
    const getTemplateInfo=function(id){
      if(isMock){
        const jsonData = {
            "id":1,
            "name": "2016年度市安全生产科技项目(安监局）",
            "description": "2016年度市安全生产科技项目(安监局）",
            "creatorid": "235061",
            "createtime": "2017-12-20 14:50:18",
            "cdeptid": "",
            "nodes": [
            {
              "id": "68410",
              "name": "起点",
              "description": "",
              "operate": "",
              "limittime": -1,
              "x": 12,
              "y": 187,
              "creatorid": "235061",
              "createtime": "2017-12-20 14:50:18",
              "condition": "",
              "flag": 1,
              "childs": [
                {
                  "childid": "68412",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68411",
              "name": "终点",
              "description": "",
              "operate": "",
              "limittime": -1,
              "x": 700,
              "y": 187,
              "creatorid": "235061",
              "createtime": "2017-12-20 14:50:18",
              "condition": "N68418",
              "flag": 2,
              "childs": null
            },
            {
              "id": "68412",
              "name": "申报",
              "description": "申报",
              "operate": "申报",
              "limittime": 0,
              "x": 12,
              "y": 105,
              "creatorid": "235061",
              "createtime": "2017-12-20 14:51:03",
              "condition": "N68410",
              "flag": 0,
              "childs": [
                {
                  "childid": "68415",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68413",
              "name": "市安监局受理",
              "description": "市安监局受理",
              "operate": "受理",
              "limittime": 0,
              "x": 150,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 14:56:10",
              "condition": "N68415",
              "flag": 0,
              "childs": [
                {
                  "childid": "68414",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68414",
              "name": "市安监局审核",
              "description": "市安监局审核",
              "operate": "审核",
              "limittime": 0,
              "x": 281,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 14:56:35",
              "condition": "N68413",
              "flag": 0,
              "childs": [
                {
                  "childid": "68416",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68415",
              "name": "区安监局初审",
              "description": "区安监局初审",
              "operate": "初审",
              "limittime": 0,
              "x": 12,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 15:00:01",
              "condition": "N68412",
              "flag": 0,
              "childs": [
                {
                  "childid": "68413",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68416",
              "name": "局领导审核",
              "description": "局领导审核",
              "operate": "审核",
              "limittime": 0,
              "x": 404,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 15:01:03",
              "condition": "N68414",
              "flag": 0,
              "childs": [
                {
                  "childid": "68417",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68417",
              "name": "公示",
              "description": "公示",
              "operate": "公示",
              "limittime": 0,
              "x": 538,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 15:01:20",
              "condition": "N68416",
              "flag": 0,
              "childs": [
                {
                  "childid": "68418",
                  "childcondition": ""
                }
              ]
            },
            {
              "id": "68418",
              "name": "上传政府批文",
              "description": "上传政府批文",
              "operate": "立项/办结",
              "limittime": 0,
              "x": 700,
              "y": 9,
              "creatorid": "235061",
              "createtime": "2017-12-20 15:01:35",
              "condition": "N68417",
              "flag": 0,
              "childs": [
                {
                  "childid": "68411",
                  "childcondition": ""
                }
              ]
            }
          ],
            "connections":[
                {
                    "sourceId": "68410",
                    "targetId": "68412"
                },
                {
                    "sourceId": "68412",
                    "targetId": "68415"
                },
                {
                    "sourceId": "68413",
                    "targetId": "68414"
                },
                {
                    "sourceId": "68414",
                    "targetId": "68416"
                },
                {
                    "sourceId": "68415",
                    "targetId": "68413"
                },
                {
                    "sourceId": "68416",
                    "targetId": "68417"
                },
                {
                    "sourceId": "68417",
                    "targetId": "68418"
                },
                {
                    "sourceId": "68418",
                    "targetId": "68411"
                }
            ]
        };
        return jsonData;
      }
        $.ajax({
          type:'get',
          url:dataUrl,
          async:false,
          data:{
            getwftemplateid:id
          },
          success:function (data) {
            return JSON.parse(data);
          }
        });
    };
    //获取操作结点数据
    const getOperateInfo=function () {
        if(isMock){
            const jsonData={
                "Success": true,
                "Message": "",
                "total": 0,
                "data": [
                    {
                        "value": "申报",
                        "name": "申报"
                    },
                    {
                        "value": "起草",
                        "name": "起草"
                    },
                    {
                        "value": "初审",
                        "name": "初审"
                    },
                    {
                        "value": "受理",
                        "name": "受理"
                    },
                    {
                        "value": "初审二",
                        "name": "初审二"
                    },
                    {
                        "value": "承办",
                        "name": "承办"
                    },
                    {
                        "value": "审核",
                        "name": "审核"
                    },
                    {
                        "value": "审批",
                        "name": "审批"
                    },
                    {
                        "value": "立项/办结",
                        "name": "立项/办结"
                    },
                    {
                        "value": "分组",
                        "name": "分组"
                    },
                    {
                        "value": "公示",
                        "name": "公示"
                    },
                    {
                        "value": "审计",
                        "name": "审计"
                    },
                    {
                        "value": "设置主管处室",
                        "name": "设置主管处室"
                    },
                    {
                        "value": "专家评审",
                        "name": "专家评审"
                    },
                    {
                        "value": "联审",
                        "name": "联审"
                    },
                    {
                        "value": "复核",
                        "name": "复核"
                    },
                    {
                        "value": "考察",
                        "name": "考察"
                    },
                    {
                        "value": "会议联审",
                        "name": "会议联审"
                    },
                    {
                        "value": "行文",
                        "name": "行文"
                    },
                    {
                        "value": "部门联审",
                        "name": "部门联审"
                    },
                    {
                        "value": "市领导审签",
                        "name": "市领导审签"
                    },
                    {
                        "value": "验收",
                        "name": "验收"
                    },
                    {
                        "value": "确认",
                        "name": "确认"
                    },
                    {
                        "value": "公布",
                        "name": "公布"
                    },
                    {
                        "value": "结项",
                        "name": "结项"
                    }
                ]
            };

            return jsonData;
        }

        $.ajax({
            type:"get",
            url:dataUrl,
            async:false,
            data:{
                allwfoperate:"allwfoperate"
            },
            success:function (data) {
                return JSON.parse(data);
            }
        });
    };
    //绑定操作结点
    const bindOperate=function () {
        const nodes=getOperateInfo().data;
        let html="";
        nodes.forEach(function (node) {
            html+='<option value="'+node.value+'">'+node.name+'</option>';
        });
        $("#ddlOperate").append(html);
    };
    //获取部门信息数据
    const getDepartmentInfo=function () {
        if(isMock){
            const json={
                "Success": true,
                "Message": "",
                "total": 0,
                "data": [
                    {
                        "value": "68409",
                        "name": "2016年度市安全生产科技项目(安监局）"
                    },
                    {
                        "value": "68651",
                        "name": "佛山市（文广新局）流程"
                    },
                    {
                        "value": "68687",
                        "name": "佛山市（体育局）流程"
                    },
                    {
                        "value": "68975",
                        "name": "市安全生产科技项目(安监局）审核流程"
                    },
                    {
                        "value": "69500",
                        "name": "测试模板"
                    },
                    {
                        "value": "67661",
                        "name": "2017年降低企业用电用气12-01"
                    },
                    {
                        "value": "67819",
                        "name": "佛山市债券融资扶持(金融局）"
                    },
                    {
                        "value": "68501",
                        "name": "2017年佛山市发展电子商务(商务局）"
                    },
                    {
                        "value": "68723",
                        "name": "佛山市（质监局）流程"
                    },
                    {
                        "value": "69228",
                        "name": "安监局测试流程"
                    },
                    {
                        "value": "68445",
                        "name": "2016年科技企业孵化器( 科技局)"
                    },
                    {
                        "value": "68557",
                        "name": "佛山市工商局流程"
                    }
                ]
            };

            return json;
        }
        $.ajax({
            type:"get",
            url:dataUrl,
            async:false,
            data:{
                getwftemlatedeptid:""
            },
            success:function (data) {
                return JSON.parse(data);
            }
        });
    };
    const bindDepartment=function () {
      const nodes=getDepartmentInfo().data;
      let html="";
      nodes.forEach(function (node) {
            html+='<option value="'+node.value+'">'+node.name+'</option>';
      });
      $("#ddlDepartment").append(html);
    };
    //获取当前时间
    const getNowTime=function () {
        const now = new Date();

        const year = now.getFullYear();       //年
        const month = now.getMonth() + 1;     //月
        const day = now.getDate();            //日
        const hh = now.getHours();            //时
        const mm = now.getMinutes();          //分

        let clock = year + "-";

        if(month < 10)
            clock += "0";

        clock += month + "-";

        if(day < 10)
            clock += "0";

        clock += day + " ";

        if(hh < 10)
            clock += "0";

        clock += hh + ":";
        if (mm < 10) clock += '0';
        clock += mm;
        return(clock);
    };
    const addNewTask = function(name, params) {
        params = params || {};
        params.data = params.data || {};
        params.class = 'node-process';
        params.data.createtime=getNowTime();
        let node = chart.addNode(name, newX, newY, params);
        node.addPort({
            isSource: true
        });
        node.addPort({
            isTarget: true,
            position: 'Top'
        });
    };
    const bindEvent = function() {
         $(".flowchart-panel").on('click', '.btn-add', function(event) {
            let target = $(event.target);
            let node = target.data('node');
            addNewTask(node.name, {
                data: node
            });
        });

         $(".btn-save").on("click",function () {
             $('#jsonOutput').val(JSON.stringify(chart.toJson()));
             saveTemplateData();
         });

         $(".btn-load").on("click",function () {
             if ($('#demo-chart').length === 0) {
               $('<div id="demo-chart"></div>').appendTo($('.middle'));
               chart = _createChart();
             }
             chart.fromJson($('#jsonOutput').val());
         });

         $(".btn-clear").on("click",function () {
           $('#demo-chart').remove();
           chart.clear();
         });

         $("#btnSave").on("click",function () {
             let jsonData=chart.toJson();
             //获取当前
             const id=Number.parseInt($("#hidId").val()); //当前节点ID
             const title=$("#inputTitle").val(); //当前节点的标题
             const remark=$("#inputRemark").text(); //当前节点的备注
             const operate=$("#ddlOperate").val(); //当前节点的操作
             const limit=$("#inputLimit").val(); //当前节点的限制时间
             const creator=$("#inputCreator").val(); //当前节点的创建人
             const createTime=$("#inputCreateTime").val(); //当前节点的创建时间

             console.log("jsonData",jsonData);
             for(let i=0;i<jsonData.nodes.length;i++){
                 if(jsonData.nodes[i].id===id){
                     jsonData.nodes[i].name=title;
                     jsonData.nodes[i].description=remark;
                     jsonData.nodes[i].operate=operate;
                     jsonData.nodes[i].limittime=limit;
                     jsonData.nodes[i].creatorid=creator;
                     jsonData.nodes[i].createtime=createTime;
                 }
             }
             chart.fromJson(JSON.stringify(jsonData));
         });
    };

    const saveTemplateData=function(){
        let data={};
        data.id=getQueryString("id"); //模板ID
        data.name=$("#inputTemplateName").val(); //模板名称
        data.description=$("#textTemplateDescription").text(); //模板描述
        data.creatorid=$("#inputTemplateCreatorId").val(); //创建人id
        data.createtime=$("#inputTemplateCreateTime").val(); //创建时间
        data.cdeptid=$("#ddlDepartment").val();   //主管部门ID

        const chatJson=chart.toJson();
        console.log("chatJson",chatJson);
        data.nodes=chatJson.nodes;
        data.connections=chatJson.connections;

        if(isMock){
            console.log("save data",data);
            alert("保存成功！");
        }else{
            $.ajax({
                type:"post",
                url:dataUrl,
                data:{
                    wftemplate:data
                },
                success:function (data) {
                    alert(data);
                }
            });
        }
    };
    bindOperate();
    bindDepartment();
    loadData();
    bindEvent();

    // 使用测试数据
    let listHtml = '';

    TEST_NODES.forEach(function (node) {
        listHtml+="<li><span class='node-name'>"+node.name+"</span><a class='btn-add' data-id='node.procId' href='javascript:void(0)'>添加</a></li>";
    });
    $('.nodes').html(listHtml).find('.btn-add').each(function(index) {
        $(this).data('node', $.extend({}, TEST_NODES[index]));
    });
});
